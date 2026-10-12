import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimalCard } from "@/components/animal-card";
import { filterAnimals } from "@/data/animals";
import { habitatLabel, isHabitat } from "@/data/labels";

export const Route = createFileRoute("/places/$habitat")({
  loader: ({ params }) => {
    if (!isHabitat(params.habitat)) throw notFound();
    return params.habitat;
  },
  notFoundComponent: () => (
    <main className="px-4 py-8">
      <h1 className="font-display text-3xl">That place is not on the map</h1>
      <Link to="/places" className="mt-3 inline-flex font-extrabold text-leaf">
        Back to Places
      </Link>
    </main>
  ),
  component: HabitatPage,
});

const blurbs: Record<string, string> = {
  ocean: "Salt water covers most of Earth. Whales, sharks, and octopuses live here.",
  coral: "A coral reef is built by tiny animals. Many fish hide in it.",
  river: "A river moves fresh water from land to the sea. Otters and salmon use it.",
  forest: "A forest is full of trees. Owls, foxes, and squirrels live here.",
  rainforest: "A rainforest is warm and wet. Trees stay green all year.",
  desert: "A desert is very dry. Animals here save water.",
  grassland: "Grassland is open land with few trees. Herds eat the grass.",
  arctic: "The Arctic is the cold far north. Ice and snow last a long time.",
  mountains: "Mountains are high and steep. Some animals have thick coats.",
  park: "A city park is a green place near people. Birds, bees, and squirrels visit.",
};

function HabitatPage() {
  const habitat = Route.useLoaderData();
  const list = filterAnimals("", "", habitat);

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <Link to="/places" className="text-sm font-extrabold text-leaf">
        All places
      </Link>
      <h1 className="mt-2 font-display text-4xl">{habitatLabel[habitat]}</h1>
      <p className="mt-2 max-w-xl text-lg">{blurbs[habitat]}</p>
      <p className="mt-2 text-sm font-bold">{list.length} animals live here.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((animal) => (
          <AnimalCard key={animal.slug} animal={animal} />
        ))}
      </div>
    </main>
  );
}
