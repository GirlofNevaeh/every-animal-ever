import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimalCard } from "@/components/animal-card";
import { Portrait, PhotoCredit } from "@/components/portrait";
import { SearchForm } from "@/components/search-form";
import { animals, getAnimal } from "@/data/animals";
import { groupLabel, groups, habitatLabel, habitats } from "@/data/labels";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const hero = getAnimal("african-elephant") ?? animals[0];
  const favourites = animals.filter((animal) => animal.favourite).slice(0, 8);
  const facts = animals.filter((animal) => animal.favourite).slice(0, 10);

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <section className="overflow-hidden rounded-card border-2 border-ink bg-sky">
        <div className="grid gap-3 p-4 sm:grid-cols-[220px_1fr] sm:items-center">
          <Portrait animal={hero} className="mx-auto h-52 w-full max-w-xs border-2 border-ink" />
          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-wide text-ink">Today's animal</p>
            <h1 className="font-display text-4xl text-ink">{hero.name}</h1>
            <p className="mt-2 text-lg text-ink">{hero.fact}</p>
            <PhotoCredit slug={hero.slug} className="mt-2" />
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`/animals/${hero.slug}`}
                className="inline-flex h-11 items-center rounded-card border-2 border-ink bg-sand px-4 font-extrabold text-ink"
              >
                Open page
              </a>
              <Surprise />
            </div>
          </div>
        </div>
        <div className="border-t-2 border-ink bg-sand p-3">
          <SearchForm
            onSearch={(query) => {
              void navigate({ to: "/animals", search: { q: query, group: "", habitat: "" } });
            }}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl">Groups</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => {
                void navigate({ to: "/animals", search: { q: "", group, habitat: "" } });
              }}
              className="min-h-16 rounded-card border-2 border-ink bg-leaf px-3 py-3 text-left font-extrabold text-sand"
            >
              {groupLabel[group]}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-card border-2 border-ink bg-berry text-sand">
        <h2 className="px-4 pt-3 font-display text-2xl">Unusual but true</h2>
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          {facts.slice(0, 4).map((animal) => (
            <p key={animal.slug} className="rounded-card bg-sand p-3 text-sm font-bold text-ink">
              {animal.name}: {animal.fact}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl">Places</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {habitats.map((habitat) => (
            <a
              key={habitat}
              href={`/places/${habitat}`}
              className="inline-flex h-11 items-center rounded-full border-2 border-ink bg-sky px-3 text-sm font-extrabold text-ink"
            >
              {habitatLabel[habitat]}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl">Favourites</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {favourites.map((animal) => (
            <AnimalCard key={animal.slug} animal={animal} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Surprise() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        const pick = animals[Math.floor(Math.random() * animals.length)];
        void navigate({ to: "/animals/$slug", params: { slug: pick.slug } });
      }}
      className="inline-flex h-11 items-center rounded-card border-2 border-ink bg-sand px-4 font-extrabold text-ink"
    >
      Surprise me
    </button>
  );
}
