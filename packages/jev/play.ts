import { JevClient, choice } from "@ai/client";
import { RoundState, GameState, Position } from "@/types/stateManagement";

export const play = async (
    gameState: GameState,
    roundState: RoundState
): Promise<Position> => {
    const { difficulty } = gameState;
    const { board } = roundState;

    const dimension = board.length;
    const emptyPositions: string[] = [];
    const gameBoard: string[][] = [];

    // Convert numeric board into a representation JEV can understand
    for (let i = 0; i < dimension; i++) {
        const row: string[] = [];

        for (let j = 0; j < dimension; j++) {
            if (board[i][j] === 0) {
                row.push("empty");
                emptyPositions.push(`${i} ${j}`);
            } else if (board[i][j] === 1) {
                row.push("X");
            } else {
                row.push("O");
            }
        }

        gameBoard.push(row);
    }

    // Current game context
    const state = {
        game: "Tic Tac Toe",
        board: gameBoard,
        difficulty: difficulty ?? "easy",
        player: "X",
        opponent: "O",
    };

    // Tell JEV what decision it needs to make
    const instructions = `
        Choose the position where X should be placed.

        Positions are represented as "row column" using zero-based indexing.

        Difficulty: ${difficulty}.
        On easy difficulty, make less optimal decisions.
        On hard difficulty, play strategically and try to win.

        Choose only one of the provided legal positions.
    `;

    // Convert legal positions into JEV's choice criteria
    const criteria = Object.fromEntries(
        emptyPositions.map((position) => [
            position,
            `Place X at row ${position.split(" ")[0]}, column ${position.split(" ")[1]}.`
        ])
    );

    const questions = {
        move: choice(instructions, criteria),
    };

    const client = new JevClient();
    const result = await client.ask(state, questions);
    const [row, col] = result.answers.move.choice.split(" ").map(Number);

    return {
        row,
        col,
    };
};