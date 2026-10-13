import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("How animals are grouped")}</h1>
      <p className="mt-3 text-lg">
        {t("People sort animals so we can talk about them. One big split is the backbone.")}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <section className="rounded-card border-2 border-ink bg-sky p-4">
          <h2 className="font-display text-2xl">{t("Has a backbone")}</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>{t("Mammals")}</strong> {t("have hair or fur. Mothers make milk.")}
            </li>
            <li>
              <strong>{t("Birds")}</strong> {t("have feathers.")}
            </li>
            <li>
              <strong>{t("Reptiles")}</strong> {t("have dry scales.")}
            </li>
            <li>
              <strong>{t("Amphibians")}</strong> {t("often start in water.")}
            </li>
            <li>
              <strong>{t("Fish")}</strong> {t("live in water and use gills.")}
            </li>
          </ul>
        </section>
        <section className="rounded-card border-2 border-ink bg-leaf p-4 text-sand">
          <h2 className="font-display text-2xl">{t("No backbone")}</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>{t("Insects")}</strong> {t("have six legs and three body parts.")}
            </li>
            <li>
              <strong>{t("Other animals")}</strong> {t("here have no backbone, and they are not insects.")}
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-6 space-y-3">
        <h2 className="font-display text-3xl">{t("Easy to mix up")}</h2>
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
  const { t } = useI18n();
  return (
    <article className="rounded-card border-l-8 border-berry bg-sand p-4">
      <h3 className="font-display text-2xl">{t(title)}</h3>
      <p className="mt-1">{t(body)}</p>
    </article>
  );
}
