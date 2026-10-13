import { Link, createFileRoute } from "@tanstack/react-router";
import { people } from "@/data/people";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/people/")({
  component: PeoplePage,
});

function PeoplePage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("People")}</h1>
      <p className="mt-1 text-lg">{t("Ten people whose names go with animals.")}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {people.map((person) => (
          <Link
            key={person.slug}
            to="/people/$slug"
            params={{ slug: person.slug }}
            className="overflow-hidden rounded-card border-2 border-ink bg-sand text-ink shadow-[4px_4px_0_#121212]"
          >
            <img
              src={person.photo.src}
              alt={person.name}
              className="h-40 w-full bg-sky object-cover object-top"
            />
            <span className="block p-3">
              <span className="block font-display text-xl leading-tight">{person.name}</span>
              <span className="mt-1 block text-sm font-extrabold text-leaf">{t(person.knownFor)}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
