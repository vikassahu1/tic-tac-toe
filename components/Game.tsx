"use client";

import { useState } from "react";
import { Board } from "@/components/Board";
import { GameState } from "@/types/stateManagement";


export const Game = ({ dimension = 3, numberOfPlayers = 2 }: { dimension?: number, numberOfPlayers?: number }) => {
    if (dimension % 2 === 0) {
        throw new Error("Dimension must be odd");
    }
    const [board, setBoard] = useState(() => Array(dimension).fill(0).map(() => Array(dimension).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState<number | null>(null);

    let gameState: GameState = {
        board,
        currentPlayer,
        winner,
        dimension,
        numberOfPlayers,
        setBoard,
        setCurrentPlayer,
        setWinner
    };

    if(winner){
        return (
            <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Game over
                </p>
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Winner: Player {winner} ({winner === 1 ? "X" : "O"})
                </p>
            </div>
        );
    }
    else{
        return (
            <div className="flex flex-col items-center gap-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Current turn:{" "}
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        Player {currentPlayer} ({currentPlayer === 1 ? "X" : "O"})
                    </span>
                </p>
                <Board gameState={gameState} />
            </div>
        );
    }
};
