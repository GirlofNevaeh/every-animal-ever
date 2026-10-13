import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Portrait, PhotoCredit } from "@/components/portrait";
import { getAnimal } from "@/data/animals";
import { getPerson } from "@/data/people";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/people/$slug")({
  loader: ({ params }) => {
    const person = getPerson(params.slug);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.name} · Every Animal Ever` }] : [],
  }),
  notFoundComponent: MissingPerson,
  component: PersonPage,
});

function PersonPage() {
  const { t } = useI18n();
  const person = Route.useLoaderData();
  const animals = person.lookUp.map((slug) => getAnimal(slug)).filter((animal) => animal != null);

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <Link to="/people" className="text-sm font-extrabold text-leaf">
        {t("All people")}
      </Link>
      <article className="mt-3 overflow-hidden rounded-card border-2 border-ink bg-sky">
        <img
          src={person.photo.src}
          alt={person.name}
          className="mx-auto h-80 w-full max-w-md border-b-2 border-ink bg-sand object-cover object-top"
        />
        <div className="bg-sand p-4">
          <p className="text-sm font-extrabold text-leaf">{t(person.knownFor)}</p>
          <h1 className="font-display text-4xl">{person.name}</h1>
          <p className="mt-2 text-lg">{t(person.animals)}</p>
          <PhotoCredit photo={person.photo} className="mt-3" />
        </div>
      </article>
      <div className="mt-4 space-y-3">
        {person.lines.map((line) => (
          <p key={line} className="rounded-card border-2 border-ink bg-sand p-4 text-lg">
            {t(line)}
          </p>
        ))}
      </div>
      {animals.length > 0 ? (
        <section className="mt-6">
          <h2 className="font-display text-2xl">{t("Animals to open")}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {animals.map((animal) => (
              <Link
                key={animal.slug}
                to="/animals/$slug"
                params={{ slug: animal.slug }}
                className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-card border-2 border-ink bg-sand p-2"
              >
                <Portrait animal={animal} className="h-20 w-full border-2 border-ink" />
                <span className="font-extrabold">{t(animal.name)}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function MissingPerson() {
  const { t } = useI18n();
  return (
    <main className="px-4 py-8">
      <h1 className="font-display text-3xl">{t("That person is not here")}</h1>
      <Link to="/people" className="font-extrabold text-leaf">
        {t("All people")}
      </Link>
    </main>
  );
}
