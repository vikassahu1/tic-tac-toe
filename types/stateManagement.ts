// Manage the state of the game'
import React from "react";

export interface GameState {
    board: number[][];
    currentPlayer: number;
    winner: number | null;
    dimension: number;
    numberOfPlayers: number;
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
    setWinner: React.Dispatch<React.SetStateAction<number | null>>;
}
