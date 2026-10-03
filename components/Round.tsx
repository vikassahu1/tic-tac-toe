"use client";

import { GameState, PlayerInfo, RoundState } from "@/types/stateManagement";
import { useState, useEffect, useRef } from "react";
import { Board } from "@/components/Board";
import { resolvePlayer, runClickHandler } from "@/lib/utiliy";

export const Round = ({
    gameState,
    playerInfo,
    onRestart,
    onBack,
}: {
    gameState: GameState;
    playerInfo: PlayerInfo;
    onRestart: () => void;
    onBack: () => void;
}) => {
    const { roundNumber } = gameState;
    const { dimension, rounds } = playerInfo;
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

    const latestRef = useRef({ roundState, gameState, playerInfo });
    latestRef.current = { roundState, gameState, playerInfo };

    useEffect(() => {
        if (!playerInfo.playwithAI || currentPlayer !== 2 || gameState.winner != null) return;
        if (aiBusy.current) return;

        const makeAIMove = async () => {
            aiBusy.current = true;
            try {
                const { roundState: rs, playerInfo: pi } = latestRef.current;
                const response = await fetch("/api/ai-move", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        roundState: {
                            board: rs.board,
                            currentPlayer: rs.currentPlayer,
                            currentRound: rs.currentRound,
                        },
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

    const aiThinking = playerInfo.playwithAI && currentPlayer === 2;

    return (
        <div className="flex w-full flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-1.5">
                <p className="text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                    Round {currentRound}
                    {rounds > 1 ? ` / ${rounds}` : ""}
                </p>

                <p className="text-sm text-stone-600 dark:text-zinc-400">
                    {aiThinking ? (
                        <span className="font-medium text-rose-600 dark:text-rose-400">
                            Computer is thinking…
                        </span>
                    ) : (
                        <>
                            Current turn:{" "}
                            <span
                                className={`font-semibold ${
                                    currentPlayer === 1
                                        ? "text-sky-600 dark:text-sky-400"
                                        : "text-rose-600 dark:text-rose-400"
                                }`}
                            >
                                {resolvePlayer(currentPlayer, playerInfo)} (
                                {currentPlayer === 1 ? "X" : "O"})
                            </span>
                        </>
                    )}
                </p>
            </div>

            <Board roundState={roundState} playerInfo={playerInfo} gameState={gameState} />

            <div className="flex w-full max-w-xs gap-2 pt-1">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onRestart}
                    className="flex-1 rounded-xl bg-teal-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-600 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
                >
                    Restart
                </button>
            </div>
        </div>
    );
};
