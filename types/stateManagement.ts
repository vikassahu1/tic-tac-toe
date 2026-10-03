// Manage the state of the game'
import React from "react";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
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
    playwithAI: boolean;
    rounds: number;    // tracks number of rounds
    dimension: number;
    numberOfPlayers: number;
    difficulty?: Difficulty | null;
    setPlaywithAI: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayerName: React.Dispatch<React.SetStateAction<string[]>>;
    setDim: React.Dispatch<React.SetStateAction<number>>;
    setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | null>>;
}

export interface RoundState {
    currentRound: number;
    board: number[][];
    currentPlayer: number;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
}

export interface Position {
    row: number;
    col: number;
}