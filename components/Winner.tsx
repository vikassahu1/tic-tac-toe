"use client";

import { GameState, PlayerInfo } from "@/types/stateManagement";

export const Winner = ({ winner, playerInfo }: { winner: number, playerInfo: PlayerInfo }) => {
    return (
        <div className="flex flex-col items-center gap-2 py-6">
            <p className="text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Game over
            </p>
            <p className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
                Player {winner} wins
            </p>
        </div>
    );
};