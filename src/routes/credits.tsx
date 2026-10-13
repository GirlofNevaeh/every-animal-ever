import { createFileRoute, Link } from "@tanstack/react-router";
import { animals } from "@/data/animals";
import { people } from "@/data/people";
import { photos } from "@/data/photos";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/credits")({
  component: CreditsPage,
});

function CreditsPage() {
  const { t } = useI18n();
  const rows = animals.filter((animal) => photos[animal.slug]);
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("Photo credits")}</h1>
      <ul className="mt-4 space-y-3">
        {rows.map((animal) => {
          const photo = photos[animal.slug];
          if (!photo) return null;
          return (
            <li key={animal.slug} className="rounded-card border-2 border-ink/15 bg-sand p-3">
              <Link
                to="/animals/$slug"
                params={{ slug: animal.slug }}
                className="font-display text-xl"
              >
                {t(animal.name)}
              </Link>
              <p className="mt-1 text-sm font-bold leading-snug">
                {t("Photo by")} {photo.author}.{" "}
                {photo.licenseUrl ? (
                  <a href={photo.licenseUrl} className="underline">
                    {photo.license}
                  </a>
                ) : (
                  photo.license
                )}
                {" · "}
                <a href={photo.source} className="underline">
                  {t("Source")}
                </a>
              </p>
            </li>
          );
        })}
      </ul>
      <h2 className="mt-8 font-display text-3xl">{t("People")}</h2>
      <ul className="mt-4 space-y-3">
        {people.map((person) => (
          <li key={person.slug} className="rounded-card border-2 border-ink/15 bg-sand p-3">
            <Link to="/people/$slug" params={{ slug: person.slug }} className="font-display text-xl">
              {person.name}
            </Link>
            <p className="mt-1 text-sm font-bold leading-snug">
              {t("Photo by")} {person.photo.author}.{" "}
              <a href={person.photo.licenseUrl} className="underline">
                {person.photo.license}
              </a>
              {" · "}
              <a href={person.photo.source} className="underline">
                {t("Source")}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
