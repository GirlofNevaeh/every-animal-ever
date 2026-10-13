import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  filterProjects,
  isProjectKind,
  isStage,
  kindLabel,
  stages,
  type ProjectKind,
  type StageId,
} from "@/data/projects";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/projects/")({
  validateSearch: (search: Record<string, unknown>) => ({
    stage: isStage(search.stage) ? search.stage : "",
    kind: isProjectKind(search.kind) ? search.kind : "",
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useI18n();
  const { stage, kind } = Route.useSearch();
  const navigate = useNavigate();
  const list = filterProjects(stage, kind);
  const shownStages = isStage(stage) ? stages.filter((item) => item.id === stage) : stages;

  function setSearch(next: { stage?: StageId | ""; kind?: ProjectKind | "" }) {
    void navigate({
      to: "/projects",
      search: {
        stage: next.stage ?? stage,
        kind: next.kind ?? kind,
      },
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("Projects")}</h1>
      <p className="mt-1 text-lg">{t("Age 5-6 to Age 11-12. Work on your own, or with a team.")}</p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t("Age")}>
        <FilterChip on={stage === ""} label={t("All ages")} onClick={() => setSearch({ stage: "" })} />
        {stages.map((item) => (
          <FilterChip
            key={item.id}
            on={stage === item.id}
            label={t(item.short)}
            onClick={() => setSearch({ stage: item.id })}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={t("Who does the work")}>
        <FilterChip on={kind === ""} label={t("All projects")} onClick={() => setSearch({ kind: "" })} />
        <FilterChip
          on={kind === "individual"}
          label={t("On your own")}
          onClick={() => setSearch({ kind: "individual" })}
        />
        <FilterChip on={kind === "team"} label={t("With a team")} onClick={() => setSearch({ kind: "team" })} />
      </div>

      {list.length === 0 ? (
        <p className="mt-6 rounded-card border-2 border-ink bg-sand p-4 font-bold">{t("No projects for that choice.")}</p>
      ) : (
        shownStages.map((item) => {
          const group = list.filter((project) => project.stage === item.id);
          if (group.length === 0) return null;
          return (
            <section key={item.id} className="mt-6">
              <h2 className="font-display text-3xl">{t(item.label)}</h2>
              <p className="text-sm font-bold">{t(item.focus)}.</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {group.map((project) => (
                  <Link
                    key={project.id}
                    to="/projects/$id"
                    params={{ id: project.id }}
                    className="flex min-h-28 flex-col rounded-card border-2 border-ink bg-sand p-4 shadow-[4px_4px_0_#121212]"
                  >
                    <span
                      className={`inline-flex h-7 w-fit items-center rounded-full border-2 border-ink px-2 text-xs font-extrabold ${
                        project.kind === "team" ? "bg-sky text-ink" : "bg-leaf text-sand"
                      }`}
                    >
                      {t(kindLabel[project.kind])}
                    </span>
                    <span className="mt-2 font-display text-2xl">{t(project.title)}</span>
                    <span className="mt-1 text-sm font-bold">{t(project.time)}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </main>
  );
}

function FilterChip({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex h-11 items-center rounded-full border-2 border-ink px-3 text-sm font-extrabold ${
        on ? "bg-leaf text-sand" : "bg-sand text-ink"
      }`}
    >
      {label}
    </button>
  );
}
