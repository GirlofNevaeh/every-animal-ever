export const locales = ["en", "gd", "cy", "ga", "fr", "it", "es", "ru"] as const;

export type Locale = (typeof locales)[number];

export const localeLabel: Record<Locale, string> = {
  en: "English",
  gd: "Gàidhlig",
  cy: "Cymraeg",
  ga: "Gaeilge",
  fr: "Français",
  it: "Italiano",
  es: "Español",
  ru: "Русский",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  gd: "GD",
  cy: "CY",
  ga: "GA",
  fr: "FR",
  it: "IT",
  es: "ES",
  ru: "RU",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
