import type { Photo } from "@/data/photos";

export type Person = {
  slug: string;
  name: string;
  knownFor: string;
  animals: string;
  lines: string[];
  lookUp: string[];
  photo: Photo;
};

const pd = "https://creativecommons.org/publicdomain/mark/1.0/";

export const people: Person[] = [
  {
    slug: "david-attenborough",
    name: "David Attenborough",
    knownFor: "Nature films",
    animals: "Animals all over the world",
    lines: [
      "David Attenborough makes films about wild animals.",
      "He has filmed in forests, deserts, and the sea.",
      "Many people know his voice from nature films.",
    ],
    lookUp: ["blue-whale", "emperor-penguin", "monarch-butterfly"],
    photo: {
      src: "/photos/david-attenborough.jpg",
      author: "UK Government",
      license: "Open Government Licence 3.0",
      licenseUrl: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
      source: "https://commons.wikimedia.org/wiki/File:David_Attenborough_in_2025.jpg",
    },
  },
  {
    slug: "steve-irwin",
    name: "Steve Irwin",
    knownFor: "The Crocodile Hunter",
    animals: "Crocodiles and other wild animals",
    lines: [
      "Steve Irwin was an Australian zookeeper.",
      "People called him the Crocodile Hunter.",
      "He showed crocodiles and snakes up close, and he asked people to look after wild places.",
    ],
    lookUp: ["nile-crocodile", "corn-snake"],
    photo: {
      src: "/photos/steve-irwin.jpg",
      author: "Richard Giles",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source: "https://commons.wikimedia.org/wiki/File:Steve_Irwin_December_2005_(4x5_cropped).jpg",
    },
  },
  {
    slug: "jane-goodall",
    name: "Jane Goodall",
    knownFor: "Chimpanzee watcher",
    animals: "Chimpanzees",
    lines: [
      "Jane Goodall went to Tanzania to watch wild chimpanzees.",
      "She saw them use sticks to pull termites from a nest.",
      "She gave the chimpanzees names, such as David Greybeard.",
    ],
    lookUp: ["chimpanzee"],
    photo: {
      src: "/photos/jane-goodall.jpg",
      author: "Amy Martin Photography",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Jane_Goodall_at_SXSW_London_2025_(cropped).jpg",
    },
  },
  {
    slug: "dian-fossey",
    name: "Dian Fossey",
    knownFor: "Gorilla watcher",
    animals: "Mountain gorillas",
    lines: [
      "Dian Fossey studied mountain gorillas in Rwanda.",
      "She sat quietly near them and learned their habits.",
      "She wrote about how gorilla families live.",
    ],
    lookUp: ["western-gorilla"],
    photo: {
      src: "/photos/dian-fossey.jpg",
      author: "Tribune Publishing",
      license: "Public domain",
      licenseUrl: pd,
      source: "https://commons.wikimedia.org/wiki/File:Dian_Fossey_October_1968.jpg",
    },
  },
  {
    slug: "jacques-cousteau",
    name: "Jacques Cousteau",
    knownFor: "Ocean explorer",
    animals: "Animals of the sea",
    lines: [
      "Jacques Cousteau explored the sea from his ship, Calypso.",
      "He helped make the Aqua-Lung, so a person can breathe underwater.",
      "His films showed fish, whales, and coral to people on land.",
    ],
    lookUp: ["bottlenose-dolphin", "great-white-shark", "reef-coral"],
    photo: {
      src: "/photos/jacques-cousteau.jpg",
      author: "Hans Peters / Anefo",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:Cousteau1972_(cropped).jpg",
    },
  },
  {
    slug: "gerald-durrell",
    name: "Gerald Durrell",
    knownFor: "A zoo that saves animals",
    animals: "Rare animals",
    lines: [
      "Gerald Durrell kept animals as a boy on the island of Corfu.",
      "He later opened a zoo on the island of Jersey.",
      "The zoo breeds rare animals so their kinds can go on.",
    ],
    lookUp: ["galapagos-tortoise", "ring-tailed-lemur"],
    photo: {
      src: "/photos/gerald-durrell.jpg",
      author: "Byron Patchett",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "https://commons.wikimedia.org/wiki/File:Gerald_Durrell,_Askania_Nova_(cropped).jpg",
    },
  },
  {
    slug: "sylvia-earle",
    name: "Sylvia Earle",
    knownFor: "Deep-sea scientist",
    animals: "Ocean life",
    lines: [
      "Sylvia Earle is a scientist of the sea.",
      "She has walked on the deep sea floor in a special suit.",
      "People call her Her Deepness.",
    ],
    lookUp: ["blue-whale", "whale-shark", "reef-coral"],
    photo: {
      src: "/photos/sylvia-earle.jpg",
      author: "Cmichel67",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Sylvia_Earle_in_2026_02.jpg",
    },
  },
  {
    slug: "eugenie-clark",
    name: "Eugenie Clark",
    knownFor: "The Shark Lady",
    animals: "Sharks",
    lines: [
      "Eugenie Clark was a scientist called the Shark Lady.",
      "She trained sharks to touch a target for food.",
      "She showed that sharks can learn.",
    ],
    lookUp: ["great-white-shark", "hammerhead-shark", "whale-shark"],
    photo: {
      src: "/photos/eugenie-clark.jpg",
      author: "U.S. Department of Labor",
      license: "Public domain",
      licenseUrl: pd,
      source: "https://commons.wikimedia.org/wiki/File:Eugenie_Clark.jpg",
    },
  },
  {
    slug: "jack-hanna",
    name: "Jack Hanna",
    knownFor: "Zoo animals on television",
    animals: "Zoo animals",
    lines: [
      "Jack Hanna led the Columbus Zoo in Ohio.",
      "He took zoo animals onto television shows.",
      "Children could see them up close.",
    ],
    lookUp: ["cheetah", "three-toed-sloth", "emperor-penguin"],
    photo: {
      src: "/photos/jack-hanna.jpg",
      author: "Phil Konstantin",
      license: "Public domain",
      licenseUrl: pd,
      source: "https://commons.wikimedia.org/wiki/File:JackHannaByPhilKonstantin.jpg",
    },
  },
  {
    slug: "joy-adamson",
    name: "Joy Adamson",
    knownFor: "Elsa the lion",
    animals: "Lions",
    lines: [
      "Joy Adamson raised a lion cub named Elsa in Kenya.",
      "She and her husband taught Elsa to hunt.",
      "Then they let Elsa live in the wild. Joy wrote a book called Born Free.",
    ],
    lookUp: ["lion"],
    photo: {
      src: "/photos/joy-adamson.png",
      author: "Unknown photographer",
      license: "Public domain",
      licenseUrl: pd,
      source: "https://commons.wikimedia.org/wiki/File:Joy_Adamson_in_c_1955.png",
    },
  },
];

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}
