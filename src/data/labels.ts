export const groups = [
  "mammal",
  "bird",
  "reptile",
  "amphibian",
  "fish",
  "insect",
  "other",
] as const;

export type Group = (typeof groups)[number];

export const habitats = [
  "ocean",
  "coral",
  "river",
  "forest",
  "rainforest",
  "desert",
  "grassland",
  "arctic",
  "mountains",
  "park",
] as const;

export type Habitat = (typeof habitats)[number];

export const groupLabel: Record<Group, string> = {
  mammal: "Mammals",
  bird: "Birds",
  reptile: "Reptiles",
  amphibian: "Amphibians",
  fish: "Fish",
  insect: "Insects",
  other: "Other",
};

export const groupOne: Record<Group, string> = {
  mammal: "Mammal",
  bird: "Bird",
  reptile: "Reptile",
  amphibian: "Amphibian",
  fish: "Fish",
  insect: "Insect",
  other: "Other animal",
};

export const habitatLabel: Record<Habitat, string> = {
  ocean: "Ocean",
  coral: "Coral reef",
  river: "River",
  forest: "Forest",
  rainforest: "Rainforest",
  desert: "Desert",
  grassland: "Grassland",
  arctic: "Arctic",
  mountains: "Mountains",
  park: "City park",
};

export const habitatShort: Record<Habitat, string> = {
  ocean: "Ocean",
  coral: "Reef",
  river: "River",
  forest: "Forest",
  rainforest: "Rain",
  desert: "Desert",
  grassland: "Grass",
  arctic: "Arctic",
  mountains: "Peaks",
  park: "Park",
};

export function isGroup(value: unknown): value is Group {
  return typeof value === "string" && (groups as readonly string[]).includes(value);
}

export function isHabitat(value: unknown): value is Habitat {
  return typeof value === "string" && (habitats as readonly string[]).includes(value);
}
