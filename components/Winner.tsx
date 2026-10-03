"use client";

import { PlayerInfo } from "@/types/stateManagement";
import { resolvePlayer } from "@/lib/utiliy";

export const Winner = ({
    winner,
    playerInfo,
    onRestart,
    onBack,
}: {
    winner: number;
    playerInfo: PlayerInfo;
    onRestart: () => void;
    onBack: () => void;
}) => {
    const isDraw = winner === -1;

    return (
        <div className="flex w-full flex-col items-center gap-6 py-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                    Game over
                </p>
                <p className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
                    {isDraw ? "It's a draw" : `${resolvePlayer(winner, playerInfo)} wins`}
                </p>
                <p className="text-sm text-stone-500 dark:text-zinc-400">
                    {isDraw ? "Evenly matched." : "Nice game."}
                </p>
            </div>

            <div className="flex w-full max-w-xs gap-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onRestart}
                    className="flex-1 rounded-xl bg-teal-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-teal-600 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
                >
                    Play again
                </button>
            </div>
        </div>
    );
};
