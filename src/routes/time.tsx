import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/time")({
  component: TimePage,
});

const owlSteps = [
  { title: "Late day", text: "The barn owl rests in a quiet barn. Its eyes are shut." },
  { title: "Dusk", text: "The sky dims. The owl wakes and listens." },
  { title: "Night", text: "It flies over a field. Soft feathers make little sound." },
  { title: "A hunt", text: "It hears a small animal in the grass. It hunts." },
  { title: "Before dawn", text: "It may hunt once more. Then it goes back to rest." },
];

const ternSteps = [
  { title: "Arctic summer", text: "The Arctic tern nests in the far north. Chicks hatch." },
  { title: "Late summer", text: "The family gets ready to leave the nest grounds." },
  { title: "The long flight", text: "It flies down the oceans toward the far south." },
  { title: "Southern summer", text: "It feeds where it is summer, near the bottom of the world." },
  { title: "North again", text: "It flies back to the Arctic for the next nest." },
];

function TimePage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-4 px-3 py-4 lg:grid-cols-2">
      <Stepper
        kicker="One day"
        title="A barn owl's night"
        steps={owlSteps}
        dark
        slug="barn-owl"
        link="Barn owl"
      />
      <Stepper
        kicker="One year"
        title="An Arctic tern's year"
        steps={ternSteps}
        slug="arctic-tern"
        link="Arctic tern"
      />
    </main>
  );
}

function Stepper({
  kicker,
  title,
  steps,
  dark = false,
  slug,
  link,
}: {
  kicker: string;
  title: string;
  steps: { title: string; text: string }[];
  dark?: boolean;
  slug: string;
  link: string;
}) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const step = steps[index];
  return (
    <section className={`flex min-h-80 flex-col rounded-card border-2 border-ink p-4 ${dark ? "bg-ink text-sand" : "bg-sand text-ink"}`}>
      <p className="text-sm font-extrabold">{t(kicker)}</p>
      <h1 className="font-display text-3xl">{t(title)}</h1>
      <p className="mt-4 font-display text-5xl tabular-nums">{index + 1}</p>
      <h2 className="font-display text-2xl">{t(step.title)}</h2>
      <p className="mt-2 text-lg">{t(step.text)}</p>
      <div className="mt-auto flex gap-2 pt-6">
        <button
          type="button"
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          disabled={index === 0}
          className="h-12 flex-1 rounded-card border-2 border-ink bg-sand font-extrabold text-ink disabled:opacity-40"
        >
          {t("Earlier")}
        </button>
        <button
          type="button"
          onClick={() => setIndex((value) => Math.min(steps.length - 1, value + 1))}
          disabled={index === steps.length - 1}
          className="h-12 flex-1 rounded-card border-2 border-ink bg-sand font-extrabold text-ink disabled:opacity-40"
        >
          {t("Later")}
        </button>
      </div>
      <Link to="/animals/$slug" params={{ slug }} className={`mt-3 text-sm font-extrabold underline ${dark ? "text-sand" : "text-ink"}`}>
        {t(link)}
      </Link>
    </section>
  );
}
