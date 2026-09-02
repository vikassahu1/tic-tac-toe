// Manage the state of the game'
import React from "react";

export interface GameState {
    winner: number | null;
    roundNumber: number | null;
    roundWinner: number[];
    setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
    setRoundWinner: React.Dispatch<React.SetStateAction<number[]>>;
    setWinner: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface PlayerInfo {
    playeroneName: string;
    playertwoName: string;
    rounds: number;    // tracks number of rounds
    dimension: number;
    numberOfPlayers: number;
    setPlayerName: React.Dispatch<React.SetStateAction<string[]>>;
    setDim: React.Dispatch<React.SetStateAction<number>>;
    setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
}

export interface RoundState {
    currentRound: number;
    board: number[][];
    currentPlayer: number;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
}