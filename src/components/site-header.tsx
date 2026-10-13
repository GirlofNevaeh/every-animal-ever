import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/i18n/context";
import { localeLabel, localeShort, locales } from "@/i18n/locales";
import { useAccess } from "@/lib/access";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/animals", label: "Animals" },
  { to: "/places", label: "Places" },
  { to: "/habits", label: "Habits" },
  { to: "/time", label: "Time" },
  { to: "/quiz", label: "Quiz" },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/people", label: "People" },
  { to: "/about", label: "About" },
] as const;

function active(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function SiteHeader() {
  const { t, locale, setLocale } = useI18n();
  const { open, lock } = useAccess();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [install, setInstall] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/15 bg-sand">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-2 px-3">
        <Link to="/" className="truncate font-display text-lg leading-none font-bold text-ink">
          {t("Every Animal Ever")}
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={langOpen}
            aria-label={t("Language")}
            onClick={() => setLangOpen(true)}
            className="h-10 min-w-11 shrink-0 rounded-card border-2 border-ink bg-sand px-2 text-xs font-extrabold text-ink"
          >
            {localeShort[locale]}
          </button>
          {open ? (
            <button
              type="button"
              onClick={() => void lock()}
              className="h-10 shrink-0 rounded-card border-2 border-ink bg-sand px-2 text-xs font-extrabold text-ink sm:text-sm"
            >
              {t("Lock")}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setInstall(true)}
            className="h-10 shrink-0 rounded-card border-2 border-ink bg-sand px-2 text-xs font-extrabold text-ink sm:text-sm"
          >
            {t("Add to Home")}
          </button>
        </div>
      </div>
      {open ? (
      <nav aria-label={t("Pages")} className="mx-auto grid max-w-5xl grid-cols-5 gap-1 px-2 pb-2 sm:grid-cols-10">
        {NAV.map((item) => {
          const on = active(path, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex min-h-11 items-center justify-center rounded-card border-2 px-1 py-1 text-center text-xs leading-tight font-extrabold text-ink sm:text-sm ${
                on ? "border-leaf bg-sand" : "border-ink/20 bg-sand"
              }`}
            >
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
      ) : null}
      {langOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lang-title"
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-card border-2 border-ink bg-sand p-5 text-ink"
          >
            <h2 id="lang-title" className="font-display text-2xl">
              {t("Choose a language")}
            </h2>
            <div className="mt-3 grid gap-2">
              {locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={item === locale}
                  onClick={() => {
                    setLocale(item);
                    setLangOpen(false);
                  }}
                  className={`flex h-12 items-center justify-between rounded-card border-2 px-3 text-left font-extrabold text-ink ${
                    item === locale ? "border-leaf bg-sand" : "border-ink/25 bg-sand"
                  }`}
                >
                  <span>{localeLabel[item]}</span>
                  <span className="text-sm">{localeShort[item]}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLangOpen(false)}
              className="mt-4 h-11 w-full rounded-card border-2 border-ink bg-sand font-extrabold text-ink"
            >
              {t("Close")}
            </button>
          </div>
        </div>
      ) : null}
      {install ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
            className="w-full max-w-md rounded-card border-2 border-ink bg-sand p-5 text-ink"
          >
            <h2 id="install-title" className="font-display text-2xl">
              {t("Add to iPhone or iPad")}
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base">
              <li>{t("Use Safari.")}</li>
              <li>{t("Tap Share.")}</li>
              <li>{t("Tap Add to Home Screen.")}</li>
            </ol>
            <button
              type="button"
              onClick={() => setInstall(false)}
              className="mt-4 h-11 w-full rounded-card border-2 border-ink bg-sand font-extrabold text-ink"
            >
              {t("Close")}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t-2 border-ink/15 bg-sand px-4 py-6 text-sm text-ink">
      <p className="mx-auto max-w-5xl">
        {t("Mammals, birds, reptiles, amphibians, fish, insects, and other animals.")}
      </p>
      <p className="mx-auto mt-2 max-w-5xl">
        <Link to="/credits" className="font-extrabold underline">
          {t("Photo credits")}
        </Link>
      </p>
    </footer>
  );
}
