import { Link, createFileRoute } from "@tanstack/react-router";
import { habitatLabel, habitatShort, habitats, type Habitat } from "@/data/labels";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/places/")({
  component: PlacesPage,
});

const spots: { id: Habitat; className: string; scene: string }[] = [
  { id: "arctic", className: "left-[6%] top-[4%] w-[34%]", scene: "bg-sand" },
  { id: "mountains", className: "right-[6%] top-[8%] w-[32%]", scene: "bg-leaf text-sand" },
  { id: "forest", className: "left-[8%] top-[24%] w-[28%]", scene: "bg-leaf text-sand" },
  { id: "rainforest", className: "left-[38%] top-[22%] w-[28%]", scene: "bg-leaf text-sand" },
  { id: "grassland", className: "right-[8%] top-[30%] w-[28%]", scene: "bg-sand" },
  { id: "desert", className: "left-[10%] top-[44%] w-[30%]", scene: "bg-sand" },
  { id: "park", className: "right-[8%] top-[48%] w-[26%]", scene: "bg-sky" },
  { id: "river", className: "left-[28%] top-[58%] w-[28%]", scene: "bg-sky" },
  { id: "coral", className: "left-[8%] top-[74%] w-[28%]", scene: "bg-berry text-sand" },
  { id: "ocean", className: "right-[8%] top-[72%] w-[40%]", scene: "bg-sky" },
];

function PlacesPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl">{t("Places")}</h1>
      <p className="mt-1 max-w-xl text-lg">{t("Tap a place. See animals that live there.")}</p>

      <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-card border-2 border-ink bg-sky sm:aspect-video">
        <div className="absolute inset-x-0 top-0 h-[18%] bg-sand/80" />
        <div className="absolute top-[16%] right-[8%] h-[22%] w-[34%] rounded-t-full bg-leaf/80" />
        <div className="absolute top-[38%] left-[8%] h-[16%] w-[46%] rounded-card bg-sand/90" />
        <div className="absolute top-[52%] right-0 h-[3%] w-[70%] rotate-[-8deg] bg-sky" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-sky" />
        <div className="absolute bottom-[8%] left-[6%] h-[14%] w-[30%] rounded-card bg-berry/80" />
        {spots.map((spot) => (
          <Link
            key={spot.id}
            to="/places/$habitat"
            params={{ habitat: spot.id }}
            className={`absolute flex h-12 items-center justify-center rounded-card border-2 border-ink px-1 text-center text-sm leading-tight font-extrabold ${spot.className} ${spot.scene}`}
          >
            {t(habitatShort[spot.id])}
          </Link>
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {habitats.map((habitat) => (
          <li key={habitat}>
            <Link
              to="/places/$habitat"
              params={{ habitat }}
              className="flex h-11 items-center justify-center rounded-card border-2 border-ink bg-sand px-2 text-center text-sm font-extrabold"
            >
              {t(habitatLabel[habitat])}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
