import type { Animal } from "@/data/animals";
import { groupLabel } from "@/data/labels";
import { photos, type Photo } from "@/data/photos";
import { useI18n } from "@/i18n/context";

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
  const { t } = useI18n();
  const photo = photos[animal.slug];
  if (photo) {
    return (
      <img
        src={photo.src}
        alt={t(animal.name)}
        className={`rounded-card bg-sand object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-card bg-sky/40 text-center text-ink ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-2xl leading-none">{t(animal.name).slice(0, 1)}</span>
      <span className="mt-1 px-1 text-xs font-bold">{t(groupLabel[animal.group])}</span>
    </div>
  );
}

export function PhotoCredit({
  slug,
  photo,
  className = "",
}: {
  slug?: string;
  photo?: Photo;
  className?: string;
}) {
  const { t } = useI18n();
  const item = photo ?? (slug ? photos[slug] : undefined);
  if (!item) return null;
  return (
    <p className={`text-xs leading-snug font-bold text-ink ${className}`}>
      {t("Photo by")} {item.author}.{" "}
      {item.licenseUrl ? (
        <a href={item.licenseUrl} className="underline">
          {item.license}
        </a>
      ) : (
        item.license
      )}
      {" · "}
      <a href={item.source} className="underline">
        {t("Source")}
      </a>
    </p>
  );
}
