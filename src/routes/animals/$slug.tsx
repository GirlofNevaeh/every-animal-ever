import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Portrait, PhotoCredit } from "@/components/portrait";
import { animals, getAnimal, whatItIs } from "@/data/animals";
import { groupOne, habitatLabel, type Group } from "@/data/labels";
import { useI18n } from "@/i18n/context";

const moreLabel: Record<Group, string> = {
  mammal: "More mammals",
  bird: "More birds",
  reptile: "More reptiles",
  amphibian: "More amphibians",
  fish: "More fish",
  insect: "More insects",
  other: "More other animals",
};

export const Route = createFileRoute("/animals/$slug")({
  loader: ({ params }) => {
    const animal = getAnimal(params.slug);
    if (!animal) throw notFound();
    return animal;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.name} · Every Animal Ever` }] : [],
  }),
  notFoundComponent: MissingAnimal,
  component: AnimalPage,
});

function AnimalPage() {
  const { t } = useI18n();
  const animal = Route.useLoaderData();
  const more = animals
    .filter((item) => item.group === animal.group && item.slug !== animal.slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <Link to="/animals" search={{ q: "", group: "", habitat: "" }} className="text-sm font-extrabold text-leaf">
        {t("All animals")}
      </Link>
      <div className="mt-3 overflow-hidden rounded-card border-2 border-ink bg-sky">
        <Portrait animal={animal} className="mx-auto h-72 w-full max-w-md border-b-2 border-ink" />
        <div className="bg-sand p-4">
          <p className="text-sm font-extrabold text-leaf">{t(groupOne[animal.group])}</p>
          <h1 className="font-display text-4xl">{t(animal.name)}</h1>
          <p className="mt-2 text-lg">{t(whatItIs(animal))}</p>
          <PhotoCredit slug={animal.slug} className="mt-3" />
        </div>
      </div>

      <section className="mt-4 rounded-card bg-leaf p-4 text-sand">
        <h2 className="font-display text-2xl">{t("Unusual but true")}</h2>
        <p className="mt-2 text-lg">{t(animal.fact)}</p>
      </section>

      <div className="mt-4 grid gap-3">
        <Info title="Where it lives" body={animal.where} tone="sky" />
        <Info title="What it eats" body={animal.eats} tone="sand" />
        <Info title="How big" body={animal.size} tone="sand" />
      </div>

      <p className="mt-3 text-sm font-bold">
        {t("Places:")}{" "}
        {animal.habitats.map((habitat) => t(habitatLabel[habitat])).join(", ")}
      </p>

      {animal.endangered ? (
        <p className="mt-3 rounded-card border-2 border-berry bg-sand p-3 text-ink">{t(animal.endangered)}</p>
      ) : null}

      <section className="mt-6">
        <h2 className="font-display text-2xl">{t(moreLabel[animal.group])}</h2>
        <ul className="mt-2 grid gap-2">
          {more.map((item) => (
            <li key={item.slug}>
              <Link
                to="/animals/$slug"
                params={{ slug: item.slug }}
                className="flex min-h-11 items-center rounded-card border-2 border-ink/20 bg-sand px-3 font-extrabold"
              >
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Info({ title, body, tone }: { title: string; body: string; tone: "sky" | "sand" }) {
  const { t } = useI18n();
  return (
    <section className={`rounded-card border-2 border-ink p-4 ${tone === "sky" ? "bg-sky" : "bg-sand"}`}>
      <h2 className="font-display text-2xl">{t(title)}</h2>
      <p className="mt-1 text-lg">{t(body)}</p>
    </section>
  );
}

function MissingAnimal() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-display text-3xl">{t("No animal by that name")}</h1>
      <Link to="/animals" search={{ q: "", group: "", habitat: "" }} className="mt-4 inline-flex h-11 items-center font-extrabold text-leaf">
        {t("Back to Animals")}
      </Link>
    </main>
  );
}
