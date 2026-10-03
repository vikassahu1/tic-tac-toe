"use client";

import { useState } from "react";
import { GameState, PlayerInfo } from "@/types/stateManagement";
import { Winner } from "@/components/Winner";
import { Round } from "@/components/Round";

export const Game = ({ playerInfo }: { playerInfo: PlayerInfo }) => {
    const { dimension, rounds } = playerInfo;
    const [roundWinner, setRoundWinner] = useState<number[]>(() => Array(rounds).fill(0));
    const [roundNumber, setRoundNumber] = useState(1);
    const [winner, setWinner] = useState<number | null>(null);

    if (dimension % 2 === 0) {
        throw new Error("Dimension must be odd");
    }

    let gameState: GameState = {
        winner,
        roundNumber,
        roundWinner,
        setRoundNumber,
        setRoundWinner,
        setWinner,
    };
    return (
        <>
            {winner != null ? (
                <Winner winner={winner} playerInfo={playerInfo} />
            ) : (
                <Round key={`${dimension}-${rounds}`} gameState={gameState} playerInfo={playerInfo} />
            )}
        </>
    );
};

