import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Smartphone } from "lucide-react";
import { RESTAURANT_NAME } from "@/lib/menu-data";

export const Route = createFileRoute("/qr")({
  head: () => ({
    meta: [
      { title: "Scan the Menu — The Saffron House" },
      {
        name: "description",
        content: "Scan this QR code with your phone to open The Saffron House digital menu instantly — no app download needed.",
      },
      { property: "og:title", content: "Scan the Menu — The Saffron House" },
      { property: "og:description", content: "Scan to open the digital menu instantly." },
    ],
  }),
  component: QrPage,
});

function QrPage() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const qrSrc = url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=520x520&margin=2&color=1a1408&bgcolor=f5ead2&data=${encodeURIComponent(url)}`
    : "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        {RESTAURANT_NAME}
      </p>
      <h1 className="mt-2 text-center font-display text-4xl font-bold sm:text-5xl">
        Scan for the Menu
      </h1>
      <p className="mt-2 flex items-center gap-2 text-center text-sm text-muted-foreground">
        <Smartphone className="h-4 w-4" />
        Point your phone camera at the code — no app needed
      </p>

      <div className="mt-8 rounded-3xl gradient-gold p-1.5 shadow-gold">
        <div className="rounded-[calc(1.5rem-6px)] bg-card p-5">
          {qrSrc ? (
            <img
              src={qrSrc}
              alt={`QR code linking to the ${RESTAURANT_NAME} digital menu`}
              width={260}
              height={260}
              className="h-64 w-64 rounded-xl"
            />
          ) : (
            <div className="h-64 w-64 animate-pulse rounded-xl bg-muted" />
          )}
        </div>
      </div>

      {url && (
        <p className="mt-4 max-w-full truncate text-xs text-muted-foreground">{url}</p>
      )}

      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-full border border-primary/40 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to menu
      </Link>
    </div>
  );
}
