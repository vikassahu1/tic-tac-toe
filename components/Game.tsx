"use client";

import { useState } from "react";
import { GameState, PlayerInfo } from "@/types/stateManagement";
import { Winner } from "@/components/Winner";
import { Round } from "@/components/Round";

export const Game = ({ playerInfo }: { playerInfo: PlayerInfo }) => {
    const { dimension, rounds } = playerInfo;
    const [roundWinner, setRoundWinner] = useState<number[]>(() => Array(rounds).fill(0));
    const [roundNumber, setRoundNumber] = useState(1);

    if (dimension % 2 === 0) {
        throw new Error("Dimension must be odd");
    }

    const [winner, setWinner] = useState<number | null>(null);

    let gameState: GameState = {
        winner,
        roundNumber,
        roundWinner,
        setRoundNumber,
        setRoundWinner,
        setWinner,
    };
    return(
        <>
        {winner? <Winner winner={winner} playerInfo={playerInfo} /> : <Round gameState={gameState} playerInfo={playerInfo} />}
        </>
    );
};

