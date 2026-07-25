"use client";
import { Square } from "@/components/Square";
import { GameState } from "@/types/stateManagement";

export const Board = ({gameState}: {gameState: GameState}) => {
    const n = gameState.board.length;
    const board = gameState.board;

    return (
        <div
            className="inline-grid gap-2 rounded-xl bg-zinc-200 p-2 dark:bg-zinc-800"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
            {board.map((row, i) =>
                row.map((cell, j) => (
                    <Square key={`${i}-${j}`} row={i} column={j} value={cell} gameState={gameState} />
                ))
            )}
        </div>
    );
};
