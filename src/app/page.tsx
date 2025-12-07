"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { toPng } from "html-to-image";

const CONTACT = {
  fullName: "Ouabas Hakima",
  title: "Consultante en communication digitale",
  email: "contact@ouabashakima.com",
  phone: "+33 6 45 82 19 73",
  website: "https://ouabashakima.com",
  address: "Paris, France",
};

const accentPalette = [
  { name: "Saphir", from: "#112A46", to: "#3973AC" },
  { name: "Corail", from: "#A83357", to: "#F29A76" },
  { name: "Sauge", from: "#2F5241", to: "#9EC5AB" },
];

export default function Home() {
  const signatureRef = useRef<HTMLDivElement>(null);
  const [accentIndex, setAccentIndex] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const accent = accentPalette[accentIndex];

  const emailSignatureHtml = useMemo(
    () => `
<table cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e1e1e;">
  <tr>
    <td style="padding-right: 24px;">
      <span style="display: block; font-size: 24px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">${CONTACT.fullName}</span>
      <span style="display: block; margin-top: 4px; font-size: 14px; color: #5b5b5b;">${CONTACT.title}</span>
    </td>
    <td style="width: 2px; background: linear-gradient(180deg, ${accent.from}, ${accent.to});"></td>
    <td style="padding-left: 24px;">
      <table cellpadding="0" cellspacing="0" style="font-size: 14px; color: #3b3b3b;">
        <tr>
          <td style="padding: 2px 0;">📞</td>
          <td style="padding: 2px 12px 2px 8px;">${CONTACT.phone}</td>
        </tr>
        <tr>
          <td style="padding: 2px 0;">✉️</td>
          <td style="padding: 2px 12px 2px 8px;"><a href="mailto:${CONTACT.email}" style="color: ${accent.from}; text-decoration: none;">${CONTACT.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 2px 0;">🌐</td>
          <td style="padding: 2px 12px 2px 8px;"><a href="${CONTACT.website}" style="color: ${accent.from}; text-decoration: none;">${CONTACT.website.replace("https://", "")}</a></td>
        </tr>
        <tr>
          <td style="padding: 2px 0;">📍</td>
          <td style="padding: 2px 12px 2px 8px;">${CONTACT.address}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim(),
    [accent.from, accent.to],
  );

  const plainSignature = useMemo(
    () =>
      `${CONTACT.fullName}\n${CONTACT.title}\n${CONTACT.phone} | ${CONTACT.email}\n${CONTACT.website} | ${CONTACT.address}`,
    [],
  );

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("Signature copiée dans le presse-papiers ✔");
    } catch (error) {
      console.error(error);
      setStatus("Impossible de copier. Essayez manuellement.");
    }
  };

  const handleDownload = async () => {
    const node = signatureRef.current;
    if (!node) return;
    startTransition(async () => {
      try {
        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 3,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "signature-ouabas-hakima.png";
        link.click();
        setStatus("Signature téléchargée en PNG ✔");
      } catch (error) {
        console.error(error);
        setStatus("Téléchargement impossible. Réessayez.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 from-slate-950 via-slate-900 to-slate-950 bg-gradient-to-br text-slate-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:px-10">
        <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_-60px_rgba(15,118,110,0.6)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
            Signature électronique officielle
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Signature de <span className="text-teal-300">{CONTACT.fullName}</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Téléchargez, copiez ou intégrez cette signature professionnelle optimisée
            pour les e-mails. Les dégradés élégants et la typographie premium mettent
            en valeur l&apos;image de marque d&apos;Ouabas Hakima.
          </p>
          <div className="flex flex-wrap gap-3">
            {accentPalette.map((option, index) => (
              <button
                key={option.name}
                onClick={() => setAccentIndex(index)}
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60 ${
                  accentIndex === index
                    ? "border-teal-200/80 bg-white/10 text-teal-200"
                    : "border-white/10 bg-white/0 text-slate-300 hover:border-white/30 hover:text-white"
                }`}
              >
                <span
                  className="h-2 w-8 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${option.from}, ${option.to})`,
                  }}
                />
                {option.name}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)]">
          <article className="relative rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-[0_40px_120px_-60px_rgba(45,212,191,0.7)]">
            <div
              ref={signatureRef}
              className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white p-8 text-slate-900 shadow-xl"
              style={{
                backgroundImage: `radial-gradient(circle at top left, ${accent.to}0F, transparent 55%)`,
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Signature officielle
              </p>
              <p
                className="mt-6 text-4xl font-semibold tracking-[0.22em] text-slate-900"
                style={{ letterSpacing: "0.35em" }}
              >
                {CONTACT.fullName.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {CONTACT.title}
              </p>
              <div className="mt-6 grid gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">📞</span>
                  <span>{CONTACT.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">✉️</span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-slate-600 transition hover:text-slate-900"
                    style={{ color: accent.from }}
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">🌐</span>
                  <a
                    href={CONTACT.website}
                    className="truncate text-slate-600 transition hover:text-slate-900"
                    style={{ color: accent.from }}
                  >
                    {CONTACT.website.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">📍</span>
                  <span>{CONTACT.address}</span>
                </div>
              </div>
              <div
                className="mt-8 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                }}
              />
              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-slate-500">
                {CONTACT.fullName.split(" ").reverse().join(" ")}
              </p>
            </div>
          </article>

          <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100">
            <h2 className="text-2xl font-semibold tracking-tight">
              Exporter la signature
            </h2>
            <p className="text-sm text-slate-300">
              Utilisez les actions ci-dessous pour intégrer rapidement la signature
              dans un client e-mail ou une application bureautique.
            </p>
            <div className="grid gap-3">
              <button
                onClick={handleDownload}
                disabled={isPending}
                className="flex items-center justify-center gap-2 rounded-full bg-teal-400/90 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-teal-300 disabled:cursor-wait disabled:opacity-70"
              >
                ⬇️ Télécharger en PNG
              </button>
              <button
                onClick={() => handleCopy(emailSignatureHtml)}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/40 hover:text-white"
              >
                📋 Copier la version HTML
              </button>
              <button
                onClick={() => handleCopy(plainSignature)}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/40 hover:text-white"
              >
                ✏️ Copier le texte brut
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-xs leading-relaxed text-slate-300">
              <p className="font-semibold text-slate-200">Signature HTML</p>
              <pre className="mt-2 max-h-44 overflow-x-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed">
                {emailSignatureHtml}
              </pre>
            </div>
            <div className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-4 text-xs text-emerald-100">
              <p className="font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Astuce
              </p>
              <p className="mt-1">
                Pour garantir une compatibilité maximale avec Outlook et Gmail,
                collez directement le code HTML dans les préférences de signature, ou
                utilisez le fichier PNG pour les plateformes qui ne prennent pas en
                charge le HTML.
              </p>
            </div>
            {status && (
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs text-white/90">
                {status}
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
