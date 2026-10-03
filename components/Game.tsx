"use client";

import { useState } from "react";
import { GameState, PlayerInfo } from "@/types/stateManagement";
import { Winner } from "@/components/Winner";
import { Round } from "@/components/Round";

export const Game = ({
    playerInfo,
    onBack,
}: {
    playerInfo: PlayerInfo;
    onBack: () => void;
}) => {
    const { dimension, rounds } = playerInfo;
    const [roundWinner, setRoundWinner] = useState<number[]>(() => Array(rounds).fill(0));
    const [roundNumber, setRoundNumber] = useState(1);
    const [winner, setWinner] = useState<number | null>(null);
    const [gameKey, setGameKey] = useState(0);

    if (dimension % 2 === 0) {
        throw new Error("Dimension must be odd");
    }

    const restart = () => {
        setWinner(null);
        setRoundNumber(1);
        setRoundWinner(Array(rounds).fill(0));
        setGameKey((k) => k + 1);
    };

    const gameState: GameState = {
        winner,
        roundNumber,
        roundWinner,
        setRoundNumber,
        setRoundWinner,
        setWinner,
    };

    return (
        <div className="flex w-full flex-col items-center gap-5">
            {winner != null ? (
                <Winner
                    winner={winner}
                    playerInfo={playerInfo}
                    onRestart={restart}
                    onBack={onBack}
                />
            ) : (
                <Round
                    key={`${dimension}-${rounds}-${gameKey}`}
                    gameState={gameState}
                    playerInfo={playerInfo}
                    onRestart={restart}
                    onBack={onBack}
                />
            )}
        </div>
    );
};
