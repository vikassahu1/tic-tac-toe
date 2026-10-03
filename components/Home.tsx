"use client";

import { Game } from "@/components/Game";
import { PlayerInfo } from "@/types/stateManagement";

export const Home = ({
    playerInfo,
    onBack,
}: {
    playerInfo: PlayerInfo;
    onBack: () => void;
}) => {
    const { playeroneName, playertwoName, playwithAI, difficulty, dimension, rounds } = playerInfo;

    return (
        <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
                    Tic-Tac-Toe
                </h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400">
                    {playeroneName}{" "}
                    <span className="text-sky-600 dark:text-sky-400">X</span>
                    {" vs "}
                    {playertwoName}{" "}
                    <span className="text-rose-600 dark:text-rose-400">O</span>
                </p>
                <p className="text-xs text-stone-400 dark:text-zinc-500">
                    {dimension}×{dimension}
                    {rounds > 1 ? ` · ${rounds} rounds` : ""}
                    {playwithAI && difficulty ? ` · ${difficulty}` : ""}
                </p>
            </div>

            <Game playerInfo={playerInfo} onBack={onBack} />
        </div>
    );
};
