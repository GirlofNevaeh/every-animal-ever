import type { Animal } from "@/data/animals";
import { groupLabel } from "@/data/labels";
import { photos } from "@/data/photos";

export function hasPortrait(slug: string) {
  return slug in photos;
}

export function Portrait({
  animal,
  className = "",
}: {
  animal: Animal;
  className?: string;
}) {
  const photo = photos[animal.slug];
  if (photo) {
    return (
      <img
        src={photo.src}
        alt={animal.name}
        className={`rounded-card bg-sand object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-card bg-sky/40 text-center text-ink ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-2xl leading-none">{animal.name.slice(0, 1)}</span>
      <span className="mt-1 px-1 text-xs font-bold">{groupLabel[animal.group]}</span>
    </div>
  );
}

export function PhotoCredit({ slug, className = "" }: { slug: string; className?: string }) {
  const photo = photos[slug];
  if (!photo) return null;
  return (
    <p className={`text-xs leading-snug font-bold text-ink ${className}`}>
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
  );
}
