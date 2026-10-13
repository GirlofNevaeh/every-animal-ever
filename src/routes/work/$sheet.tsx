import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { animals } from "@/data/animals";
import { habitatLabel, habitats } from "@/data/labels";
import { useI18n } from "@/i18n/context";

const sheets = new Set(["map", "facts", "report"]);

export const Route = createFileRoute("/work/$sheet")({
  loader: ({ params }) => {
    if (!sheets.has(params.sheet)) throw notFound();
    return params.sheet;
  },
  notFoundComponent: MissingSheet,
  component: SheetPage,
});

function SheetPage() {
  const { t } = useI18n();
  const sheet = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <div className="no-print flex gap-2">
        <Link to="/work" className="inline-flex h-11 items-center font-extrabold text-leaf">
          {t("All work")}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-11 rounded-card border-2 border-ink bg-sand px-4 font-extrabold"
        >
          {t("Print")}
        </button>
      </div>
      {sheet === "map" ? <MapSheet /> : null}
      {sheet === "facts" ? <FactsSheet /> : null}
      {sheet === "report" ? <ReportSheet /> : null}
    </main>
  );
}

function MapSheet() {
  const { t } = useI18n();
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">{t("Habitat map")}</h1>
      <p className="mt-1">{t("The place is named in each box. Write one animal that lives there.")}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {habitats.map((habitat) => (
          <div key={habitat} className="rounded-card border-2 border-dashed border-ink p-3">
            <p className="font-display text-2xl">{t(habitatLabel[habitat])}</p>
            <p className="mt-6 border-b-2 border-ink/40">&nbsp;</p>
            <p className="mt-2 text-sm">{t("Animal: __________________")}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function FactsSheet() {
  const { t } = useI18n();
  const facts = animals.filter((animal) => animal.favourite).slice(0, 8);
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">{t("Unusual but true")}</h1>
      <p className="mt-1">{t("Read the fact. Draw the animal in the box.")}</p>
      <div className="mt-4 grid gap-4">
        {facts.map((animal) => (
          <section key={animal.slug} className="grid gap-2 border-t-2 border-ink/15 pt-3 sm:grid-cols-[1fr_120px]">
            <div>
              <h2 className="font-display text-2xl">{t(animal.name)}</h2>
              <p>{t(animal.fact)}</p>
            </div>
            <div className="h-28 rounded-card border-2 border-dashed border-ink" />
          </section>
        ))}
      </div>
    </article>
  );
}

function ReportSheet() {
  const { t } = useI18n();
  const lines = ["Name", "Group", "Where it lives", "What it eats", "How big", "Unusual fact"];
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">{t("My animal page")}</h1>
      <div className="mt-4 space-y-5">
        {lines.map((line) => (
          <p key={line}>
            <span className="font-extrabold">{t(line)}</span>
            <span className="mt-6 block border-b-2 border-ink/40" />
          </p>
        ))}
      </div>
    </article>
  );
}

function MissingSheet() {
  const { t } = useI18n();
  return (
    <main className="px-4 py-8">
      <h1 className="font-display text-3xl">{t("That page is not here")}</h1>
      <Link to="/work" className="font-extrabold text-leaf">
        {t("Back to Work")}
      </Link>
    </main>
  );
}
