import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShoppingBag, QrCode, Leaf } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { MenuCard } from "@/components/menu/MenuCard";
import { CartSheet } from "@/components/menu/CartSheet";
import {
  CATEGORIES,
  MENU_ITEMS,
  RESTAURANT_NAME,
  formatINR,
  type Category,
} from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Saffron House — Digital Menu" },
      {
        name: "description",
        content:
          "Scan, browse & order from The Saffron House's premium digital menu. Filter dishes, build your order and checkout instantly on WhatsApp.",
      },
      { property: "og:title", content: "The Saffron House — Digital Menu" },
      {
        property: "og:description",
        content: "Scan, browse & order from The Saffron House's premium digital menu. Filter dishes, build your order and checkout instantly on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "saffron-house-cart";

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState<Category | "All">("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const add = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) };
      if (next[id] === 0) delete next[id];
      return next;
    });

  const filtered = useMemo(
    () =>
      MENU_ITEMS.filter(
        (m) =>
          (category === "All" || m.category === category) &&
          (!vegOnly || m.veg) &&
          (search.trim() === "" ||
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.description.toLowerCase().includes(search.toLowerCase()))
      ),
    [category, vegOnly, search]
  );

  const itemCount = Object.values(cart).reduce((s, n) => s + n, 0);
  const total = Object.entries(cart).reduce((s, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return s + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-gold text-sm font-black text-primary-foreground">
              S
            </span>
            <h1 className="truncate font-display text-xl font-bold tracking-wide sm:text-2xl">
              {RESTAURANT_NAME}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/qr"
              aria-label="Show QR code"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
            >
              <QrCode className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="The Saffron House dining room"
          width={1536}
          height={864}
          className="h-52 w-full object-cover sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Fine Indian Dining
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-5xl">
            A menu worth savouring
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Scan · Browse · Order — checkout straight to WhatsApp
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[61px] z-30 border-b border-border bg-background/80 py-3 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl space-y-3 px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                vegOnly
                  ? "border-veg bg-veg/15 text-veg"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Leaf className="h-3.5 w-3.5" /> Veg only
            </button>
            <span className="h-5 w-px shrink-0 bg-border" />
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  category === c
                    ? "border-transparent gradient-gold text-primary-foreground shadow-gold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-5xl px-4 pt-6">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No dishes match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                qty={cart[item.id] ?? 0}
                onAdd={() => add(item.id)}
                onRemove={() => remove(item.id)}
              />
            ))}
          </div>
        )}

        <footer className="mt-12 border-t border-border py-8 text-center text-xs text-muted-foreground">
          {RESTAURANT_NAME} · Fine Indian Dining · Prices inclusive of service
        </footer>
      </main>

      {/* Floating cart bar */}
      {itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
          <button
            onClick={() => setCartOpen(true)}
            className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl gradient-gold px-5 py-3.5 text-primary-foreground shadow-gold transition-transform active:scale-[0.99]"
          >
            <span className="text-sm font-bold">
              {itemCount} item{itemCount > 1 ? "s" : ""} · {formatINR(total)}
            </span>
            <span className="flex items-center gap-2 text-sm font-black uppercase tracking-wide">
              View Order <ShoppingBag className="h-4 w-4" />
            </span>
          </button>
        </div>
      )}

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        onAdd={add}
        onRemove={remove}
        onClear={() => setCart({})}
      />
    </div>
  );
}
