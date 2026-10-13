import { Link, createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/work/")({
  component: WorkPage,
});

const sheets = [
  { id: "map", title: "Habitat map", text: "Label ten places. Add one animal to each." },
  { id: "facts", title: "Unusual but true", text: "Read a fact. Draw the animal." },
  { id: "report", title: "My animal page", text: "Fill the blanks for one animal." },
];

function WorkPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("Work")}</h1>
      <p className="mt-1 text-lg">{t("Print a page. Class projects are on the Projects tab.")}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {sheets.map((sheet) => (
          <Link
            key={sheet.id}
            to="/work/$sheet"
            params={{ sheet: sheet.id }}
            className="rounded-card border-2 border-ink bg-sand p-4 shadow-[4px_4px_0_#121212]"
          >
            <h2 className="font-display text-2xl">{t(sheet.title)}</h2>
            <p className="mt-2 text-sm">{t(sheet.text)}</p>
          </Link>
        ))}
      </div>
      <Link
        to="/projects"
        search={{ stage: "", kind: "" }}
        className="mt-6 block rounded-card border-2 border-leaf bg-sand p-4"
      >
        <span className="block font-display text-3xl">{t("Projects")}</span>
        <span className="mt-1 block font-bold">{t("On your own and with a team. For young learners.")}</span>
      </Link>
    </main>
  );
}
