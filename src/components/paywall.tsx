import { type FormEvent, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAccess } from "@/lib/access";
import { useI18n } from "@/i18n/context";

const BUY_URL = "https://www.everyschoolever.com/pricing?plan=";

export function Paywall() {
  const { t } = useI18n();
  const { unlock } = useAccess();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(false);
    if (!key.trim()) return;
    setPending(true);
    const ok = await unlock(key);
    setPending(false);
    if (!ok) setError(true);
  }

  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <section className="rounded-card border-2 border-ink bg-leaf p-5 text-sand">
        <p className="font-extrabold text-sand">{t("Age 5-12")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{t("Every Animal Ever")}</h1>
        <p className="mt-3 text-lg font-extrabold">{t("A bright guide to animals for children.")}</p>
        <p className="mt-2 font-bold">
          {t("Animals, places, habits, people, projects, a quiz, and work are inside.")}
        </p>
        <p className="mt-2 font-bold">{t("The home page stays open. The rest needs an access key.")}</p>
      </section>
      <section className="rounded-card border-2 border-ink bg-sand p-5">
        <h2 className="font-display text-3xl">{t("Buy an access key")}</h2>
        <p className="mt-2 text-lg font-bold">
          {t("Buy an access key at Every School Ever. Then come back and type it here.")}
        </p>
        <a
          href={BUY_URL}
          className="mt-4 grid min-h-14 place-items-center rounded-card border-2 border-ink bg-sky px-4 text-center text-lg font-extrabold text-ink"
        >
          {t("Buy an access key")}
        </a>
      </section>
      <form onSubmit={onSubmit} className="rounded-card border-2 border-ink bg-sky p-5">
        <label htmlFor="access-key" className="font-display text-3xl font-bold">
          {t("Access key")}
        </label>
        <input
          id="access-key"
          name="key"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            setError(false);
          }}
          autoCapitalize="characters"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={error}
          className="mt-3 min-h-14 w-full rounded-card border-2 border-ink bg-sand px-4 text-lg font-extrabold text-ink"
        />
        {error ? (
          <p role="alert" className="mt-3 font-extrabold text-berry">
            {t("That key does not work. Check it and try again.")}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending || key.trim().length === 0}
          className="mt-4 min-h-14 w-full rounded-card border-2 border-ink bg-leaf px-4 text-lg font-extrabold text-sand disabled:opacity-60"
        >
          {t("Enter key")}
        </button>
      </form>
      <Link to="/" className="text-center font-extrabold text-leaf">
        {t("Home")}
      </Link>
    </main>
  );
}
