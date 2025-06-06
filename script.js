let bitSize = 1; // Always start at 1 bit for each session
let numberToGuess;
let binaryNumberToGuess;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');
    document.getElementById("prompt").innerText = Guess the ${bitSize}-bit number in binary! (0 to ${Math.pow(2, bitSize) - 1});
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
    document.getElementById("highScore").innerText = High Score: ${highScore} bits;
}

function makeGuess() {
    const guess = document.getElementById("guess").value;

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = Invalid input! Please enter a ${bitSize}-bit binary number.;
        return;
    }

    if (guess < binaryNumberToGuess) {
        document.getElementById("result").innerText = "Higher in binary!";
    } else if (guess > binaryNumberToGuess) {
        document.getElementById("result").innerText = "Lower in binary!";
    } else {
        document.getElementById("result").innerText = "Congratulations! You guessed it right in binary! 🎉";
        bitSize *= 2; // Double bit size for the next correct guess

        // Update high score if the current bit size is greater
        if (bitSize > highScore) {
            highScore = bitSize;
            localStorage.setItem("highScore", highScore); // Save high score to local storage
        }

        newRound(); // Start a new round
    }
}

// Add event listener for keypress
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess(); // Call makeGuess() when Enter is pressed
    }
});

// Start the first round
newRound();
