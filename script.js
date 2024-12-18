const boxes = document.querySelectorAll(".box");
const instruction = document.querySelector(".instruction");
const restartButton = document.getElementById("restart");
let currentPlayer = null; 
let board = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}
function handleBoxClick(e) {
    const index = Array.from(boxes).indexOf(e.target);
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        instruction.textContent = `Player ${winner} wins!`;
        boxes.forEach(box => box.style.pointerEvents = "none");
    } else if (board.every(cell => cell)) {
        instruction.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        instruction.textContent = `Player ${currentPlayer}'s turn`;
    }
}
function restartGame() {
    board.fill(null);
    currentPlayer = null; 
    instruction.textContent = "Select X or O to start!";
    boxes.forEach(box => {
        box.textContent = "";
        box.style.pointerEvents = "auto";
    });
    selectPlayer(); 
}
function selectPlayer() {
    setTimeout(() => {
        const choice = prompt("Select your symbol: X or O").toUpperCase();
        if (choice === "X" || choice === "O") {
            currentPlayer = choice;
            instruction.textContent = `Player ${currentPlayer} starts.`;
        } else {
            instruction.textContent = "Invalid choice. Please select again.";
            selectPlayer();
        }
    }, 100); 
}
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
restartButton.addEventListener("click", restartGame);
selectPlayer();
