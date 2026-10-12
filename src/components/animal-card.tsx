import { Link } from "@tanstack/react-router";
import type { Animal } from "@/data/types";
import { groupOne } from "@/data/labels";
import { Portrait } from "@/components/portrait";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link
      to="/animals/$slug"
      params={{ slug: animal.slug }}
      className="flex min-w-0 gap-3 rounded-card border-2 border-ink/15 bg-sand p-3 text-ink"
    >
      <Portrait animal={animal} className="size-20 shrink-0" />
      <span className="min-w-0">
        <span className="block font-display text-xl leading-tight">{animal.name}</span>
        <span className="block text-sm font-extrabold text-leaf">{groupOne[animal.group]}</span>
        <span className="mt-1 block text-sm leading-snug">{animal.fact}</span>
      </span>
    </Link>
  );
}
