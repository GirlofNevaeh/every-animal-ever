import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { quizBank, type QuizQuestion } from "@/data/quiz-bank";
import { useI18n } from "@/i18n/context";
import { playCheer, playFart, warmAudio } from "@/lib/quiz-sounds";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

type Mode = "10" | "25";
type Phase = "setup" | "play" | "feedback" | "sudden" | "sudden-feedback" | "done";

type Team = { id: number; name: string; score: number };

type Card = {
  slug: string;
  prompt: string;
  choices: string[];
  correct: string;
};

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function makeCard(item: QuizQuestion): Card {
  return {
    slug: item.id,
    prompt: item.prompt,
    correct: item.choices[item.answer],
    choices: shuffle([...item.choices]),
  };
}

function QuizPage() {
  const { t, fill } = useI18n();
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("10");
  const [teamCount, setTeamCount] = useState(2);
  const [solo, setSolo] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [soloPick, setSoloPick] = useState<string | null>(null);
  const [contenders, setContenders] = useState<number[]>([]);
  const [cleanTies, setCleanTies] = useState(0);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [draw, setDraw] = useState(false);
  const [suddenCard, setSuddenCard] = useState<Card | null>(null);
  const [used, setUsed] = useState<string[]>([]);

  const card = phase === "sudden" || phase === "sudden-feedback" ? suddenCard : deck[index];

  useEffect(() => {
    if (phase !== "feedback" && phase !== "sudden-feedback") return;
    const timer = window.setTimeout(() => {
      if (phase === "feedback") advance();
      else finishSudden();
    }, 1000);
    return () => window.clearTimeout(timer);
    // advance closes over latest state via functional updates below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index, suddenCard]);

  function start() {
    warmAudio();
    const cards = shuffle(quizBank).slice(0, mode === "10" ? 10 : 25).map(makeCard);
    const nextTeams = solo
      ? [{ id: 1, name: "You", score: 0 }]
      : Array.from({ length: teamCount }, (_, id) => ({
          id: id + 1,
          name: `Team ${id + 1}`,
          score: 0,
        }));
    setTeams(nextTeams);
    setDeck(cards);
    setIndex(0);
    setPicks({});
    setSoloPick(null);
    setWinnerId(null);
    setDraw(false);
    setCleanTies(0);
    setUsed(cards.map((item) => item.slug));
    setPhase("play");
  }

  function scorePicks(source: Card, current: Team[]) {
    if (solo) {
      const ok = soloPick === source.correct;
      return current.map((team) => ({ ...team, score: team.score + (ok ? 1 : 0) }));
    }
    return current.map((team) => ({
      ...team,
      score: team.score + (picks[team.id] === source.correct ? 1 : 0),
    }));
  }

  function advance() {
    const scored = scorePicks(deck[index], teams);
    setTeams(scored);
    setPicks({});
    setSoloPick(null);
    if (index + 1 < deck.length) {
      setIndex(index + 1);
      setPhase("play");
      return;
    }
    if (solo) {
      setPhase("done");
      return;
    }
    const top = Math.max(...scored.map((team) => team.score));
    const leaders = scored.filter((team) => team.score === top).map((team) => team.id);
    if (leaders.length === 1) {
      setWinnerId(leaders[0]);
      setPhase("done");
      return;
    }
    setContenders(leaders);
    setCleanTies(0);
    setSuddenCard(nextSudden(used));
    setPhase("sudden");
  }

  function nextSudden(already: string[]) {
    const pool = quizBank.filter((item) => !already.includes(item.id));
    const source = pool.length > 0 ? pool : quizBank;
    const item = source[Math.floor(Math.random() * source.length)];
    setUsed((list) => [...list, item.id]);
    return makeCard(item);
  }

  function finishSudden() {
    if (!suddenCard) return;
    const playing = teams.filter((team) => contenders.includes(team.id));
    const right = playing.filter((team) => picks[team.id] === suddenCard.correct);
    setPicks({});
    if (right.length === 1) {
      setWinnerId(right[0].id);
      setPhase("done");
      return;
    }
    const stillTied = right.length === 0 || right.length === playing.length;
    if (stillTied) {
      const nextClean = cleanTies + 1;
      setCleanTies(nextClean);
      if (nextClean >= 3) {
        setDraw(true);
        setPhase("done");
        return;
      }
    } else {
      setContenders(right.map((team) => team.id));
      setCleanTies(0);
    }
    setSuddenCard(nextSudden(used));
    setPhase("sudden");
  }

  function chooseSolo(choice: string) {
    if (phase !== "play" || soloPick || !card) return;
    warmAudio();
    setSoloPick(choice);
    setPhase("feedback");
    if (choice === card.correct) playCheer();
    else playFart();
  }

  function chooseTeam(teamId: number, choice: string) {
    if ((phase !== "play" && phase !== "sudden") || !card) return;
    if (picks[teamId]) return;
    warmAudio();
    const next = { ...picks, [teamId]: choice };
    setPicks(next);
    if (choice === card.correct) playCheer();
    else playFart();
    const needed = phase === "sudden" ? contenders : teams.map((team) => team.id);
    if (needed.every((id) => next[id])) {
      setPhase(phase === "sudden" ? "sudden-feedback" : "feedback");
    }
  }

  const showing = phase === "feedback" || phase === "sudden-feedback";

  return (
    <main className="mx-auto max-w-3xl px-3 py-4" onPointerDown={warmAudio}>
      <h1 className="font-display text-4xl">{t("Quiz")}</h1>
      {phase === "setup" ? (
        <Setup
          mode={mode}
          setMode={setMode}
          solo={solo}
          setSolo={setSolo}
          teamCount={teamCount}
          setTeamCount={setTeamCount}
          onStart={start}
        />
      ) : null}

      {phase !== "setup" && phase !== "done" && card ? (
        <section className="mt-4 rounded-card border-2 border-ink bg-sky p-4">
          <p className="text-sm font-extrabold">
            {phase === "sudden" || phase === "sudden-feedback"
              ? fill("Sudden death · tied round {{n}}", { n: cleanTies + 1 })
              : fill("Question {{n}} of {{total}}", { n: index + 1, total: deck.length })}
          </p>
          <h2 className="mt-2 font-display text-3xl">{t(card.prompt)}</h2>
          {solo ? (
            <div className="mt-4 grid gap-2">
              {card.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  disabled={showing || soloPick !== null}
                  onClick={() => chooseSolo(choice)}
                  className={`min-h-12 rounded-card border-2 px-3 text-left font-bold text-ink ${
                    showing && choice === card.correct
                      ? "border-leaf bg-sand"
                      : showing && choice === soloPick
                        ? "border-berry bg-sand"
                        : "border-ink bg-sand"
                  }`}
                >
                  {t(choice)}
                </button>
              ))}
            </div>
          ) : (
            <>
              <ul className="mt-3 space-y-1">
                {card.choices.map((choice, choiceIndex) => (
                  <li key={choice}>
                    <span className="font-extrabold">{String.fromCharCode(65 + choiceIndex)}. </span>
                    {t(choice)}
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2">
                {teams
                  .filter((team) => phase === "play" || phase === "feedback" || contenders.includes(team.id))
                  .map((team) => (
                    <div key={team.id} className="rounded-card bg-sand p-2">
                      <p className="text-sm font-extrabold">{t(team.name)}</p>
                      <div className="mt-1 grid grid-cols-2 gap-1">
                        {card.choices.map((choice, choiceIndex) => {
                          const picked = picks[team.id] === choice;
                          const mark =
                            showing && choice === card.correct
                              ? "border-leaf"
                              : showing && picked
                                ? "border-berry"
                                : picked
                                  ? "border-leaf"
                                  : "border-ink/30";
                          return (
                            <button
                              key={choice}
                              type="button"
                              disabled={showing || Boolean(picks[team.id])}
                              onClick={() => chooseTeam(team.id, choice)}
                              className={`min-h-11 rounded-card border-2 bg-sand px-2 text-sm font-extrabold text-ink ${mark}`}
                            >
                              {String.fromCharCode(65 + choiceIndex)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
          {showing ? (
            <p className="mt-3 font-extrabold">
              {solo
                ? soloPick === card.correct
                  ? t("Yes.")
                  : fill("Not this time. {{answer}}", { answer: t(card.correct) })
                : fill("Answer: {{answer}}", { answer: t(card.correct) })}
            </p>
          ) : null}
        </section>
      ) : null}

      {phase !== "setup" && phase !== "done" ? (
        <Scoreboard teams={teams} />
      ) : null}

      {phase === "done" ? (
        <Done
          solo={solo}
          teams={teams}
          total={deck.length}
          winnerId={winnerId}
          draw={draw}
          onAgain={() => setPhase("setup")}
        />
      ) : null}
    </main>
  );
}

function Setup({
  mode,
  setMode,
  solo,
  setSolo,
  teamCount,
  setTeamCount,
  onStart,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  solo: boolean;
  setSolo: (solo: boolean) => void;
  teamCount: number;
  setTeamCount: (count: number) => void;
  onStart: () => void;
}) {
  const { t, fill } = useI18n();
  return (
    <section className="mt-4 rounded-card border-2 border-ink bg-sand p-4">
      <h2 className="font-display text-2xl">{t("Class quiz")}</h2>
      <p className="mt-1">{t("There are 250 questions. Each game uses 10 or 25 of them.")}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Pick on={mode === "10"} label="Quick 10" onClick={() => setMode("10")} />
        <Pick on={mode === "25"} label="Mega 25" onClick={() => setMode("25")} />
        <Pick on={solo} label="Solo" onClick={() => setSolo(true)} />
        <Pick on={!solo} label="Teams" onClick={() => setSolo(false)} />
      </div>
      {solo ? null : (
        <label className="mt-4 block text-sm font-extrabold">
          {fill("Teams: {{count}}", { count: teamCount })}
          <span className="mt-1 block font-bold">{t("Up to 4 players share a team. Up to 10 teams.")}</span>
          <input
            type="range"
            min={2}
            max={10}
            value={teamCount}
            onChange={(event) => setTeamCount(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
      )}
      <button
        type="button"
        onClick={onStart}
        className="mt-4 h-12 w-full rounded-card border-2 border-ink bg-leaf font-extrabold text-sand"
      >
        {t("Start")}
      </button>
    </section>
  );
}

function Pick({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-card border-2 font-extrabold text-ink ${on ? "border-leaf bg-sand" : "border-ink/20 bg-sand"}`}
    >
      {t(label)}
    </button>
  );
}

function Scoreboard({ teams }: { teams: Team[] }) {
  const { t } = useI18n();
  return (
    <ul className="mt-4 grid grid-cols-2 gap-2">
      {teams.map((team) => (
        <li key={team.id} className="rounded-card border-2 border-ink bg-sand px-3 py-2">
          <span className="block text-sm font-extrabold">{t(team.name)}</span>
          <span className="font-display text-3xl tabular-nums">{team.score}</span>
        </li>
      ))}
    </ul>
  );
}

function Done({
  solo,
  teams,
  total,
  winnerId,
  draw,
  onAgain,
}: {
  solo: boolean;
  teams: Team[];
  total: number;
  winnerId: number | null;
  draw: boolean;
  onAgain: () => void;
}) {
  const { t, fill } = useI18n();
  const winner = teams.find((team) => team.id === winnerId);
  const sorted = useMemo(() => [...teams].sort((a, b) => b.score - a.score), [teams]);
  return (
    <section className="mt-4 rounded-card border-2 border-ink bg-leaf p-4 text-sand">
      {solo ? (
        <>
          <h2 className="font-display text-3xl">
            {fill("You got {{score}} out of {{total}}.", { score: teams[0]?.score ?? 0, total })}
          </h2>
          <p className="mt-2">{t("That round is done.")}</p>
        </>
      ) : draw ? (
        <>
          <h2 className="font-display text-3xl">{t("It is a draw.")}</h2>
          <p className="mt-2">{t("Three sudden-death rounds stayed tied.")}</p>
        </>
      ) : winner ? (
        <>
          <p className="text-sm font-extrabold tracking-wide">{t("CONGRATULATIONS")}</p>
          <h2 className="font-display text-4xl">{fill("{{name}} wins.", { name: t(winner.name) })}</h2>
        </>
      ) : (
        <h2 className="font-display text-3xl">{t("Round over.")}</h2>
      )}
      <ul className="mt-3 space-y-1">
        {sorted.map((team) => (
          <li key={team.id}>
            {t(team.name)}: {team.score}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onAgain}
        className="mt-4 h-12 w-full rounded-card border-2 border-ink bg-sand font-extrabold text-ink"
      >
        {t("Play again")}
      </button>
    </section>
  );
}
