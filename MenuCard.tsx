import { Minus, Plus, Flame, Star } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { formatINR } from "@/lib/menu-data";

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
        veg ? "border-veg" : "border-nonveg"
      }`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-2 w-2 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

interface Props {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuCard({ item, qty, onAdd, onRemove }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
        {item.bestseller && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
            <Star className="h-3 w-3 fill-current" /> Bestseller
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <VegMark veg={item.veg} />
            <h3 className="truncate font-display text-lg font-semibold leading-tight">
              {item.name}
            </h3>
          </div>
          {item.spicy && <Flame className="h-4 w-4 shrink-0 text-nonveg" />}
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-primary">{formatINR(item.price)}</span>

          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="rounded-full border border-primary/40 px-5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full gradient-gold px-2 py-1 text-primary-foreground shadow-gold">
              <button onClick={onRemove} aria-label={`Remove one ${item.name}`} className="p-1">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-4 text-center text-sm font-bold">{qty}</span>
              <button onClick={onAdd} aria-label={`Add one ${item.name}`} className="p-1">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
