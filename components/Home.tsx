"use client";

import { Game } from "@/components/Game";
import { PlayerInfo } from "@/types/stateManagement";


// Pass player info in component props
export const Home = ({ playerInfo }: { playerInfo: PlayerInfo }) => {
    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Tic-Tac-Toe
            </h1>
            <Game playerInfo={playerInfo}/>
        </>
    );
};