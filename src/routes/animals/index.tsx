import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimalCard } from "@/components/animal-card";
import { SearchForm } from "@/components/search-form";
import { filterAnimals } from "@/data/animals";
import {
  groupLabel,
  groups,
  habitatLabel,
  habitats,
  isGroup,
  isHabitat,
  type Group,
  type Habitat,
} from "@/data/labels";

export const Route = createFileRoute("/animals/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    group: isGroup(search.group) ? search.group : "",
    habitat: isHabitat(search.habitat) ? search.habitat : "",
  }),
  component: AnimalsPage,
});

function AnimalsPage() {
  const { q, group, habitat } = Route.useSearch();
  const navigate = useNavigate();
  const list = filterAnimals(q, group, habitat);

  function setSearch(next: { q?: string; group?: Group | ""; habitat?: Habitat | "" }) {
    void navigate({
      to: "/animals",
      search: {
        q: next.q ?? q,
        group: next.group ?? group,
        habitat: next.habitat ?? habitat,
      },
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">Animals</h1>
      <p className="mt-1 text-lg">200 animals. Search by name.</p>
      <div className="mt-3">
        <SearchForm
          id="catalog-search"
          initial={q}
          onSearch={(query) => setSearch({ q: query })}
        />
      </div>

      <div className="mt-4">
        <p className="text-sm font-extrabold">Group</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <FilterChip
            label="All"
            on={group === ""}
            disabled={false}
            onClick={() => setSearch({ group: "" })}
          />
          {groups.map((item) => {
            const count = filterAnimals(q, item, habitat).length;
            return (
              <FilterChip
                key={item}
                label={groupLabel[item]}
                on={group === item}
                disabled={count === 0}
                onClick={() => setSearch({ group: item })}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm font-extrabold">Place</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <FilterChip
            label="All"
            on={habitat === ""}
            disabled={false}
            onClick={() => setSearch({ habitat: "" })}
          />
          {habitats.map((item) => {
            const count = filterAnimals(q, group, item).length;
            return (
              <FilterChip
                key={item}
                label={habitatLabel[item]}
                on={habitat === item}
                disabled={count === 0}
                onClick={() => setSearch({ habitat: item })}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm font-bold">{list.length} animals</p>
      {list.length === 0 ? (
        <p className="mt-3 rounded-card border-2 border-ink bg-sky p-4 text-lg">
          No animal matches. Try another word.
        </p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {list.map((animal) => (
            <AnimalCard key={animal.slug} animal={animal} />
          ))}
        </div>
      )}
    </main>
  );
}

function FilterChip({
  label,
  on,
  disabled,
  onClick,
}: {
  label: string;
  on: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-11 rounded-full border-2 px-3 text-sm font-extrabold text-ink ${
        disabled
          ? "cursor-not-allowed border-ink/15 bg-sand text-ink/35"
          : on
            ? "border-leaf bg-sand"
            : "border-ink/25 bg-sand"
      }`}
    >
      {label}
    </button>
  );
}
