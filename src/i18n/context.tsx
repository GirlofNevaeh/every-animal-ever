import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isLocale, localeLabel, locales, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

const STORAGE_KEY = "eae-lang";

const loaders: Record<Exclude<Locale, "en">, () => Promise<{ default: Record<string, string> }>> = {
  gd: () => import("./catalogs/gd.json"),
  cy: () => import("./catalogs/cy.json"),
  ga: () => import("./catalogs/ga.json"),
  fr: () => import("./catalogs/fr.json"),
  it: () => import("./catalogs/it.json"),
  es: () => import("./catalogs/es.json"),
  ru: () => import("./catalogs/ru.json"),
};

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: string) => string;
  fill: (text: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [catalog, setCatalog] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    if (locale === "en") {
      setCatalog({});
      return;
    }
    let cancel = false;
    loaders[locale]().then((mod) => {
      if (!cancel) setCatalog(mod.default);
    });
    return () => {
      cancel = true;
    };
  }, [locale]);

  const t = useCallback(
    (text: string) => {
      if (!text || locale === "en") return text;
      return ui[locale][text] ?? catalog[text] ?? text;
    },
    [catalog, locale],
  );

  const fill = useCallback(
    (text: string, vars: Record<string, string | number>) =>
      t(text).replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(vars[key] ?? "")),
    [t],
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }, []);

  const value = useMemo(() => ({ locale, setLocale, t, fill }), [locale, setLocale, t, fill]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n outside provider");
  return value;
}

export { localeLabel, locales };
