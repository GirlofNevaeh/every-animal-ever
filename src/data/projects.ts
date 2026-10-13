import { addedProjects } from "@/data/project-additions";
import { getAnimal } from "@/data/animals";

export type StageId = "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7";
export type ProjectKind = "individual" | "team";

export type Stage = {
  id: StageId;
  label: string;
  short: string;
  age: string;
  focus: string;
};

export type Project = {
  id: string;
  stage: StageId;
  kind: ProjectKind;
  title: string;
  time: string;
  need: string;
  aim: string;
  steps: string[];
  done: string;
  lookUp: string[];
};

export const stages: Stage[] = [
  { id: "p1", label: "Age 5-6", short: "Age 5-6", age: "Age 5-6", focus: "Names, pictures, and sorting" },
  { id: "p2", label: "Age 6-7", short: "Age 6-7", age: "Age 6-7", focus: "Homes and places" },
  { id: "p3", label: "Age 7-8", short: "Age 7-8", age: "Age 7-8", focus: "Short, clear sentences" },
  { id: "p4", label: "Age 8-9", short: "Age 8-9", age: "Age 8-9", focus: "Maps, groups, and questions" },
  { id: "p5", label: "Age 9-10", short: "Age 9-10", age: "Age 9-10", focus: "Compare and put in order" },
  { id: "p6", label: "Age 10-11", short: "Age 10-11", age: "Age 10-11", focus: "Careful notes and a plan" },
  { id: "p7", label: "Age 11-12", short: "Age 11-12", age: "Age 11-12", focus: "Explain and lead" },
];

export const kindLabel: Record<ProjectKind, string> = {
  individual: "On your own",
  team: "With a team",
};

export const projects: Project[] = [
  {
    id: "p1-draw",
    stage: "p1",
    kind: "individual",
    title: "Draw one animal",
    time: "15 minutes",
    need: "Paper and crayons",
    aim: "Name an animal and one food.",
    steps: [
      "Open the Animals page and pick one animal.",
      "Draw it big.",
      "Write its name.",
      "Write one word for what it eats.",
    ],
    done: "The page shows a drawing, a name, and a food word.",
    lookUp: ["african-elephant", "red-fox", "european-robin"],
  },
  {
    id: "p1-size",
    stage: "p1",
    kind: "individual",
    title: "Big and small",
    time: "15 minutes",
    need: "Paper and crayons",
    aim: "See that animals can be very different sizes.",
    steps: [
      "Look at the house mouse page and the African elephant page.",
      "Draw the mouse small.",
      "Draw the elephant big.",
      "Write which one is bigger.",
    ],
    done: "Both animals are drawn, and the bigger one is named.",
    lookUp: ["house-mouse", "african-elephant"],
  },
  {
    id: "p1-four",
    stage: "p1",
    kind: "individual",
    title: "Four animal names",
    time: "20 minutes",
    need: "Paper and crayons",
    aim: "Match four pictures to four names.",
    steps: [
      "Draw a dog, a cat, a robin, and a goldfish.",
      "Write the name under each one.",
      "Point to each picture and say the name.",
    ],
    done: "Four animals have the right names.",
    lookUp: ["dog", "cat", "european-robin", "goldfish"],
  },
  {
    id: "p1-sort",
    stage: "p1",
    kind: "team",
    title: "Sort the animals",
    time: "20 minutes",
    need: "Six animal names on cards",
    aim: "Sort by fur, feathers, scales, or other.",
    steps: [
      "Write these names on cards: lion, robin, goldfish, honey bee, corn snake, garden snail.",
      "Each child picks a card.",
      "Sort the cards into fur, feathers, scales, or other.",
      "Say why each card sits in that pile.",
    ],
    done: "Every card is in a pile, and the team can say why.",
    lookUp: ["lion", "european-robin", "goldfish", "honey-bee", "corn-snake", "garden-snail"],
  },
  {
    id: "p1-say",
    stage: "p1",
    kind: "team",
    title: "Say your animal",
    time: "15 minutes",
    need: "A circle of chairs",
    aim: "Say an animal name and one food out loud.",
    steps: [
      "Sit in a circle.",
      "Each child picks a different animal from the Animals page.",
      "Say, “I am a ___. I eat ___.”",
      "The next child picks a new animal.",
    ],
    done: "Every child has said a name and a food.",
    lookUp: ["cow", "chicken", "tiger", "giant-panda"],
  },
  {
    id: "p2-place",
    stage: "p2",
    kind: "individual",
    title: "Where it lives",
    time: "20 minutes",
    need: "Paper and a pencil",
    aim: "Match an animal to its place.",
    steps: [
      "Choose one animal.",
      "Read the place on its page.",
      "Draw that place.",
      "Write the place name.",
    ],
    done: "The place name matches the animal page.",
    lookUp: ["camel", "emperor-penguin", "giant-panda"],
  },
  {
    id: "p2-farm",
    stage: "p2",
    kind: "individual",
    title: "A farm animal",
    time: "20 minutes",
    need: "Paper and crayons",
    aim: "Describe one farm animal.",
    steps: [
      "Pick a cow, a sheep, a pig, a horse, or a chicken.",
      "Draw it.",
      "Write “farm”.",
      "Write one food from its page.",
    ],
    done: "The page shows the animal, the word farm, and a food.",
    lookUp: ["cow", "sheep", "pig", "horse", "chicken"],
  },
  {
    id: "p2-water",
    stage: "p2",
    kind: "individual",
    title: "Water or land",
    time: "20 minutes",
    need: "Paper and a pencil",
    aim: "Sort two animals by where they live.",
    steps: [
      "Pick a goldfish or a dolphin.",
      "Pick a lion or a red fox.",
      "Write “water” or “land” next to each name.",
      "Draw a line under the water animal.",
    ],
    done: "Each animal has the right place word.",
    lookUp: ["goldfish", "bottlenose-dolphin", "lion", "red-fox"],
  },
  {
    id: "p2-home",
    stage: "p2",
    kind: "team",
    title: "Build a home",
    time: "30 minutes",
    need: "Paper, tape, and a box",
    aim: "Make a model of one animal home.",
    steps: [
      "Pick a robin nest, a fox burrow, or a beaver lodge.",
      "Build a small model.",
      "Put the animal’s name on it.",
      "Tell the class which animal uses that home.",
    ],
    done: "The model stands, and the team names the animal.",
    lookUp: ["european-robin", "red-fox", "beaver"],
  },
  {
    id: "p2-corners",
    stage: "p2",
    kind: "team",
    title: "Four corners",
    time: "20 minutes",
    need: "Four place signs",
    aim: "Move to the place where your animal lives.",
    steps: [
      "Label the corners Forest, Ocean, Desert, and Grassland.",
      "Each child picks one animal that lives in one of those places.",
      "Walk to that corner.",
      "Say your animal’s name.",
    ],
    done: "Every child is in a corner and has said a name.",
    lookUp: ["grey-wolf", "blue-whale", "camel", "lion"],
  },
  {
    id: "p3-three",
    stage: "p3",
    kind: "individual",
    title: "Three sentences",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Write three facts in your own words.",
    steps: [
      "Pick one animal.",
      "Write what the animal is.",
      "Write where it lives.",
      "Write one unusual fact in your own words.",
    ],
    done: "Three short sentences are on the page.",
    lookUp: ["platypus", "koala", "common-octopus"],
  },
  {
    id: "p3-night",
    stage: "p3",
    kind: "individual",
    title: "Night notes",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Write about an animal that is busy at night.",
    steps: [
      "Open the barn owl page or the little brown bat page.",
      "Write when it is busy.",
      "Write what it eats.",
      "Write one unusual fact in your own words.",
    ],
    done: "The note has a time, a food, and a fact.",
    lookUp: ["barn-owl", "little-brown-bat"],
  },
  {
    id: "p3-food",
    stage: "p3",
    kind: "individual",
    title: "A food sentence",
    time: "20 minutes",
    need: "Paper and a pencil",
    aim: "Write a clear food sentence and a size sentence.",
    steps: [
      "Pick one animal.",
      "Write “A ___ eats ___. ”",
      "Read the size line on its page.",
      "Write one sentence about its size.",
    ],
    done: "The page has a food sentence and a size sentence.",
    lookUp: ["giant-panda", "blue-whale", "honey-bee"],
  },
  {
    id: "p3-day",
    stage: "p3",
    kind: "team",
    title: "Day and night",
    time: "20 minutes",
    need: "The Time page, or the owl and robin pages",
    aim: "Tell a night story and a day story.",
    steps: [
      "One half of the team reads the barn owl page.",
      "The other half reads the European robin page.",
      "The owl group tells the night. The robin group tells the day.",
      "Switch pages and tell the other story.",
    ],
    done: "Both groups have told their part.",
    lookUp: ["barn-owl", "european-robin"],
  },
  {
    id: "p3-line",
    stage: "p3",
    kind: "team",
    title: "A food line",
    time: "25 minutes",
    need: "Three cards and a pencil",
    aim: "Put a food line in order.",
    steps: [
      "Write grass, rabbit, and red fox on three cards.",
      "Put them in order: the food, the animal that eats it, then the hunter.",
      "Draw arrows between the cards.",
      "Read the line out loud.",
    ],
    done: "The cards sit in order, and the team can read the line.",
    lookUp: ["rabbit", "red-fox"],
  },
  {
    id: "p4-map",
    stage: "p4",
    kind: "individual",
    title: "Label the map",
    time: "25 minutes",
    need: "The habitat map on the Work page",
    aim: "Name every place and add one animal.",
    steps: [
      "Print the habitat map from Work.",
      "Write the ten place names.",
      "Open Places and pick one animal for each place.",
      "Write that animal next to the place.",
    ],
    done: "Every place has a name and an animal.",
    lookUp: [],
  },
  {
    id: "p4-six",
    stage: "p4",
    kind: "individual",
    title: "Six of one group",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Collect six animals from one group.",
    steps: [
      "Pick mammals or birds.",
      "Open Animals and filter to that group.",
      "Write six names.",
      "Write the group word at the top.",
    ],
    done: "Six names belong to the group written at the top.",
    lookUp: [],
  },
  {
    id: "p4-place",
    stage: "p4",
    kind: "individual",
    title: "One place, three animals",
    time: "20 minutes",
    need: "Paper and a pencil",
    aim: "Show that many animals share a place.",
    steps: [
      "Open one place from the Places page.",
      "Write the place name.",
      "Choose three animals that live there.",
      "Write one food for each.",
    ],
    done: "The page has one place, three animals, and three foods.",
    lookUp: [],
  },
  {
    id: "p4-questions",
    stage: "p4",
    kind: "team",
    title: "Five questions",
    time: "30 minutes",
    need: "Animal pages and paper",
    aim: "Write questions another team can answer from the pages.",
    steps: [
      "Read three animal pages.",
      "Write five questions.",
      "Ask another team.",
      "Check the answers on the animal pages.",
    ],
    done: "Five questions have been asked and checked.",
    lookUp: ["cheetah", "common-octopus", "emperor-penguin"],
  },
  {
    id: "p4-clues",
    stage: "p4",
    kind: "team",
    title: "Three clues",
    time: "25 minutes",
    need: "Animal pages",
    aim: "Give clues without saying the animal’s name.",
    steps: [
      "A pair picks one animal in secret.",
      "They say the group, one food, and one place.",
      "They do not say the name.",
      "The class guesses. Then check the page together.",
    ],
    done: "The class has guessed at least three animals.",
    lookUp: ["kangaroo", "clownfish", "snowy-owl"],
  },
  {
    id: "p5-two",
    stage: "p5",
    kind: "individual",
    title: "Two animals",
    time: "30 minutes",
    need: "Paper and a pencil",
    aim: "Compare two animals that are easy to mix up.",
    steps: [
      "Pick the dolphin and the great white shark, or the bat and the robin.",
      "Write the group of each.",
      "Write one way they are different.",
      "Write one way they are alike.",
    ],
    done: "Both groups are correct, with one difference and one likeness.",
    lookUp: ["bottlenose-dolphin", "great-white-shark", "little-brown-bat", "european-robin"],
  },
  {
    id: "p5-trip",
    stage: "p5",
    kind: "individual",
    title: "The long trip",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Put the Arctic tern’s year in order.",
    steps: [
      "Read the Arctic tern page.",
      "Write four steps: nest in the far north, fly south, feed in the far south, fly north.",
      "Number them in order.",
      "Add one sentence in your own words.",
    ],
    done: "The four steps are in the right order.",
    lookUp: ["arctic-tern"],
  },
  {
    id: "p5-homes",
    stage: "p5",
    kind: "individual",
    title: "Two homes",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Compare a lodge and a nest.",
    steps: [
      "Read the beaver page and the European robin page.",
      "Write what each home is.",
      "Write what each animal eats.",
      "Write one difference between the homes.",
    ],
    done: "Both homes are named, and one difference is clear.",
    lookUp: ["beaver", "european-robin"],
  },
  {
    id: "p5-strip",
    stage: "p5",
    kind: "team",
    title: "A year on a strip",
    time: "40 minutes",
    need: "A long paper strip and the Arctic tern page",
    aim: "Show a whole year from earlier to later.",
    steps: [
      "Draw the Arctic tern’s year in order on the strip.",
      "Mark which end is earlier and which end is later.",
      "Add the monarch butterfly’s trip on the back, in order.",
      "Tell one trip out loud.",
    ],
    done: "The strip shows a whole year in order.",
    lookUp: ["arctic-tern", "monarch-butterfly"],
  },
  {
    id: "p5-whale",
    stage: "p5",
    kind: "team",
    title: "Whale or fish?",
    time: "30 minutes",
    need: "The blue whale page and the great white shark page",
    aim: "Use the pages to sort a whale and a shark.",
    steps: [
      "One half reads the blue whale page. The other half reads the shark page.",
      "Each half writes two facts.",
      "Share the facts.",
      "Write why the whale is a mammal and the shark is a fish.",
    ],
    done: "The team’s note gives the right group for each animal.",
    lookUp: ["blue-whale", "great-white-shark"],
  },
  {
    id: "p6-card",
    stage: "p6",
    kind: "individual",
    title: "Endangered card",
    time: "30 minutes",
    need: "A card and a pencil",
    aim: "Record an endangered note with the group and the place.",
    steps: [
      "Find an animal page that says the animal is endangered.",
      "Copy that line onto the card.",
      "Write the group.",
      "Write the place.",
    ],
    done: "The card has the name, the group, the place, and the line.",
    lookUp: ["african-elephant", "blue-whale", "giant-panda", "black-rhinoceros"],
  },
  {
    id: "p6-words",
    stage: "p6",
    kind: "individual",
    title: "In your own words",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Retell one fact without copying it.",
    steps: [
      "Pick one animal.",
      "Read the unusual fact.",
      "Close the page.",
      "Write the fact in your own words, then write the animal’s name.",
    ],
    done: "The fact is retold, and the animal is named.",
    lookUp: ["common-octopus", "platypus", "panther-chameleon"],
  },
  {
    id: "p6-size",
    stage: "p6",
    kind: "individual",
    title: "Size check",
    time: "25 minutes",
    need: "Paper and a pencil",
    aim: "Compare two sizes using the pages.",
    steps: [
      "Pick two animals.",
      "Copy both size lines.",
      "Write which one is larger.",
      "Write the words from the page that tell you.",
    ],
    done: "Both size lines are copied, and the larger animal is named.",
    lookUp: ["blue-whale", "house-mouse"],
  },
  {
    id: "p6-park",
    stage: "p6",
    kind: "team",
    title: "A park plan",
    time: "40 minutes",
    need: "Paper",
    aim: "Plan one help for bees, robins, and squirrels.",
    steps: [
      "Draw a city park.",
      "Add one help for honey bees, such as flowers.",
      "Add one help for European robins, such as a nest box or berry bushes.",
      "Add one help for grey squirrels, such as trees.",
    ],
    done: "The plan names one help for each animal.",
    lookUp: ["honey-bee", "european-robin", "grey-squirrel"],
  },
  {
    id: "p6-talk",
    stage: "p6",
    kind: "team",
    title: "A one-minute talk",
    time: "30 minutes",
    need: "Animal pages and a timer",
    aim: "Speak four facts and check them.",
    steps: [
      "Each person picks a different animal.",
      "Plan four lines: name, group, place, and one fact.",
      "Speak for about one minute.",
      "A partner checks the four lines on the animal page.",
    ],
    done: "Every person has spoken, and a partner has checked the page.",
    lookUp: ["orca", "komodo-dragon", "axolotl"],
  },
  {
    id: "p7-cartilage",
    stage: "p7",
    kind: "individual",
    title: "Cartilage",
    time: "25 minutes",
    need: "The great white shark page and a pencil",
    aim: "Explain cartilage in your own words.",
    steps: [
      "Read the great white shark page.",
      "Write what a shark’s skeleton is made of.",
      "Explain cartilage in your own words.",
      "Write how it is different from the hard bones in your arm.",
    ],
    done: "The note is in your own words and matches the page.",
    lookUp: ["great-white-shark"],
  },
  {
    id: "p7-coral",
    stage: "p7",
    kind: "individual",
    title: "Coral is an animal",
    time: "25 minutes",
    need: "The reef coral page and a pencil",
    aim: "Explain why coral is an animal.",
    steps: [
      "Read the reef coral page.",
      "Write what a reef is made by.",
      "Write why it is not only rock or only a plant.",
      "Add one food fact from the page.",
    ],
    done: "The note says coral is made of tiny animals and gives a food fact.",
    lookUp: ["reef-coral"],
  },
  {
    id: "p7-penguin",
    stage: "p7",
    kind: "individual",
    title: "A penguin is a bird",
    time: "25 minutes",
    need: "The emperor penguin page and a pencil",
    aim: "Show that a penguin is a bird, not a fish.",
    steps: [
      "Read the emperor penguin page.",
      "Write its group.",
      "Write the fact about the egg.",
      "Write one sentence that says why it is not a fish.",
    ],
    done: "The note names the bird group and uses the egg fact.",
    lookUp: ["emperor-penguin"],
  },
  {
    id: "p7-quiz",
    stage: "p7",
    kind: "team",
    title: "Run a class quiz",
    time: "30 minutes",
    need: "The Quiz page",
    aim: "Lead a fair quiz with a clear winner.",
    steps: [
      "Open Quiz and pick Quick 10.",
      "Make teams of up to four.",
      "Read each question and record the points.",
      "If the scores tie, play sudden death.",
    ],
    done: "There is a winner, or the tie rules have been used.",
    lookUp: [],
  },
  {
    id: "p7-museum",
    stage: "p7",
    kind: "team",
    title: "Museum labels",
    time: "40 minutes",
    need: "Eight cards and the animal pages",
    aim: "Write labels another class can trust.",
    steps: [
      "Choose eight animals.",
      "Each pair writes a label: name, group, place, and one fact.",
      "Check every line on the animal page.",
      "Put the labels up and walk the museum.",
    ],
    done: "Eight labels are up, and each fact matches a page.",
    lookUp: ["okapi", "axolotl", "common-octopus", "pangolin"],
  },
  ...addedProjects,
];

const stageIds = new Set(stages.map((stage) => stage.id));

export function isStage(value: unknown): value is StageId {
  return typeof value === "string" && stageIds.has(value as StageId);
}

export function isProjectKind(value: unknown): value is ProjectKind {
  return value === "individual" || value === "team";
}

export function getStage(id: StageId) {
  return stages.find((stage) => stage.id === id) ?? stages[0];
}

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function filterProjects(stage: string, kind: string) {
  const selectedStage = isStage(stage) ? stage : "";
  const selectedKind = isProjectKind(kind) ? kind : "";
  return projects.filter((project) => {
    if (selectedStage && project.stage !== selectedStage) return false;
    if (selectedKind && project.kind !== selectedKind) return false;
    return true;
  });
}

const ids = new Set<string>();
for (const project of projects) {
  if (ids.has(project.id)) throw new Error(`Duplicate project ${project.id}`);
  ids.add(project.id);
  for (const slug of project.lookUp) {
    if (!getAnimal(slug)) throw new Error(`Bad lookUp ${slug} on ${project.id}`);
  }
}
for (const stage of stages) {
  const list = projects.filter((project) => project.stage === stage.id);
  if (list.length !== 10) throw new Error(`Expected 10 projects for ${stage.id}, got ${list.length}`);
}
