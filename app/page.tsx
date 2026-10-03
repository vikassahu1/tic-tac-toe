"use client";

import { Home } from "@/components/Home";
import { Login } from "@/components/Login";
import { PlayerInfo, Difficulty} from "@/types/stateManagement";

import { useState } from "react";

export default function Main() {
  const [loginflag, setLoginflag] = useState(true);
  const [rounds, setRounds] = useState(1);
  const [dim, setDim] = useState(3);
  const [playerName, setPlayerName] = useState<string[]>(["Player 1", "Player 2"]);
  const [playwithAI, setPlaywithAI] = useState(false);
  const numberOfPlayers = 2;
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const playerInfo: PlayerInfo = {
    playeroneName: playerName[0],
    playertwoName: playerName[1],
    playwithAI,
    rounds: rounds,
    dimension: dim,
    numberOfPlayers,
    difficulty,
    setPlaywithAI,
    setPlayerName,
    setDim,
    setCurrentRound: setRounds,
    setDifficulty,
  };


  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-stone-100 via-teal-50 to-stone-100 px-4 py-16 font-sans dark:from-zinc-950 dark:via-teal-950/40 dark:to-zinc-950">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border border-stone-200/80 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
        {loginflag ? <Login playerInfo={playerInfo} setLoginflag={setLoginflag} /> : <Home playerInfo={playerInfo} />}
      </main>
    </div>
  );
}