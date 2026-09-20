"use client";

import { Square } from "@/components/Square";
import { PlayerInfo, RoundState, GameState} from "@/types/stateManagement";

export const Board = ({roundState, playerInfo, gameState}: {roundState: RoundState, playerInfo: PlayerInfo, gameState: GameState}) => {
    const { dimension, numberOfPlayers } = playerInfo;
    const n = dimension;
    const board = roundState.board;

    return (
        <div
            key={gameState.roundNumber}
            className="inline-grid gap-2.5 rounded-2xl bg-stone-200/90 p-2.5 shadow-inner dark:bg-zinc-800"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
            {board.map((row, i) =>
                row.map((cell, j) => (
                    <Square key={`${i}-${j}`} row={i} column={j} value={cell} roundState={roundState} gameState={gameState} playerInfo={playerInfo} />
                ))
            )}
        </div>
    );
};
