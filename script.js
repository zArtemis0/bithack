let bitSize = 1;
let numberToGuess;
let binaryNumberToGuess;
let highScore = localStorage.getItem("highScore") || 0;
let startTime;
let timerInterval;
let guessCount = 0;

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');

    document.getElementById("prompt").innerText = `Guess the ${bitSize}-bit number in binary! (0 to ${Math.pow(2, bitSize) - 1})`;
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
    document.getElementById("highScore").innerText = `High Score: ${highScore} bits`;
    document.getElementById("guessCount").innerText = `Guesses: 0`;
    document.getElementById("timer").innerText = `Time: 0.00 s`;

    guessCount = 0;
    startTime = Date.now();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
        document.getElementById("timer").innerText = `Time: ${elapsedSeconds} s`;
    }, 100);
}

function makeGuess() {
    const guess = document.getElementById("guess").value;
    guessCount++;
    document.getElementById("guessCount").innerText = `Guesses: ${guessCount}`;

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = `Invalid input! Please enter a ${bitSize}-bit binary number.`;
        return;
    }

    if (guess === binaryNumberToGuess) {
        clearInterval(timerInterval);
        let elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
        document.getElementById("result").innerText = `🎉 Correct! You took ${elapsedSeconds} seconds and ${guessCount} guesses.`;
        bitSize *= 2;

        if (bitSize > highScore) {
            highScore = bitSize;
            localStorage.setItem("highScore", highScore);
        }

        setTimeout(newRound, 3000);
    } else {
        document.getElementById("result").innerText = "Incorrect. Try again.";
    }
}

document.querySelector("button").addEventListener("click", makeGuess);
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

newRound();
