import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Notch Pay signs every webhook body with your secret key so you can trust
 * it actually came from them. We recompute the HMAC-SHA256 digest of the
 * raw body and compare it, in constant time, against the `x-notch-signature`
 * header. Never trust an unsigned or mismatched payload — always return 401
 * so Notch Pay's retry logic kicks in instead of silently accepting it.
 */
function isValidSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;

  const secret = process.env.NOTCHPAY_SECRET_KEY;
  if (!secret) {
    // In mock mode there's no real secret configured — accept everything so
    // local/demo testing keeps working, but this branch must never run once
    // NOTCHPAY_MODE=live.
    return process.env.NOTCHPAY_MODE !== "live";
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
  } catch {
    return false; // length mismatch etc. — treat as invalid, not a crash
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-notch-signature");

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const transactionStatus = event?.data?.status ?? event?.transaction?.status;
  const reference = event?.data?.reference ?? event?.transaction?.reference;

  if (!reference) {
    return NextResponse.json({ error: "Référence manquante" }, { status: 400 });
  }

  switch (transactionStatus) {
    case "complete":
    case "successful": {
      // TODO (Supabase): look up the `pending` subscription row by
      // `reference`, flip it to `active`, set the plan's generation/account
      // limits on the user row, and send a confirmation (WhatsApp/email).
      console.info(`[notchpay:webhook] Paiement confirmé pour ${reference}`);
      break;
    }
    case "failed":
    case "canceled": {
      // TODO (Supabase): mark the subscription row as `failed` and leave the
      // user on their current plan.
      console.warn(`[notchpay:webhook] Paiement échoué pour ${reference}`);
      break;
    }
    default: {
      console.info(`[notchpay:webhook] Statut ignoré (${transactionStatus}) pour ${reference}`);
    }
  }

  // Always 200 once the signature checks out, even for a failed payment —
  // Notch Pay only retries on non-2xx responses.
  return NextResponse.json({ received: true }, { status: 200 });
}
