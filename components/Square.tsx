"use client";
import { useState } from "react";
import { RoundState, GameState, PlayerInfo} from "@/types/stateManagement";
import { alreadyFilled, checkWinner, checkDraw } from "@/lib/utiliy";

const updateSquare = ({ currentPlayer, setBoxValue }: { currentPlayer: number, setBoxValue: React.Dispatch<React.SetStateAction<string>> }) => {
    if (currentPlayer == 1) setBoxValue("X");
    else setBoxValue("O");
    return;
};


const runClickHandler = ({ row, col, gameState, roundState, setBoxValue, playerInfo }: { row: number, col: number, roundState: RoundState, gameState: GameState, setBoxValue: React.Dispatch<React.SetStateAction<string>>,  playerInfo: PlayerInfo  }) => {
    console.log("runClickHandler called");
    const { board, currentPlayer, setCurrentPlayer, currentRound, setBoard } = roundState;
    const { numberOfPlayers, rounds, dimension } = playerInfo;
    const { setRoundNumber } = gameState;

    const startNextRound = () => {
        setRoundNumber(currentRound + 1);
        setBoard(Array(dimension).fill(0).map(() => Array(dimension).fill(0)));
        setCurrentPlayer(1);
    };
    
    if (alreadyFilled({ row, col, board })) {
        console.log("Square already filled");
        return;
    }

    const { setRoundWinner } = gameState;

    // shallow copy of the board to avoid direct mutation
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    updateSquare({ currentPlayer, setBoxValue });

    // check winner using the fresh board copy
    if (checkWinner(newBoard)) {
        setRoundWinner((prev) => prev.map((val, idx) => idx === ((currentRound ?? 1) - 1) ? currentPlayer : val));
        console.log("Winner found");

        if (currentRound === rounds) {
            const {setWinner} = gameState;
            setWinner(currentPlayer);
            console.log("Winner set");
            return;
        }
        startNextRound();
        return;
    }
    // check draw using the fresh board copy
    if (checkDraw(newBoard)) {
        setRoundWinner((prev) => prev.map((val, idx) => idx === ((currentRound ?? 1) - 1) ? -1 : val));
        console.log("Draw found");
        if (currentRound === rounds) {
            return;
        }
        startNextRound();
        return;
    }

    setCurrentPlayer(currentPlayer % numberOfPlayers + 1);
    console.log("clicked");
};


export const Square = ({ row, column, value, roundState, gameState, playerInfo }: { row: number, column: number, value: number, roundState: RoundState, gameState: GameState,  playerInfo: PlayerInfo }) => {
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
            className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200/80 transition hover:bg-teal-50/60 hover:ring-teal-300/60 active:scale-[0.97] dark:bg-zinc-900 dark:ring-zinc-700 dark:hover:bg-teal-950/40 dark:hover:ring-teal-700/50"
            onClick={() => runClickHandler({ row, col: column, gameState, roundState, setBoxValue, playerInfo })}
        >
            <span className={`text-4xl font-bold leading-none tracking-tight ${markColor}`}>{boxValue}</span>
        </button>
    );
};
