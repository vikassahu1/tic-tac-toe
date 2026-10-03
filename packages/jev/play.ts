import { JevClient, choice } from "@ai/client";
import { RoundState, Position, PlayerInfo } from "@/types/stateManagement";

export const play = async (
    roundState: RoundState,
    playerInfo: PlayerInfo
): Promise<Position> => {
    const difficulty = playerInfo.difficulty ?? "medium";
    const { board } = roundState;

    const dimension = board.length;
    const emptyPositions: string[] = [];

    // Convert board to a readable grid for the model
    const boardLines: string[] = [];
    for (let i = 0; i < dimension; i++) {
        const cells: string[] = [];
        for (let j = 0; j < dimension; j++) {
            if (board[i][j] === 0) {
                cells.push(".");
                emptyPositions.push(`${i} ${j}`);
            } else if (board[i][j] === 1) {
                cells.push("X");
            } else {
                cells.push("O");
            }
        }
        boardLines.push(cells.join(" "));
    }

    if (emptyPositions.length === 0) {
        return { row: -1, col: -1 };
    }

    const boardText = boardLines.join("\n");

    // Computer is always player 2 = O
    const state = {
        game: "Tic Tac Toe",
        rules: `Get ${dimension} in a row (row, column, or diagonal) to win on a ${dimension}x${dimension} board.`,
        board_size: dimension,
        board: boardText,
        you_are: "O",
        opponent_is: "X",
        empty_cells: emptyPositions,
        difficulty,
    };

    const difficultyGuide =
        difficulty === "easy"
            ? "Play casually. Prefer center/corners when free, but you may miss some blocks."
            : difficulty === "hard"
                ? "Play optimally. Always take a winning move if available. Always block the opponent's winning move. Prefer forks, then center, then corners."
                : "Play competitively. Take winning moves, block opponent threats, then pick strong strategic squares (center, corners).";

    const instructions = `
You are O (the computer) in Tic-Tac-Toe on a ${dimension}x${dimension} board.
Opponent is X. You must choose ONE empty cell for O.

Board (row-major, "." = empty):
${boardText}

Coordinates are "row col" with 0-based indexing. Top-left is "0 0".

Priority order:
1) If O can win this turn, take that cell.
2) If X can win next turn, block that cell.
3) Otherwise follow difficulty guidance: ${difficultyGuide}

Choose exactly one legal empty position from the options.
`;

    const criteria = Object.fromEntries(
        emptyPositions.map((position) => {
            const [r, c] = position.split(" ");
            return [position, `Place O at row ${r}, column ${c}.`];
        })
    );

    const questions = {
        move: choice(instructions, criteria),
    };

    const client = new JevClient();
    const result = await client.ask(state, questions);
    const [row, col] = result.answers.move.choice.split(" ").map(Number);

    return { row, col };
};
