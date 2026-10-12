import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { animals } from "@/data/animals";
import { habitatLabel, habitats } from "@/data/labels";
import { getProject, type Task } from "@/data/projects";

const sheets = new Set(["map", "facts", "report", "p1", "p2", "p3", "p4", "p5", "p6", "p7"]);

export const Route = createFileRoute("/work/$sheet")({
  loader: ({ params }) => {
    if (!sheets.has(params.sheet)) throw notFound();
    return params.sheet;
  },
  notFoundComponent: () => (
    <main className="px-4 py-8">
      <h1 className="font-display text-3xl">That page is not here</h1>
      <Link to="/work" className="font-extrabold text-leaf">
        Back to Work
      </Link>
    </main>
  ),
  component: SheetPage,
});

function SheetPage() {
  const sheet = Route.useLoaderData();
  const project = getProject(sheet);
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <div className="no-print flex gap-2">
        <Link to="/work" className="inline-flex h-11 items-center font-extrabold text-leaf">
          All work
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-11 rounded-card border-2 border-ink bg-sand px-4 font-extrabold"
        >
          Print
        </button>
      </div>
      {sheet === "map" ? <MapSheet /> : null}
      {sheet === "facts" ? <FactsSheet /> : null}
      {sheet === "report" ? <ReportSheet /> : null}
      {project ? (
        <article className="mt-4">
          <h1 className="font-display text-4xl">{project.stage}</h1>
          <p className="font-bold">{project.age}</p>
          <TaskCard kind="On your own" task={project.solo} />
          <TaskCard kind="With a team" task={project.team} />
        </article>
      ) : null}
    </main>
  );
}

function TaskCard({ kind, task }: { kind: string; task: Task }) {
  return (
    <section className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <p className="text-sm font-extrabold text-leaf">{kind}</p>
      <h2 className="font-display text-3xl">{task.title}</h2>
      <p className="mt-2">
        <strong>Time.</strong> {task.time}
      </p>
      <p>
        <strong>What you need.</strong> {task.need}
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {task.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-2">
        <strong>Finished when.</strong> {task.done}
      </p>
    </section>
  );
}

function MapSheet() {
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">Habitat map</h1>
      <p className="mt-1">Write the place name. Add one animal that lives there.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {habitats.map((habitat, index) => (
          <div key={habitat} className="rounded-card border-2 border-dashed border-ink p-3">
            <p className="text-sm font-extrabold">Place {index + 1}</p>
            <p className="mt-6 border-b-2 border-ink/40">{habitatLabel[habitat] ? "" : ""}</p>
            <p className="mt-4 text-sm">Name: ____________________</p>
            <p className="mt-2 text-sm">Animal: __________________</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function FactsSheet() {
  const facts = animals.filter((animal) => animal.favourite).slice(0, 8);
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">Unusual but true</h1>
      <p className="mt-1">Read the fact. Draw the animal in the box.</p>
      <div className="mt-4 grid gap-4">
        {facts.map((animal) => (
          <section key={animal.slug} className="grid gap-2 border-t-2 border-ink/15 pt-3 sm:grid-cols-[1fr_120px]">
            <div>
              <h2 className="font-display text-2xl">{animal.name}</h2>
              <p>{animal.fact}</p>
            </div>
            <div className="h-28 rounded-card border-2 border-dashed border-ink" />
          </section>
        ))}
      </div>
    </article>
  );
}

function ReportSheet() {
  const lines = ["Name", "Group", "Where it lives", "What it eats", "How big", "Unusual fact"];
  return (
    <article className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h1 className="font-display text-4xl">My animal page</h1>
      <div className="mt-4 space-y-5">
        {lines.map((line) => (
          <p key={line}>
            <span className="font-extrabold">{line}</span>
            <span className="mt-6 block border-b-2 border-ink/40" />
          </p>
        ))}
      </div>
    </article>
  );
}
