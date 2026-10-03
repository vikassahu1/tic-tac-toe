"use client";

import { GameState, PlayerInfo, RoundState } from "@/types/stateManagement";
import { useState, useEffect, useRef } from "react";
import { Board } from "@/components/Board";
import { resolvePlayer, runClickHandler } from "@/lib/utiliy";

export const Round = ({ gameState, playerInfo }: { gameState: GameState, playerInfo: PlayerInfo }) => {
    const { roundNumber } = gameState;
    const { dimension } = playerInfo;
    const [board, setBoard] = useState(() => Array(dimension).fill(0).map(() => Array(dimension).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const currentRound = roundNumber ?? 1;
    const aiBusy = useRef(false);

    const roundState: RoundState = {
        currentRound,
        board,
        currentPlayer,
        setCurrentPlayer,
        setBoard,
    };

    // Keep latest state for AI apply (avoid stale closure after await)
    const latestRef = useRef({ roundState, gameState, playerInfo });
    latestRef.current = { roundState, gameState, playerInfo };

    useEffect(() => {
        if (!playerInfo.playwithAI || currentPlayer !== 2 || gameState.winner != null) return;
        if (aiBusy.current) return;

        const makeAIMove = async () => {
            aiBusy.current = true;
            try {
                const { roundState: rs, gameState: gs, playerInfo: pi } = latestRef.current;
                const response = await fetch("/api/ai-move", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        roundState: { board: rs.board, currentPlayer: rs.currentPlayer, currentRound: rs.currentRound },
                        playerInfo: {
                            dimension: pi.dimension,
                            difficulty: pi.difficulty,
                            playwithAI: pi.playwithAI,
                        },
                    }),
                });
                const { position } = await response.json();
                if (position && position.row >= 0 && position.col >= 0) {
                    const latest = latestRef.current;
                    runClickHandler({
                        row: position.row,
                        col: position.col,
                        gameState: latest.gameState,
                        roundState: latest.roundState,
                        playerInfo: latest.playerInfo,
                    });
                }
            } finally {
                aiBusy.current = false;
            }
        };

        makeAIMove();
    }, [currentPlayer, playerInfo.playwithAI, gameState.winner]);

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
