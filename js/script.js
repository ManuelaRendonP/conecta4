document.addEventListener("DOMContentLoaded", function () {
    const board = document.querySelector(".board");
    const slots = document.querySelectorAll(".slot");
    const restartGameButton = document.getElementById("restart-game");
    const resetScoresButton = document.getElementById("reset-scores");

    let currentPlayer = "redplayer";
    let gameEnded = false;
    let redplayerScore = 0;
    let yellowplayerScore = 0;

    // Function to handle the player's move
    function handleMove(column) {
        if (gameEnded) return;
        for (let i = slots.length - 1; i >= 0; i--) {
            const slot = slots[i];
            if (slot.getAttribute("data-column") === column && slot.getAttribute("status") === "empty") {
                slot.setAttribute("status", currentPlayer);
                slot.setAttribute("slot", currentPlayer);
                if (checkWin()) {
                    gameEnded = true;
                    showVictoryMessage(currentPlayer);
                    return;
                }
                currentPlayer = currentPlayer === "redplayer" ? "yellowplayer" : "redplayer";
                break;
            }
        }
    }

    // Function to check if a player has won
    function checkWin() {
        const numRows = 6;
        const numCols = 7;

        const board = [];
        for (let row = 0; row < numRows; row++) {
            board.push([]);
            for (let col = 0; col < numCols; col++) {
                board[row][col] = slots[row * numCols + col].getAttribute("status");
            }
        }

        // Function to check if there are four consecutive slots with the same status
        function checkFourSlots(row, col, rowInc, colInc) {
            const player = board[row][col];
            if (player === "empty") return false;

            for (let i = 1; i < 4; i++) {
                const newRow = row + i * rowInc;
                const newCol = col + i * colInc;
                if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols || board[newRow][newCol] !== player) {
                    return false;
                }
            }
            return true;
        }

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                if (checkFourSlots(row, col, 0, 1)) return true;
            }
        }

        for (let row = 0; row < numRows - 3; row++) {
            for (let col = 0; col < numCols; col++) {
                if (checkFourSlots(row, col, 1, 0)) return true;
            }
        }

        for (let row = 0; row < numRows - 3; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                if (checkFourSlots(row, col, 1, 1)) return true;
            }
        }

        for (let row = 0; row < numRows - 3; row++) {
            for (let col = 3; col < numCols; col++) {
                if (checkFourSlots(row, col, 1, -1)) return true;
            }
        }

        return false;
    }

    // Function to show a victory message and restart the game
    function showVictoryMessage(winner) {
        const winnerName = winner === "redplayer" ? "Red Player" : "Yellow Player";
        const message = `${winnerName} wins! 🎉`;

        // Display a styled message instead of a simple alert
        const victoryMessage = document.createElement("div");
        victoryMessage.classList.add("victory-message");
        victoryMessage.textContent = message;

        document.body.appendChild(victoryMessage);

        setTimeout(() => {
            document.body.removeChild(victoryMessage);
            incrementScore(winner);
            resetGame();
        }, 2000);
    }


    // Function to reset the game board
    function resetGame() {
        gameEnded = false;
        currentPlayer = currentPlayer === "redplayer" ? "yellowplayer" : "redplayer"; // Alternar jugadores
        board.removeEventListener("click", handleMove);

        for (const slot of slots) {
            slot.setAttribute("status", "empty");
            slot.removeAttribute("slot");
            slot.classList.remove("redplayer");
            slot.classList.remove("yellowplayer");
        }
        board.addEventListener("click", handleMove);
    }

    // Event listener for slot clicks
    board.addEventListener("click", function (event) {
        if (event.target.classList.contains("slot")) {
            const column = event.target.getAttribute("data-column");
            handleMove(column);
        }
    });

    restartGameButton.addEventListener("click", resetGame);
    resetScoresButton.addEventListener("click", resetScores);

    function resetScores() {
        redplayerScore = 0;
        yellowplayerScore = 0;
        updateScoreDisplay();
    }

    function updateScoreDisplay() {
        const redplayerScoreElem = document.getElementById("redplayer-score");
        const yellowplayerScoreElem = document.getElementById("yellowplayer-score");
        redplayerScoreElem.textContent = redplayerScore;
        yellowplayerScoreElem.textContent = yellowplayerScore;
    }

    function incrementScore(winner) {
        if (winner === "redplayer") {
            redplayerScore++;
        } else {
            yellowplayerScore++;
        }
        updateScoreDisplay();
    }
});
