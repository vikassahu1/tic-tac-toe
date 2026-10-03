"use client";
import { RoundState, GameState, PlayerInfo } from "@/types/stateManagement";
import { runClickHandler } from "@/lib/utiliy";

export const Square = ({
    row,
    column,
    value,
    roundState,
    gameState,
    playerInfo,
    sizeClass,
}: {
    row: number;
    column: number;
    value: number;
    roundState: RoundState;
    gameState: GameState;
    playerInfo: PlayerInfo;
    sizeClass: string;
}) => {
    const boxValue = value === 0 ? " " : value === 1 ? "X" : "O";
    const markColor =
        boxValue === "X"
            ? "text-sky-600 dark:text-sky-400"
            : boxValue === "O"
                ? "text-rose-600 dark:text-rose-400"
                : "text-transparent";

    const aiTurn = playerInfo.playwithAI && roundState.currentPlayer === 2;
    const filled = value !== 0;
    const disabled = aiTurn || filled || gameState.winner != null;

    return (
        <button
            type="button"
            disabled={disabled}
            className={`flex items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200/80 transition hover:bg-teal-50/60 hover:ring-teal-300/60 active:scale-[0.97] disabled:cursor-default disabled:hover:bg-white disabled:active:scale-100 dark:bg-zinc-900 dark:ring-zinc-700 dark:hover:bg-teal-950/40 dark:hover:ring-teal-700/50 dark:disabled:hover:bg-zinc-900 ${sizeClass}`}
            onClick={() => runClickHandler({ row, col: column, gameState, roundState, playerInfo })}
        >
            <span className={`font-bold leading-none tracking-tight ${markColor} ${playerInfo.dimension <= 3 ? "text-4xl" : playerInfo.dimension <= 5 ? "text-2xl" : "text-lg"}`}>
                {boxValue}
            </span>
        </button>
    );
};
