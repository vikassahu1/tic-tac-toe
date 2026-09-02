"use client";

import { Home } from "@/components/Home";
import { Login } from "@/components/Login";
import { PlayerInfo} from "@/types/stateManagement";

import { useState } from "react";

export default function Main() {
  const [loginflag, setLoginflag] = useState(true);
  const [rounds, setRounds] = useState(1);
  const [dim, setDim] = useState(3);
  const [playerName, setPlayerName] = useState<string[]>(["Player 1", "Player 2"]);
  const numberOfPlayers = 2;

  const playerInfo: PlayerInfo = {
    playeroneName: playerName[0],
    playertwoName: playerName[1],
    rounds: rounds,
    dimension: dim,
    numberOfPlayers,
    setPlayerName,
    setDim,
    setCurrentRound: setRounds,
  };


  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-100 px-4 py-16 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        {loginflag ? <Login playerInfo={playerInfo} setLoginflag={setLoginflag} /> : <Home playerInfo={playerInfo} />}
      </main>
    </div>
  );
}