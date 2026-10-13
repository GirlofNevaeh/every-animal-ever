import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Portrait } from "@/components/portrait";
import { getAnimal } from "@/data/animals";
import { getProject, getStage, kindLabel } from "@/data/projects";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = getProject(params.id);
    if (!project) throw notFound();
    return project;
  },
  notFoundComponent: MissingProject,
  component: ProjectPage,
});

function ProjectPage() {
  const { t, fill } = useI18n();
  const project = Route.useLoaderData();
  const stage = getStage(project.stage);
  const animals = project.lookUp.map((slug) => getAnimal(slug)).filter((animal) => animal != null);
  const [done, setDone] = useState<boolean[]>(() => project.steps.map(() => false));
  const finished = done.every(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <div className="no-print flex flex-wrap gap-2">
        <Link
          to="/projects"
          search={{ stage: project.stage, kind: "" }}
          className="inline-flex h-11 items-center font-extrabold text-leaf"
        >
          {fill("All {{stage}}", { stage: t(stage.label) })}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-11 rounded-card border-2 border-ink bg-sand px-4 font-extrabold"
        >
          {t("Print")}
        </button>
      </div>

      <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
        <p
          className={`inline-flex h-7 items-center rounded-full border-2 border-ink px-2 text-xs font-extrabold ${
            project.kind === "team" ? "bg-sky text-ink" : "bg-leaf text-sand"
          }`}
        >
          {t(kindLabel[project.kind])}
        </p>
        <h1 className="mt-2 font-display text-4xl">{t(project.title)}</h1>
        <p className="font-bold">
          {t(stage.label)}.
        </p>
        <p className="mt-3">{t(project.aim)}</p>
        <p className="mt-2">
          <strong>{t("Time.")}</strong> {t(project.time)}
        </p>
        <p>
          <strong>{t("What you need.")}</strong> {t(project.need)}
        </p>

        <ol className="mt-4 space-y-2">
          {project.steps.map((step, index) => (
            <li key={step}>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-5 shrink-0 accent-leaf"
                  checked={done[index] ?? false}
                  onChange={() => {
                    setDone((current) => current.map((value, item) => (item === index ? !value : value)));
                  }}
                />
                <span>
                  <span className="font-extrabold">{index + 1}. </span>
                  {t(step)}
                </span>
              </label>
            </li>
          ))}
        </ol>

        <p className="mt-4">
          <strong>{t("Finished when.")}</strong> {t(project.done)}
        </p>
        {finished ? (
          <p className="mt-3 rounded-card border-2 border-leaf bg-leaf px-3 py-2 font-extrabold text-sand">
            {t("Steps done. Check the finished line.")}
          </p>
        ) : null}
      </article>

      {animals.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-display text-2xl">{t("Animals to open")}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {animals.map((animal) => (
              <Link
                key={animal.slug}
                to="/animals/$slug"
                params={{ slug: animal.slug }}
                className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-card border-2 border-ink bg-sand p-2"
              >
                <Portrait animal={animal} className="h-20 w-full border-2 border-ink" />
                <span className="font-extrabold">{t(animal.name)}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function MissingProject() {
  const { t } = useI18n();
  return (
    <main className="px-4 py-8">
      <h1 className="font-display text-3xl">{t("That project is not here")}</h1>
      <Link to="/projects" search={{ stage: "", kind: "" }} className="font-extrabold text-leaf">
        {t("All projects")}
      </Link>
    </main>
  );
}
