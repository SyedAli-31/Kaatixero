const cells: NodeListOf<HTMLElement> = document.querySelectorAll('.cell');
const statusText: HTMLElement | null = document.getElementById('status');
const resultScreen: HTMLElement | null = document.getElementById('result-screen');
const resultMessage: HTMLElement | null = document.getElementById('result-message');
let currentPlayer: string = 'X';
let gameState: string[] = Array.from({ length: 9 }, () => ''); // Initialize array without using `fill`

const winningConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // No casting needed if cells are NodeListOf<HTMLElement>

function handleCellClick(event: MouseEvent): void {
    const cell: Element = event.target as Element;
    const index: string | null = cell.getAttribute('data-index');

    if (index === null || gameState[parseInt(index)] || checkWin()) return;

    gameState[parseInt(index)] = currentPlayer;
    (cell as HTMLElement).textContent = currentPlayer;

    if (checkWin()) {
        displayResult(`Player ${currentPlayer} wins! 🎉`);
    } else if (isDraw()) {
        displayResult("It's a draw! 🤝");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (statusText) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(): boolean {
    return winningConditions.some(condition => {
        const [a, b, c]: number[] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Custom function to check for draw without using `includes`
function isDraw(): boolean {
    return gameState.every(cell => cell !== '');
}

function displayResult(message: string): void {
    if (resultMessage) {
        resultMessage.textContent = message;
    }
    if (resultScreen) {
        resultScreen.style.display = 'flex';
    }
}

function newGame(): void {
    gameState = Array.from({ length: 9 }, () => ''); // Reinitialize array
    currentPlayer = 'X';
    if (statusText) {
        statusText.textContent = "Player X's turn";
    }
    cells.forEach(cell => (cell as HTMLElement).textContent = '');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
}

function resetGame(): void {
    newGame();
    if (statusText) {
        statusText.textContent = "New Game 🎉";
    }
}
