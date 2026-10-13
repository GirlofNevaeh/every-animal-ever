import { Link, createFileRoute } from "@tanstack/react-router";
import { dayAnimals, groupsOfAnimals, hiders, migrants, nightAnimals } from "@/data/animals";
import type { Animal } from "@/data/types";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/habits")({
  component: HabitsPage,
});

const homes = [
  ["Nest.", "Birds build nests. A gorilla builds a leaf nest for sleep."],
  ["Burrow.", "Rabbits, foxes, and meerkats dig homes under the ground."],
  ["Den.", "Bears and wolves rest in a den."],
  ["Hive.", "Honey bees share a hive."],
  ["Web.", "A garden spider spins a silk web. A spider is not an insect."],
  ["Lodge.", "A beaver piles sticks into a lodge in a pond."],
  ["Shell.", "A snail grows a shell. A hermit crab borrows an empty one."],
] as const;

function HabitsPage() {
  const { t } = useI18n();
  return (
    <main>
      <section className="bg-ink px-4 py-8 text-sand">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl">{t("Habits")}</h1>
          <p className="mt-2 max-w-xl text-lg">
            {t("Some animals are busy at night. Some move with the seasons. Some hide. Some stay together.")}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <HabitList title="Day" animals={dayAnimals.slice(0, 6)} note="These animals are out in the light." />
            <HabitList title="Night" animals={nightAnimals.slice(0, 6)} note="These animals wake when it is dark." />
          </div>
        </div>
      </section>

      <section className="bg-sky px-4 py-8 text-ink">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl">{t("On the move")}</h2>
          <p className="mt-2 max-w-xl">
            {t("Migration means a long trip that comes around again. The animal is not lost.")}
          </p>
          <NameRow animals={migrants.slice(0, 8)} />
        </div>
      </section>

      <section className="bg-sand px-4 py-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          <article className="rounded-card border-2 border-ink bg-leaf p-4 text-sand">
            <h2 className="font-display text-3xl">{t("Hiding")}</h2>
            <p className="mt-2">{t("Camouflage is a colour or shape that blends in.")}</p>
            <NameRow animals={hiders.slice(0, 6)} light />
          </article>
          <article className="rounded-card border-2 border-ink p-4">
            <h2 className="font-display text-3xl">{t("Together")}</h2>
            <p className="mt-2">{t("A herd, a pack, a flock, or a pod. They stay with others.")}</p>
            <NameRow animals={groupsOfAnimals.slice(0, 6)} />
          </article>
        </div>
      </section>

      <section className="bg-sand px-4 pb-8">
        <div className="mx-auto max-w-5xl rounded-card border-2 border-dashed border-ink p-4">
          <h2 className="font-display text-3xl">{t("Homes")}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {homes.map(([name, line]) => (
              <li key={name}>
                <strong>{t(name)}</strong> {t(line)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-berry px-4 py-8 text-sand">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl">{t("Stories")}</h2>
          <p className="mt-2 text-sm font-extrabold tracking-wide">{t("These are stories. They are not facts.")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <article className="rounded-card bg-sand p-4 text-ink">
              <p className="text-xs font-extrabold text-berry">{t("Story")}</p>
              <h3 className="font-display text-2xl">{t("The tortoise and the hare")}</h3>
              <p className="mt-2">{t("A story race. Real tortoises are slow. Real hares are fast. The race did not happen.")}</p>
            </article>
            <article className="rounded-card bg-sand p-4 text-ink">
              <p className="text-xs font-extrabold text-berry">{t("Story")}</p>
              <h3 className="font-display text-2xl">{t("How the camel got its hump")}</h3>
              <p className="mt-2">{t("A story. A real camel hump stores fat, not a wish.")}</p>
            </article>
            <article className="rounded-card bg-sand p-4 text-ink">
              <p className="text-xs font-extrabold text-berry">{t("Story")}</p>
              <h3 className="font-display text-2xl">{t("A unicorn")}</h3>
              <p className="mt-2">{t("A unicorn is a story animal. It is not a real animal.")}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function HabitList({ title, note, animals }: { title: string; note: string; animals: Animal[] }) {
  const { t } = useI18n();
  return (
    <article>
      <h2 className="font-display text-3xl">{t(title)}</h2>
      <p className="mt-1 text-sand/90">{t(note)}</p>
      <NameRow animals={animals} light />
    </article>
  );
}

function NameRow({ animals, light = false }: { animals: Animal[]; light?: boolean }) {
  const { t } = useI18n();
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {animals.map((animal) => (
        <li key={animal.slug}>
          <Link
            to="/animals/$slug"
            params={{ slug: animal.slug }}
            className={`inline-flex h-11 items-center rounded-full border-2 px-3 text-sm font-extrabold ${
              light ? "border-sand bg-sand text-ink" : "border-ink bg-sand text-ink"
            }`}
          >
            {t(animal.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
