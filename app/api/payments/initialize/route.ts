import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Récupération des clés API depuis l'environnement
    const apiKey = process.env.PAYMENT_PROVIDER_SECRET_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Clé API de paiement non configurée sur le serveur." },
        { status: 500 }
      );
    }

    // 2. Appel à l'API du prestataire de paiement (Exemple)
    const response = await fetch("https://api.payment-provider.com/v1/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Échec chez le prestataire de paiement" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Erreur d'initialisation de paiement:", error);
    // Renvoyer un JSON 500 propre au lieu de laisser Netlify renvoyer un 502
    return NextResponse.json(
      { error: error.message || "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
