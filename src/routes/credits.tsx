import { createFileRoute, Link } from "@tanstack/react-router";
import { animals } from "@/data/animals";
import { photos } from "@/data/photos";

export const Route = createFileRoute("/credits")({
  component: CreditsPage,
});

function CreditsPage() {
  const rows = animals.filter((animal) => photos[animal.slug]);
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl">Photo credits</h1>
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
                {animal.name}
              </Link>
              <p className="mt-1 text-sm font-bold leading-snug">
                Photo by {photo.author}.{" "}
                {photo.licenseUrl ? (
                  <a href={photo.licenseUrl} className="underline">
                    {photo.license}
                  </a>
                ) : (
                  photo.license
                )}
                {" · "}
                <a href={photo.source} className="underline">
                  Source
                </a>
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
