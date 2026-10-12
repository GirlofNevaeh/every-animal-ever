import type { Group, Habitat } from "@/data/labels";

export type Rhythm = "day" | "night" | "both";
export type Home =
  | "nest"
  | "burrow"
  | "den"
  | "hive"
  | "web"
  | "shell"
  | "lodge"
  | "none";

export type Animal = {
  slug: string;
  name: string;
  group: Group;
  habitats: Habitat[];
  where: string;
  eats: string;
  size: string;
  fact: string;
  aka: string[];
  favourite: boolean;
  rhythm: Rhythm;
  migrates: boolean;
  camouflage: boolean;
  herd: boolean;
  home: Home;
  endangered?: string;
  quiz: {
    q: string;
    choices: [string, string, string, string];
    a: 0 | 1 | 2 | 3;
  };
};

export type AnimalRow = [
  string,
  string,
  Group,
  Habitat[],
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  0 | 1 | 2 | 3,
  string,
];

const homes: Record<string, Home> = {
  n: "nest",
  b: "burrow",
  d: "den",
  h: "hive",
  w: "web",
  s: "shell",
  l: "lodge",
  x: "none",
};

const rhythms: Record<string, Rhythm> = {
  D: "day",
  N: "night",
  B: "both",
};

export function rowToAnimal(row: AnimalRow): Animal {
  const [
    slug,
    name,
    group,
    habitats,
    where,
    eats,
    size,
    fact,
    aka,
    flags,
    q,
    c0,
    c1,
    c2,
    c3,
    a,
    endangered,
  ] = row;
  const parts = flags.split(",").filter(Boolean);
  let rhythm: Rhythm = "day";
  let home: Home = "none";
  let favourite = false;
  let migrates = false;
  let camouflage = false;
  let herd = false;
  for (const part of parts) {
    if (part === "F") favourite = true;
    else if (part === "M") migrates = true;
    else if (part === "C") camouflage = true;
    else if (part === "H") herd = true;
    else if (part in rhythms) rhythm = rhythms[part];
    else if (part in homes) home = homes[part];
    else throw new Error(`Bad flag ${part} on ${slug}`);
  }
  return {
    slug,
    name,
    group,
    habitats,
    where,
    eats,
    size,
    fact,
    aka: aka ? aka.split(",").map((item) => item.trim()) : [],
    favourite,
    rhythm,
    migrates,
    camouflage,
    herd,
    home,
    endangered: endangered || undefined,
    quiz: { q, choices: [c0, c1, c2, c3], a },
  };
}
