export type Task = {
  title: string;
  time: string;
  need: string;
  steps: string[];
  done: string;
};

export type Project = {
  id: string;
  stage: string;
  age: string;
  solo: Task;
  team: Task;
};

export const projects: Project[] = [
  {
    id: "p1",
    stage: "Primary 1",
    age: "About age 5",
    solo: {
      title: "Draw one animal",
      time: "15 minutes",
      need: "Paper and crayons",
      steps: [
        "Pick one animal from the Animals page.",
        "Draw it big.",
        "Write its name.",
        "Write one word for what it eats.",
      ],
      done: "The page shows a drawing, a name, and a food word.",
    },
    team: {
      title: "Sort the animals",
      time: "20 minutes",
      need: "Six animal names on cards",
      steps: [
        "Each child picks an animal.",
        "Sort the cards into fur, feathers, scales, or other.",
        "Say why each card sits in that pile.",
      ],
      done: "Every card is in a pile, and the team can say why.",
    },
  },
  {
    id: "p2",
    stage: "Primary 2",
    age: "About age 6",
    solo: {
      title: "Where it lives",
      time: "20 minutes",
      need: "Paper and a pencil",
      steps: [
        "Choose an animal.",
        "Draw its place.",
        "Write the place name from its page.",
      ],
      done: "The place name matches the animal page.",
    },
    team: {
      title: "Build a home",
      time: "30 minutes",
      need: "Paper, tape, and a box",
      steps: [
        "Pick a nest, a burrow, or a lodge.",
        "Build a small model.",
        "Tell which animal uses that home.",
      ],
      done: "The model stands, and the team names the animal.",
    },
  },
  {
    id: "p3",
    stage: "Primary 3",
    age: "About age 7",
    solo: {
      title: "Three sentences",
      time: "25 minutes",
      need: "Paper and a pencil",
      steps: [
        "Write what the animal is.",
        "Write where it lives.",
        "Write one unusual fact in your own words.",
      ],
      done: "Three short sentences are on the page.",
    },
    team: {
      title: "Day and night",
      time: "20 minutes",
      need: "The Time page",
      steps: [
        "One half tells the owl's night.",
        "The other half tells a day animal.",
        "Switch.",
      ],
      done: "Both groups have told their part.",
    },
  },
  {
    id: "p4",
    stage: "Primary 4",
    age: "About age 8",
    solo: {
      title: "Label the map",
      time: "20 minutes",
      need: "The habitat map work page",
      steps: [
        "Print the map.",
        "Write the ten place names.",
        "Add one animal to each place.",
      ],
      done: "Every place has a name and an animal.",
    },
    team: {
      title: "Make five questions",
      time: "30 minutes",
      need: "Animal pages",
      steps: [
        "Write five questions from the pages.",
        "Ask another team.",
        "Check the answers on the animal pages.",
      ],
      done: "Five questions have been asked and checked.",
    },
  },
  {
    id: "p5",
    stage: "Primary 5",
    age: "About age 9",
    solo: {
      title: "Two animals",
      time: "30 minutes",
      need: "Paper and a pencil",
      steps: [
        "Pick dolphin and shark, or bat and robin.",
        "Write the group of each.",
        "Write one way they are different.",
      ],
      done: "Both groups are correct.",
    },
    team: {
      title: "A year on a strip",
      time: "40 minutes",
      need: "A long paper strip and the Time page",
      steps: [
        "Draw the Arctic tern's year in order.",
        "Mark earlier and later.",
        "Tell the trip out loud.",
      ],
      done: "The strip shows the whole year in order.",
    },
  },
  {
    id: "p6",
    stage: "Primary 6",
    age: "About age 10",
    solo: {
      title: "Endangered card",
      time: "30 minutes",
      need: "A card and a pencil",
      steps: [
        "Find an animal page that says endangered.",
        "Copy that calm line.",
        "Write the group and the place.",
      ],
      done: "The card has the name, the group, the place, and the line.",
    },
    team: {
      title: "A park plan",
      time: "40 minutes",
      need: "Paper",
      steps: [
        "Design a city park.",
        "Add a help for bees, robins, and squirrels.",
        "List what you add.",
      ],
      done: "The plan names one help for each animal.",
    },
  },
  {
    id: "p7",
    stage: "Primary 7",
    age: "About age 11",
    solo: {
      title: "Cartilage",
      time: "25 minutes",
      need: "The shark page and a pencil",
      steps: [
        "Read the great white shark page.",
        "Explain cartilage in your own words.",
        "Say how it is different from your bones.",
      ],
      done: "The note is in your own words and is clear.",
    },
    team: {
      title: "Run a class quiz",
      time: "30 minutes",
      need: "The Quiz page",
      steps: [
        "Pick Quick 10.",
        "Make teams of up to 4.",
        "Play. If you tie, use sudden death.",
      ],
      done: "There is a winner, or a draw after the rules.",
    },
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
