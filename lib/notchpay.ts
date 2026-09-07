/**
 * Notch Pay integration.
 *
 * Notch Pay is a Cameroonian payment aggregator that exposes MTN MoMo and
 * Orange Money behind a single checkout API. This client is server-only —
 * never import it from a client component, since it needs NOTCHPAY_PUBLIC_KEY.
 *
 * Docs: https://docs.notchpay.co
 *
 * MOCK MODE: while NOTCHPAY_MODE=mock (the default until real keys are set),
 * initializePayment() returns a fake authorization_url that resolves to a
 * local mock checkout page (/mock-checkout) instead of calling the live API.
 * Flip NOTCHPAY_MODE=live in your environment once you have real
 * NOTCHPAY_PUBLIC_KEY / NOTCHPAY_SECRET_KEY values from your Notch Pay
 * dashboard, and nothing else in the codebase needs to change.
 */

import { NotchPayInitPayload, NotchPayInitResponse } from "@/types";
import { generateReference } from "./utils";

const NOTCHPAY_BASE_URL = "https://api.notchpay.co";
const isLiveMode = process.env.NOTCHPAY_MODE === "live";

function assertLiveConfig() {
  if (!process.env.NOTCHPAY_PUBLIC_KEY) {
    throw new Error(
      "NOTCHPAY_PUBLIC_KEY est manquant. Ajoute-le dans .env.local ou repasse NOTCHPAY_MODE=mock."
    );
  }
}

export async function initializePayment(
  payload: Omit<NotchPayInitPayload, "reference"> & { reference?: string }
): Promise<NotchPayInitResponse> {
  const reference = payload.reference ?? generateReference();

  if (!isLiveMode) {
    // Mock mode: simulate the network round trip and hand back a reference
    // the webhook route can later mark as paid via /api/payments/mock-confirm.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      status: "Accepted",
      message: "Mode démo — aucun paiement réel n'a été initié.",
      authorization_url: `/mock-checkout?ref=${reference}&amount=${payload.amount}`,
      reference,
    };
  }

  assertLiveConfig();

  const response = await fetch(`${NOTCHPAY_BASE_URL}/payments/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NOTCHPAY_PUBLIC_KEY as string,
    },
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency,
      email: payload.email,
      phone: payload.phone,
      reference,
      callback_url: payload.callback_url,
      description: payload.description ?? "Abonnement UBriss",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Notch Pay a refusé l'initialisation: ${errorBody}`);
  }

  const data = await response.json();

  return {
    status: data.status,
    message: data.message,
    authorization_url: data.authorization_url,
    reference: data.transaction?.reference ?? reference,
  };
}

/**
 * Verifies a transaction's current status directly against Notch Pay.
 * Used by the webhook handler as a second check before trusting the payload,
 * since webhook bodies can be spoofed if the signature check is skipped.
 */
export async function verifyPayment(reference: string) {
  if (!isLiveMode) {
    return { status: "complete", reference };
  }

  assertLiveConfig();

  const response = await fetch(`${NOTCHPAY_BASE_URL}/payments/${reference}`, {
    headers: { Authorization: process.env.NOTCHPAY_PUBLIC_KEY as string },
  });

  if (!response.ok) {
    throw new Error("Impossible de vérifier la transaction auprès de Notch Pay.");
  }

  const data = await response.json();
  return { status: data.transaction?.status as string, reference };
}
