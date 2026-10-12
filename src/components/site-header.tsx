import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/animals", label: "Animals" },
  { to: "/places", label: "Places" },
  { to: "/habits", label: "Habits" },
  { to: "/time", label: "Time" },
  { to: "/quiz", label: "Quiz" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

function active(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function SiteHeader() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/15 bg-sand">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-2 px-3">
        <Link to="/" className="truncate font-display text-lg leading-none font-bold text-ink">
          Every Animal Ever
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-10 shrink-0 rounded-card border-2 border-ink bg-sand px-2 text-xs font-extrabold text-ink sm:text-sm"
        >
          Add to Home
        </button>
      </div>
      <nav aria-label="Pages" className="mx-auto grid max-w-5xl grid-cols-4 gap-1 px-2 pb-2">
        {NAV.map((item) => {
          const on = active(path, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex h-11 items-center justify-center rounded-card border-2 px-1 text-center text-sm leading-none font-extrabold text-ink ${
                on ? "border-leaf bg-sand" : "border-ink/20 bg-sand"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
            className="w-full max-w-md rounded-card border-2 border-ink bg-sand p-5 text-ink"
          >
            <h2 id="install-title" className="font-display text-2xl">
              Add to iPhone or iPad
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base">
              <li>Use Safari.</li>
              <li>Tap Share.</li>
              <li>Tap Add to Home Screen.</li>
            </ol>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 h-11 w-full rounded-card border-2 border-ink bg-sand font-extrabold text-ink"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink/15 bg-sand px-4 py-6 text-sm text-ink">
      <p className="mx-auto max-w-5xl">
        Mammals, birds, reptiles, amphibians, fish, insects, and other animals.
      </p>
      <p className="mx-auto mt-2 max-w-5xl">
        <Link to="/credits" className="font-extrabold underline">
          Photo credits
        </Link>
      </p>
    </footer>
  );
}
