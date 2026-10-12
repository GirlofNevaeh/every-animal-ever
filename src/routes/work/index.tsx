import { Link, createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/work/")({
  component: WorkPage,
});

const sheets = [
  { id: "map", title: "Habitat map", text: "Label ten places. Add one animal to each." },
  { id: "facts", title: "Unusual but true", text: "Read a fact. Draw the animal." },
  { id: "report", title: "My animal page", text: "Fill the blanks for one animal." },
];

function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">Work</h1>
      <p className="mt-1 text-lg">Print a page, or pick a project.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {sheets.map((sheet) => (
          <Link
            key={sheet.id}
            to="/work/$sheet"
            params={{ sheet: sheet.id }}
            className="rounded-card border-2 border-ink bg-sand p-4 shadow-[4px_4px_0_#121212]"
          >
            <h2 className="font-display text-2xl">{sheet.title}</h2>
            <p className="mt-2 text-sm">{sheet.text}</p>
          </Link>
        ))}
      </div>
      <h2 className="mt-8 font-display text-3xl">Primary 1 to Primary 7</h2>
      <div className="mt-3 grid gap-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to="/work/$sheet"
            params={{ sheet: project.id }}
            className="grid gap-1 rounded-card border-2 border-leaf bg-sand p-4 sm:grid-cols-[140px_1fr]"
          >
            <span>
              <span className="block font-display text-2xl">{project.stage}</span>
              <span className="text-sm font-bold">{project.age}</span>
            </span>
            <span>
              <span className="block font-extrabold">On your own: {project.solo.title}</span>
              <span className="block font-extrabold">With a team: {project.team.title}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
