import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { initializePayment } from "@/lib/notchpay";
import { PLANS } from "@/data/plans";

const bodySchema = z.object({
  planId: z.enum(["createur", "pro"]),
  email: z.string().email(),
  phone: z
    .string()
    .min(9, "Numéro invalide")
    .regex(/^[0-9+ ]+$/, "Numéro invalide"),
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    const json = await request.json();
    parsed = bodySchema.parse(json);
  } catch (error) {
    return NextResponse.json(
      { error: "Requête invalide", details: error instanceof Error ? error.message : error },
      { status: 400 }
    );
  }

  const plan = PLANS.find((p) => p.id === parsed.planId);
  if (!plan) {
    return NextResponse.json({ error: "Offre inconnue" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;

  try {
    const session = await initializePayment({
      amount: plan.priceFcfa,
      currency: "XAF",
      email: parsed.email,
      phone: parsed.phone,
      callback_url: `${origin}/dashboard/settings?payment=success`,
      description: `Abonnement UBriss — ${plan.name}`,
    });

    // TODO (Supabase): persist a `pending` row in `subscriptions` keyed by
    // session.reference here, so the webhook has something to flip to `active`.

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("[notchpay:initialize]", error);
    return NextResponse.json(
      { error: "Le paiement n'a pas pu être initié. Réessaie dans un instant." },
      { status: 502 }
    );
  }
}
