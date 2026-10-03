"use client";

import { Square } from "@/components/Square";
import { PlayerInfo, RoundState, GameState } from "@/types/stateManagement";

export const Board = ({ roundState, playerInfo, gameState }: { roundState: RoundState, playerInfo: PlayerInfo, gameState: GameState }) => {
    const n = playerInfo.dimension;
    const board = roundState.board;
    const sizeClass =
        n <= 3 ? "h-20 w-20" : n <= 5 ? "h-14 w-14" : n <= 7 ? "h-11 w-11" : "h-9 w-9";

    return (
        <div
            key={`${gameState.roundNumber}-${n}`}
            className="inline-grid gap-2 rounded-2xl bg-stone-200/90 p-2.5 shadow-inner dark:bg-zinc-800"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
            {board.map((row, i) =>
                row.map((cell, j) => (
                    <Square
                        key={`${i}-${j}`}
                        row={i}
                        column={j}
                        value={cell}
                        roundState={roundState}
                        gameState={gameState}
                        playerInfo={playerInfo}
                        sizeClass={sizeClass}
                    />
                ))
            )}
        </div>
    );
};
