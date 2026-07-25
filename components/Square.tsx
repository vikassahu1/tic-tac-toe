"use client";
import { useState } from "react";
import { GameState } from "@/types/stateManagement";
import { alreadyFilled, checkWinner } from "@/lib/utiliy";

const updateSquare = ({ currentPlayer, setBoxValue }: { currentPlayer: number, setBoxValue: React.Dispatch<React.SetStateAction<string>> }) => {
    if (currentPlayer == 1) setBoxValue("X");
    else setBoxValue("O");
    return;
};

const runClickHandler = ({ row, col, gameState, setBoxValue }: { row: number, col: number, gameState: GameState, setBoxValue: React.Dispatch<React.SetStateAction<string>> }) => {
    const { board, currentPlayer, setCurrentPlayer, numberOfPlayers, setWinner } = gameState;
    if (alreadyFilled({ row, col, board })) {
        console.log("Square already filled");
        return;
    }
    board[row][col] = currentPlayer;
    updateSquare({ currentPlayer, setBoxValue });
    if (checkWinner(board)) {
        setWinner(currentPlayer);
        return;
    }
    setCurrentPlayer(currentPlayer % numberOfPlayers + 1);
    console.log("clicked");
};

export const Square = ({ row, column, value, gameState }: { row: number, column: number, value: number, gameState: GameState }) => {
    const { board, currentPlayer, setCurrentPlayer, setBoard } = gameState;
    const [boxValue, setBoxValue] = useState<string>(value === 0 ? " " : value === 1 ? "X" : "O");
    const markColor =
        boxValue === "X"
            ? "text-sky-600 dark:text-sky-400"
            : boxValue === "O"
                ? "text-rose-600 dark:text-rose-400"
                : "text-transparent";

    return (
        <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-zinc-50 active:scale-[0.98] dark:bg-zinc-900 dark:hover:bg-zinc-800"
            onClick={() => runClickHandler({ row, col: column, gameState, setBoxValue })}
        >
            <span className={`text-3xl font-bold leading-none ${markColor}`}>{boxValue}</span>
        </button>
    );
};
