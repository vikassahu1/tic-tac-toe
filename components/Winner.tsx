"use client";

import { GameState, PlayerInfo } from "@/types/stateManagement";

export const Winner = ({ winner, playerInfo }: { winner: number, playerInfo: PlayerInfo }) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Winner: Player {winner}
            </p>
        </div>
    );
};