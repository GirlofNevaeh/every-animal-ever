import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimalCard } from "@/components/animal-card";
import { Portrait, PhotoCredit } from "@/components/portrait";
import { SearchForm } from "@/components/search-form";
import { animals, getAnimal } from "@/data/animals";
import { groupLabel, groups, habitatLabel, habitats } from "@/data/labels";
import { people } from "@/data/people";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useI18n();
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
            <p className="text-sm font-extrabold tracking-wide text-ink">{t("Today's animal")}</p>
            <h1 className="font-display text-4xl text-ink">{t(hero.name)}</h1>
            <p className="mt-2 text-lg text-ink">{t(hero.fact)}</p>
            <PhotoCredit slug={hero.slug} className="mt-2" />
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`/animals/${hero.slug}`}
                className="inline-flex h-11 items-center rounded-card border-2 border-ink bg-sand px-4 font-extrabold text-ink"
              >
                {t("Open page")}
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
        <h2 className="font-display text-3xl">{t("Groups")}</h2>
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
              {t(groupLabel[group])}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-card border-2 border-ink bg-berry text-sand">
        <h2 className="px-4 pt-3 font-display text-2xl">{t("Unusual but true")}</h2>
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          {facts.slice(0, 4).map((animal) => (
            <p key={animal.slug} className="rounded-card bg-sand p-3 text-sm font-bold text-ink">
              {t(animal.name)}: {t(animal.fact)}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl">{t("Places")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {habitats.map((habitat) => (
            <a
              key={habitat}
              href={`/places/${habitat}`}
              className="inline-flex h-11 items-center rounded-full border-2 border-ink bg-sky px-3 text-sm font-extrabold text-ink"
            >
              {t(habitatLabel[habitat])}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl">{t("People")}</h2>
          <Link to="/people" className="text-sm font-extrabold text-leaf">
            {t("All ten")}
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {people.map((person) => (
            <Link
              key={person.slug}
              to="/people/$slug"
              params={{ slug: person.slug }}
              className="overflow-hidden rounded-card border-2 border-ink bg-sand"
            >
              <img
                src={person.photo.src}
                alt=""
                className="h-28 w-full object-cover object-top"
              />
              <span className="block px-2 py-2 text-sm leading-tight font-extrabold">{person.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-card border-2 border-leaf bg-sand p-4">
        <h2 className="font-display text-3xl">{t("Projects")}</h2>
        <p className="mt-1">{t("On your own, or with a team. Age 5-6 to Age 11-12.")}</p>
        <Link
          to="/projects"
          search={{ stage: "", kind: "" }}
          className="mt-3 inline-flex h-11 items-center rounded-card border-2 border-ink bg-leaf px-4 font-extrabold text-sand"
        >
          {t("Open projects")}
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl">{t("Favourites")}</h2>
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
  const { t } = useI18n();
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
      {t("Surprise me")}
    </button>
  );
}
