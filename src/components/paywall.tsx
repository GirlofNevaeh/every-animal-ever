import { type FormEvent, useState } from "react";
import { PhotoCredit, Portrait } from "@/components/portrait";
import { animals, getAnimal } from "@/data/animals";
import { useAccess } from "@/lib/access";
import { useI18n } from "@/i18n/context";

const BUY_URL = "https://everyschoolever.com";

export function Paywall() {
  const { t } = useI18n();
  const { unlock } = useAccess();
  const hero = getAnimal("african-elephant") ?? animals[0];
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(false);
    if (!key.trim()) {
      setError(true);
      return;
    }
    setPending(true);
    const ok = await unlock(key);
    setPending(false);
    if (!ok) setError(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <section className="overflow-hidden rounded-card border-2 border-ink bg-sky">
        <div className="grid gap-3 p-4 sm:grid-cols-[200px_1fr] sm:items-center">
          <Portrait animal={hero} className="mx-auto h-48 w-full max-w-xs border-2 border-ink" />
          <div>
            <h1 className="font-display text-4xl text-ink">{t("Every Animal Ever")}</h1>
            <p className="mt-2 text-lg text-ink">{t("200 animals. One unusual fact on each page.")}</p>
            <PhotoCredit slug={hero.slug} className="mt-2" />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
        <h2 className="font-display text-3xl">{t("This site needs an access key.")}</h2>
        <p className="mt-2 text-lg">
          {t("Places, habits, a class quiz, people, and projects for Primary 1 to Primary 7.")}
        </p>
        <p className="mt-2">
          {t("Buy an access key at Every School Ever. Then type the key here.")}
        </p>
        <a
          href={BUY_URL}
          className="mt-4 inline-flex h-12 items-center rounded-card border-2 border-ink bg-leaf px-4 font-extrabold text-sand"
        >
          {t("Buy an access key")}
        </a>
        <p className="mt-2 text-sm font-bold">everyschoolever.com</p>
      </section>

      <form onSubmit={onSubmit} className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
        <label htmlFor="access-key" className="font-extrabold">
          {t("Access key")}
        </label>
        <input
          id="access-key"
          name="access-key"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            setError(false);
          }}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={error}
          className="mt-2 h-12 w-full rounded-card border-2 border-ink bg-sand px-3 text-lg font-extrabold tracking-wide text-ink"
        />
        {error ? (
          <p role="alert" className="mt-2 font-extrabold text-berry">
            {t("That key does not open the site.")}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-3 h-12 w-full rounded-card border-2 border-ink bg-leaf font-extrabold text-sand disabled:opacity-60"
        >
          {t("Open the site")}
        </button>
      </form>
    </main>
  );
}
