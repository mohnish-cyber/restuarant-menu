import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { MenuItem } from "@/lib/menu-data";
import { MENU_ITEMS, RESTAURANT_NAME, WHATSAPP_NUMBER, formatINR } from "@/lib/menu-data";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CartSheet({ open, onOpenChange, cart, onAdd, onRemove, onClear }: Props) {
  const [table, setTable] = useState("");

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ item: MENU_ITEMS.find((m) => m.id === id) as MenuItem, qty }))
    .filter((l) => l.item && l.qty > 0);

  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const checkout = () => {
    const rows = lines
      .map((l) => `• ${l.qty} × ${l.item.name} — ${formatINR(l.item.price * l.qty)}`)
      .join("\n");
    const msg =
      `🍽️ *New Order — ${RESTAURANT_NAME}*\n` +
      (table.trim() ? `Table: ${table.trim()}\n` : "") +
      `\n${rows}\n\n` +
      `Subtotal: ${formatINR(subtotal)}\n` +
      `GST (5%): ${formatINR(gst)}\n` +
      `*Total: ${formatINR(total)}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col border-border bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Order</SheetTitle>
          <SheetDescription>
            Review your items, then checkout via WhatsApp.
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <p className="flex-1 py-10 text-center text-muted-foreground">Your cart is empty.</p>
        ) : (
          <>
            <div className="-mx-1 flex-1 space-y-3 overflow-y-auto px-1 py-2">
              {lines.map(({ item, qty }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="text-sm font-bold text-primary">
                      {formatINR(item.price * qty)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-border px-1.5 py-0.5">
                    <button onClick={() => onRemove(item.id)} aria-label="Remove one" className="p-1">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-4 text-center text-sm font-bold">{qty}</span>
                    <button onClick={() => onAdd(item.id)} aria-label="Add one" className="p-1">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <input
                value={table}
                onChange={(e) => setTable(e.target.value)}
                placeholder="Table number (optional)"
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span>{formatINR(gst)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatINR(total)}</span>
                </div>
              </div>

              <button
                onClick={checkout}
                className="w-full rounded-xl gradient-gold py-3 text-base font-bold text-primary-foreground shadow-gold transition-transform active:scale-[0.98]"
              >
                Checkout on WhatsApp 💬
              </button>
              <button
                onClick={onClear}
                className="flex w-full items-center justify-center gap-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
