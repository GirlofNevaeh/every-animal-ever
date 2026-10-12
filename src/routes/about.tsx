import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl">How animals are grouped</h1>
      <p className="mt-3 text-lg">
        People sort animals so we can talk about them. One big split is the backbone.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <section className="rounded-card border-2 border-ink bg-sky p-4">
          <h2 className="font-display text-2xl">Has a backbone</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>Mammals</strong> have hair or fur. Mothers make milk.
            </li>
            <li>
              <strong>Birds</strong> have feathers.
            </li>
            <li>
              <strong>Reptiles</strong> have dry scales.
            </li>
            <li>
              <strong>Amphibians</strong> often start in water.
            </li>
            <li>
              <strong>Fish</strong> live in water and use gills.
            </li>
          </ul>
        </section>
        <section className="rounded-card border-2 border-ink bg-leaf p-4 text-sand">
          <h2 className="font-display text-2xl">No backbone</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>Insects</strong> have six legs and three body parts.
            </li>
            <li>
              <strong>Other animals</strong> here have no backbone, and they are not insects.
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-6 space-y-3">
        <h2 className="font-display text-3xl">Easy to mix up</h2>
        <Callout title="A whale is a mammal." body="It breathes air. It is not a fish. A dolphin is a mammal too. An orca is the biggest dolphin." />
        <Callout title="A penguin is a bird." body="It cannot fly. It still has feathers, so it is a bird." />
        <Callout title="A shark is a fish." body="Its skeleton is cartilage, not bone like yours. Cartilage is the bendy stuff in your ears and nose." />
        <Callout title="A spider is not an insect." body="Insects have six legs. Spiders have eight." />
        <Callout title="A bat is a mammal." body="It is the only mammal that truly flies. A bird is not a mammal." />
      </section>
    </main>
  );
}

function Callout({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-card border-l-8 border-berry bg-sand p-4">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-1">{body}</p>
    </article>
  );
}
