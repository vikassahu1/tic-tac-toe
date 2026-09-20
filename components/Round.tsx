"use client";

import { GameState, PlayerInfo, RoundState } from "@/types/stateManagement";
import { useState } from "react";
import { Board } from "@/components/Board";
import { resolvePlayer } from "@/lib/utiliy";

export const Round = ({ gameState, playerInfo }: { gameState: GameState, playerInfo: PlayerInfo }) => {

    const { roundNumber } = gameState;
    const { dimension } = playerInfo;
    const [board, setBoard] = useState(() => Array(dimension).fill(0).map(() => Array(dimension).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const currentRound = roundNumber ?? 1;

    let roundState: RoundState = {
        currentRound,
        board,
        currentPlayer,
        setCurrentPlayer,
        setBoard,
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <p className="text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Round {currentRound}
            </p>

            <p className="text-sm text-stone-600 dark:text-zinc-400">
                Current turn:{" "}
                <span className={`font-semibold ${currentPlayer === 1 ? "text-sky-600 dark:text-sky-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {resolvePlayer(currentPlayer, playerInfo)} ({currentPlayer === 1 ? "X" : "O"})
                </span>
            </p>
            <Board roundState={roundState} playerInfo={playerInfo} gameState={gameState} />
        </div>
    );
};
