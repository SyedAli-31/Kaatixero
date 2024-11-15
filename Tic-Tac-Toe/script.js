var cells = document.querySelectorAll('.cell');
var statusText = document.getElementById('status');
var resultScreen = document.getElementById('result-screen');
var resultMessage = document.getElementById('result-message');
var currentPlayer = 'X';
var gameState = Array(9).fill('');
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
cells.forEach(function (cell) { return cell.addEventListener('click', handleCellClick); });
function handleCellClick(event) {
    var cell = event.target;
    var index = cell.getAttribute('data-index');
    if (index === null || gameState[parseInt(index)] || checkWin())
        return;
    gameState[parseInt(index)] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
        displayResult("Player ".concat(currentPlayer, " wins! \uD83C\uDF89"));
    }
    else if (!gameState.includes('')) {
        displayResult("It's a draw! 🤝");
    }
    else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (statusText) {
            statusText.textContent = "Player ".concat(currentPlayer, "'s turn");
        }
    }
}
function checkWin() {
    return winningConditions.some(function (condition) {
        var a = condition[0], b = condition[1], c = condition[2];
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}
function displayResult(message) {
    if (resultMessage) {
        resultMessage.textContent = message;
    }
    if (resultScreen) {
        resultScreen.style.display = 'flex';
    }
}
function newGame() {
    gameState.fill('');
    currentPlayer = 'X';
    if (statusText) {
        statusText.textContent = "Player X's turn";
    }
    cells.forEach(function (cell) { return cell.textContent = ''; });
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
}
function resetGame() {
    newGame();
    if (statusText) {
        statusText.textContent = "New Game 🎉";
    }
}
