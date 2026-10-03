import { PlayerInfo } from "@/types/stateManagement";

export const checkWinner = (board: number[][]): boolean => {
    const n = board.length;

    // Check rows
    for (let i = 0; i < n; i++) {
        let rowWin = true;
        for (let j = 1; j < n; j++) {
            if (board[i][j] !== board[i][0]) {
                rowWin = false;
                break;
            }
        }
        if (rowWin && board[i][0] !== 0) return true;
    }

    // Check columns
    for (let j = 0; j < n; j++) {
        let colWin = true;
        for (let i = 1; i < n; i++) {
            if (board[i][j] !== board[0][j]) {
                colWin = false;
                break;
            }
        }
        if (colWin && board[0][j] !== 0) return true;
    }

    // Check main diagonal
    let diag1 = true;
    for (let i = 1; i < n; i++) {
        if (board[i][i] !== board[0][0]) {
            diag1 = false;
            break;
        }
    }
    if (diag1 && board[0][0] !== 0) return true;

    // Check anti-diagonal
    let diag2 = true;
    for (let i = 1; i < n; i++) {
        if (board[i][n - 1 - i] !== board[0][n - 1]) {
            diag2 = false;
            break;
        }
    }
    if (diag2 && board[0][n - 1] !== 0) return true;

    return false;
};

export const alreadyFilled = ({ row, col, board }: { row: number, col: number, board: number[][] }) => {
    if (board[row][col] != 0) return true;
    return false;
}


export const checkDraw = (board: number[][]): boolean => {
    const n = board.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

export const resolvePlayer = (winner: number, playerInfo: PlayerInfo): string => {
    const { playeroneName, playertwoName } = playerInfo;
    if (winner === 1) return playeroneName;
    else return playertwoName;
}


// Common play logic 