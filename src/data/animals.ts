import { groupLabel, habitatLabel, habitats, isGroup, isHabitat, type Group, type Habitat } from "@/data/labels";
import { rowsA } from "@/data/rows-a";
import { rowsB } from "@/data/rows-b";
import { rowsC } from "@/data/rows-c";
import { rowToAnimal, type Animal } from "@/data/types";

export type { Animal } from "@/data/types";

export const animals: Animal[] = [...rowsA, ...rowsB, ...rowsC].map(rowToAnimal);

const slugs = new Set<string>();
const groupCounts: Record<string, number> = {};
const habitatCounts: Record<string, number> = {};
for (const animal of animals) {
  if (slugs.has(animal.slug)) throw new Error(`Duplicate slug ${animal.slug}`);
  slugs.add(animal.slug);
  groupCounts[animal.group] = (groupCounts[animal.group] ?? 0) + 1;
  for (const habitat of animal.habitats) {
    habitatCounts[habitat] = (habitatCounts[habitat] ?? 0) + 1;
  }
}
if (animals.length !== 200) throw new Error(`Expected 200 animals, got ${animals.length}`);
for (const habitat of habitats) {
  if (!habitatCounts[habitat]) throw new Error(`No animals in ${habitat}`);
}

export function getAnimal(slug: string) {
  return animals.find((animal) => animal.slug === slug);
}

export function filterAnimals(
  q: string,
  group: string,
  habitat: string,
  translate?: (text: string) => string,
) {
  const selectedGroup: Group | "" = isGroup(group) ? group : "";
  const selectedHabitat: Habitat | "" = isHabitat(habitat) ? habitat : "";
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return animals.filter((animal) => {
    if (selectedGroup && animal.group !== selectedGroup) return false;
    if (selectedHabitat && !animal.habitats.includes(selectedHabitat)) return false;
    if (words.length === 0) return true;
    const tr = translate ?? ((text: string) => text);
    const hay = [
      animal.name,
      tr(animal.name),
      animal.slug.replaceAll("-", " "),
      groupLabel[animal.group],
      tr(groupLabel[animal.group]),
      animal.group,
      animal.fact,
      tr(animal.fact),
      animal.where,
      tr(animal.where),
      ...animal.aka,
      ...animal.habitats.flatMap((item) => [habitatLabel[item], tr(habitatLabel[item])]),
    ]
      .join(" ")
      .toLowerCase();
    return words.every((word) => hay.includes(word));
  });
}

export function whatItIs(animal: Animal) {
  const name = animal.name;
  if (animal.slug === "blue-whale" || animal.slug === "humpback-whale" || animal.slug === "narwhal") {
    return `The ${name.toLowerCase()} is a mammal, not a fish. It breathes air.`;
  }
  if (animal.slug === "bottlenose-dolphin") {
    return "The bottlenose dolphin is a mammal, not a fish. It breathes air.";
  }
  if (animal.slug === "orca") {
    return "The orca is a mammal. It is the biggest dolphin, not a fish.";
  }
  if (animal.slug === "emperor-penguin") {
    return "The emperor penguin is a bird, even though it cannot fly.";
  }
  if (animal.slug === "great-white-shark" || animal.slug === "whale-shark" || animal.slug === "hammerhead-shark") {
    return `The ${name.toLowerCase()} is a fish. Its skeleton is cartilage, not bone. Cartilage is the bendy stuff in your ears.`;
  }
  if (animal.slug === "electric-eel") {
    return "The electric eel is a fish, but it is not a true eel.";
  }
  if (animal.slug === "garden-spider") {
    return "The garden spider is not an insect. Insects have six legs. Spiders have eight.";
  }
  if (animal.slug === "tuatara") {
    return "The tuatara looks like a lizard, but it is not one. It is a reptile from an older group.";
  }
  if (animal.slug === "little-brown-bat") {
    return "The little brown bat is a mammal. It is the kind of mammal that can truly fly.";
  }
  if (animal.slug === "platypus") {
    return "The platypus is a mammal that lays eggs.";
  }
  if (animal.slug === "reef-coral") {
    return "Coral looks like a rock or a plant, but it is an animal.";
  }
  if (animal.slug === "horseshoe-crab") {
    return "The horseshoe crab is not a true crab. It is closer to spiders.";
  }
  if (animal.slug === "american-bison") {
    return "The American bison is a mammal. It is not the same animal as an African buffalo.";
  }
  if (animal.group === "other") {
    return `The ${name.toLowerCase()} is an animal with no backbone. It is not an insect.`;
  }
  const article = animal.group === "insect" || animal.group === "amphibian" ? "an" : "a";
  const label = animal.group === "fish" ? "fish" : animal.group;
  return `The ${name.toLowerCase()} is ${article} ${label}.`;
}

export const nightAnimals = animals.filter((animal) => animal.rhythm === "night");
export const dayAnimals = animals.filter((animal) => animal.rhythm === "day");
export const migrants = animals.filter((animal) => animal.migrates);
export const hiders = animals.filter((animal) => animal.camouflage);
export const groupsOfAnimals = animals.filter((animal) => animal.herd);

export function animalsByHome(home: Animal["home"]) {
  return animals.filter((animal) => animal.home === home);
}
