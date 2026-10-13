import { animals } from "@/data/animals";

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

/** Second questions, still taken from the animal pages. Ids never match a slug. */
export const extraQuestions: QuizQuestion[] = [
  {
    id: "extra-dog-kind",
    prompt: "What kind of animal is a dog?",
    choices: ["A mammal", "A bird", "A fish", "A reptile"],
    answer: 0,
  },
  {
    id: "extra-dolphin-kind",
    prompt: "What kind of animal is a bottlenose dolphin?",
    choices: ["A mammal", "A fish", "A bird", "A reptile"],
    answer: 0,
  },
  {
    id: "extra-whale-not-fish",
    prompt: "Which of these is not true of a blue whale?",
    choices: ["A fish", "A mammal", "An animal that breathes air", "The biggest animal on Earth"],
    answer: 0,
  },
  {
    id: "extra-penguin-kind",
    prompt: "What kind of animal is an emperor penguin?",
    choices: ["A bird", "A fish", "A mammal", "An insect"],
    answer: 0,
  },
  {
    id: "extra-shark-not-mammal",
    prompt: "Which of these is not true of a great white shark?",
    choices: ["A mammal", "A fish", "An animal", "An ocean animal"],
    answer: 0,
  },
  {
    id: "extra-chicken-kind",
    prompt: "What kind of animal is a chicken?",
    choices: ["A bird", "A mammal", "A fish", "A reptile"],
    answer: 0,
  },
  {
    id: "extra-bat-kind",
    prompt: "What kind of animal is a little brown bat?",
    choices: ["A mammal", "A bird", "An insect", "A fish"],
    answer: 0,
  },
  {
    id: "extra-narwhal-kind",
    prompt: "What kind of animal is a narwhal?",
    choices: ["A mammal", "A fish", "A bird", "A reptile"],
    answer: 0,
  },
  {
    id: "extra-spider-not-insect",
    prompt: "Which of these is not true of a garden spider?",
    choices: ["An insect", "An animal", "An animal with eight legs", "An animal that spins a web"],
    answer: 0,
  },
  {
    id: "extra-coral-not-plant",
    prompt: "Which of these is not true of reef coral?",
    choices: ["Only a plant", "An animal", "Made of tiny animals", "A living thing"],
    answer: 0,
  },
  {
    id: "extra-platypus-eggs",
    prompt: "What is true about a platypus?",
    choices: ["It lays eggs", "It is a bird", "It is a fish", "It has feathers"],
    answer: 0,
  },
  {
    id: "extra-ostrich-run",
    prompt: "What is true about an ostrich?",
    choices: ["It cannot fly, but it runs very fast", "It is a mammal", "It lives on sea ice", "It is the smallest bird"],
    answer: 0,
  },
  {
    id: "extra-cat-food",
    prompt: "What does a cat eat?",
    choices: ["Meat", "Only bamboo", "Only nectar", "Only grass"],
    answer: 0,
  },
  {
    id: "extra-horse-food",
    prompt: "What does a horse eat?",
    choices: ["Grass and hay", "Only fish", "Only meat", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-lion-food",
    prompt: "What does a lion eat?",
    choices: ["Meat", "Only bamboo", "Only nectar", "Only grass"],
    answer: 0,
  },
  {
    id: "extra-elephant-food",
    prompt: "What does an African elephant eat?",
    choices: ["Plants", "Only fish", "Only honey", "Only meat"],
    answer: 0,
  },
  {
    id: "extra-zebra-food",
    prompt: "What does a zebra eat?",
    choices: ["Grass", "Only fish", "Only nectar", "Only meat"],
    answer: 0,
  },
  {
    id: "extra-koala-food",
    prompt: "What does a koala eat?",
    choices: ["Eucalyptus leaves", "Only fish", "Bamboo only", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-wolf-food",
    prompt: "What does a grey wolf eat?",
    choices: ["Meat", "Only nectar", "Only bamboo", "Only grass"],
    answer: 0,
  },
  {
    id: "extra-bear-food",
    prompt: "What does a polar bear eat?",
    choices: ["Seals", "Only bamboo", "Only nectar", "Only grass"],
    answer: 0,
  },
  {
    id: "extra-hippo-food",
    prompt: "What does a hippo eat?",
    choices: ["Grass", "Only fish", "Only nectar", "Only meat"],
    answer: 0,
  },
  {
    id: "extra-bee-food",
    prompt: "What does a honey bee eat?",
    choices: ["Nectar and pollen", "Only meat", "Only fish", "Only wood"],
    answer: 0,
  },
  {
    id: "extra-robin-food",
    prompt: "What does a European robin eat?",
    choices: ["Insects, worms, and berries", "Only bamboo", "Only seals", "Only nectar"],
    answer: 0,
  },
  {
    id: "extra-sheep-food",
    prompt: "What does a sheep eat?",
    choices: ["Grass", "Only fish", "Only meat", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-rabbit-food",
    prompt: "What does a rabbit eat?",
    choices: ["Grass and leaves", "Only fish", "Only meat", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-beaver-food",
    prompt: "What does a beaver eat?",
    choices: ["Bark, twigs, and water plants", "Only meat", "Only nectar", "Only seals"],
    answer: 0,
  },
  {
    id: "extra-squirrel-food",
    prompt: "What does a grey squirrel eat?",
    choices: ["Nuts, seeds, and buds", "Only fish", "Only seals", "Only nectar"],
    answer: 0,
  },
  {
    id: "extra-anteater-food",
    prompt: "What does a giant anteater eat?",
    choices: ["Ants and termites", "Only bamboo", "Only nectar", "Only grass"],
    answer: 0,
  },
  {
    id: "extra-sloth-food",
    prompt: "What does a three-toed sloth eat?",
    choices: ["Leaves", "Only fish", "Only meat", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-manatee-food",
    prompt: "What does a manatee eat?",
    choices: ["Water plants", "Only seals", "Only honey", "Only meat"],
    answer: 0,
  },
  {
    id: "extra-octopus-food",
    prompt: "What does a common octopus eat?",
    choices: ["Crabs and shellfish", "Only grass", "Only bamboo", "Only nectar"],
    answer: 0,
  },
  {
    id: "extra-turtle-food",
    prompt: "What does a green sea turtle eat?",
    choices: ["Sea grass and algae", "Only seals", "Only honey", "Only meat"],
    answer: 0,
  },
  {
    id: "extra-whale-food",
    prompt: "What does a blue whale eat?",
    choices: ["Tiny animals called krill", "Only grass", "Only bamboo", "Only honey"],
    answer: 0,
  },
  {
    id: "extra-panda-food",
    prompt: "What does a giant panda eat?",
    choices: ["Bamboo", "Only fish", "Only meat", "Nectar"],
    answer: 0,
  },
  {
    id: "extra-giraffe-food",
    prompt: "What does a giraffe eat?",
    choices: ["Leaves high in trees", "Only fish", "Only meat", "Only nectar"],
    answer: 0,
  },
  {
    id: "extra-cow-place",
    prompt: "Where do cows live?",
    choices: ["On farms and in grassy fields", "Only on sea ice", "Only on coral reefs", "Only in the deep sea"],
    answer: 0,
  },
  {
    id: "extra-tiger-place",
    prompt: "Where do wild tigers live?",
    choices: ["In forests in Asia", "Only in Antarctica", "Only on coral reefs", "Only in the Arctic ocean"],
    answer: 0,
  },
  {
    id: "extra-giraffe-place",
    prompt: "Where do giraffes live?",
    choices: ["On African grasslands", "In the Arctic ocean", "On Antarctic ice", "On coral reefs"],
    answer: 0,
  },
  {
    id: "extra-panda-place",
    prompt: "Where do giant pandas live?",
    choices: ["In bamboo forests in China", "On Antarctic ice", "In the open ocean", "On a coral reef"],
    answer: 0,
  },
  {
    id: "extra-kangaroo-place",
    prompt: "Where do red kangaroos live?",
    choices: ["In dry grasslands in Australia", "On Antarctic ice", "In the Arctic ocean", "On coral reefs"],
    answer: 0,
  },
  {
    id: "extra-fox-place",
    prompt: "Where can red foxes live?",
    choices: ["In woods, fields, and some towns", "Only on Antarctic ice", "Only in the deep ocean", "Only inside a hive"],
    answer: 0,
  },
  {
    id: "extra-penguin-place",
    prompt: "Where do emperor penguins live?",
    choices: ["On the ice of Antarctica", "In a hot desert", "In bamboo forests", "On African grasslands"],
    answer: 0,
  },
  {
    id: "extra-camel-place",
    prompt: "Where do dromedary camels live?",
    choices: ["In deserts", "On Antarctic ice", "On coral reefs", "In the deep ocean"],
    answer: 0,
  },
  {
    id: "extra-pig-place",
    prompt: "Where do pigs live?",
    choices: ["On farms and in some woods", "Only on sea ice", "Only on coral reefs", "Only in the open ocean"],
    answer: 0,
  },
  {
    id: "extra-mouse-place",
    prompt: "Where do house mice live?",
    choices: ["Near people in many countries", "Only on Antarctic ice", "Only in the deep ocean", "Only on coral reefs"],
    answer: 0,
  },
  {
    id: "extra-meerkat-place",
    prompt: "Where do meerkats live?",
    choices: ["In dry lands in southern Africa", "On Antarctic ice", "In the deep ocean", "On coral reefs"],
    answer: 0,
  },
  {
    id: "extra-crocodile-place",
    prompt: "Where do Nile crocodiles live?",
    choices: ["In African rivers and lakes", "On Antarctic ice", "In the Arctic ocean", "In a beehive"],
    answer: 0,
  },
  {
    id: "extra-frog-place",
    prompt: "Where do poison dart frogs live?",
    choices: ["In rainforests", "On sea ice", "In the open ocean", "In a desert hive"],
    answer: 0,
  },
  {
    id: "extra-clownfish-place",
    prompt: "Where do clownfish live?",
    choices: ["In sea anemones on coral reefs", "On sea ice", "In a desert", "In a hive"],
    answer: 0,
  },
  {
    id: "extra-komodo-place",
    prompt: "Where do Komodo dragons live?",
    choices: ["On a few islands in Indonesia", "In the Arctic ocean", "On Antarctic ice", "In European gardens only"],
    answer: 0,
  },
];

const animalQuestions: QuizQuestion[] = animals.map((animal) => ({
  id: animal.slug,
  prompt: animal.quiz.q,
  choices: animal.quiz.choices,
  answer: animal.quiz.a,
}));

export const quizBank: QuizQuestion[] = [...animalQuestions, ...extraQuestions];

const ids = new Set<string>();
for (const item of quizBank) {
  if (ids.has(item.id)) throw new Error(`Duplicate quiz id ${item.id}`);
  ids.add(item.id);
  if (new Set(item.choices).size !== 4) throw new Error(`Quiz choices must differ on ${item.id}`);
  if (item.answer < 0 || item.answer > 3) throw new Error(`Bad quiz answer on ${item.id}`);
  if (!item.prompt.trim() || item.choices.some((choice) => !choice.trim())) {
    throw new Error(`Empty quiz text on ${item.id}`);
  }
}
if (animalQuestions.length !== 200) throw new Error(`Expected 200 animal questions, got ${animalQuestions.length}`);
if (extraQuestions.length !== 50) throw new Error(`Expected 50 extra questions, got ${extraQuestions.length}`);
if (quizBank.length !== 250) throw new Error(`Expected 250 quiz questions, got ${quizBank.length}`);
