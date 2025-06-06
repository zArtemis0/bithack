let bitSize = 1; // Start with 1 bit
let numberToGuess;
let binaryNumberToGuess;
let highScore = localStorage.getItem("highScore") || 0;

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');
    document.getElementById("prompt").innerText = `Guess the ${bitSize}-bit number in binary! (0 to ${Math.pow(2, bitSize) - 1})`;
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
    document.getElementById("highScore").innerText = `High Score: ${highScore} bits`;
}

function makeGuess() {
    const guess = document.getElementById("guess").value;

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = `Invalid input! Please enter a ${bitSize}-bit binary number.`;
        return;
    }

    if (guess === binaryNumberToGuess) {
        document.getElementById("result").innerText = "🎉 Correct!";
        bitSize *= 2;

        if (bitSize > highScore) {
            highScore = bitSize;
            localStorage.setItem("highScore", highScore);
        }

        newRound();
    } else {
        document.getElementById("result").innerText = "Incorrect. Try again.";
    }
}

document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

newRound();
