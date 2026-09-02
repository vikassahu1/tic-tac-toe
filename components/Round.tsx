"use client";

import { GameState, PlayerInfo, RoundState } from "@/types/stateManagement";
import { useState } from "react";
import { Board } from "@/components/Board";

export const Round = ({ gameState, playerInfo }: { gameState: GameState, playerInfo: PlayerInfo }) => {

    const { roundNumber } = gameState;
    const { dimension } = playerInfo;
    const [board, setBoard] = useState(() => Array(dimension).fill(0).map(() => Array(dimension).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const currentRound = roundNumber ?? 1;

    let roundState: RoundState = {
        currentRound,
        board,
        currentPlayer,
        setCurrentPlayer,
        setBoard,
    };

    return (
        <div className="flex flex-col items center gap-5">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Round {currentRound}</p>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Current turn:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    Player {currentPlayer} ({currentPlayer === 1 ? "X" : "O"})
                </span>
            </p>
            <Board roundState={roundState} playerInfo={playerInfo} gameState={gameState} />
        </div>
    );
};


//     currentRound: number;
//     board: number[][];
//     setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
// }


// let currentround = roundNumber;
// gameState.currentRound = currentround;
// setRoundNumber(roundNumber + 1);

// if (roundWinner[i] === 0) {
//     return (
//         <div className="flex flex-col items-center gap-5">
//             <p className="text-sm text-zinc-600 dark:text-zinc-400">
//                 Round {currentround}
//             </p>
//             <p className="text-sm text-zinc-600 dark:text-zinc-400">
//                 Current turn:{" "}
//                 <span className="font-semibold text-zinc-900 dark:text-zinc-50">
//                     Player {currentPlayer} ({currentPlayer === 1 ? "X" : "O"})
//                 </span>
//             </p>
//             <Board gameState={gameState} playerInfo={playerInfo} />
//             <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-950">
//                 Reset
//             </button>
//         </div>
//     );
// }
// else {
//     continue;
// }
// }

