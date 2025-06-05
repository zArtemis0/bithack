let bitSize = 1; // Always start at 1 bit for each session
let numberToGuess;
let binaryNumberToGuess;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage
const MAX_BIT_SIZE = 16; // Set a maximum bit size to prevent overflow
let guessCount; // Variable to count the number of guesses

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');
    
    // Calculate the max value for the current bit size
    const maxValue = Math.pow(2, bitSize) - 1;
    
    document.getElementById("prompt").innerText = `Guess the ${bitSize}-bit number in binary! (0 to ${maxValue})`;
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
    document.getElementById("guessCount").innerText = "Number of guesses: 0"; // Reset guess count
    guessCount = 0; // Reset the guess count
    document.getElementById("highScore").innerText = `High Score: ${highScore} bits`;
}

function makeGuess() {
    const guess = document.getElementById("guess").value;
    guessCount++; // Increment guess counter

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = `Invalid input! Please enter a ${bitSize}-bit binary number.`;
        return;
    }

    // Check if the guess is correct
    if (guess === binaryNumberToGuess) {
        document.getElementById("result").innerText = "Congratulations! You guessed it right in binary! 🎉";

        // Double the bit size for the next correct guess, but check against the max
        if (bitSize < MAX_BIT_SIZE) {
            bitSize *= 2; // Double bit size for the next correct guess
        } else {
            document.getElementById("result").innerText += " (You've reached the maximum bit size!)";
        }

        // Update high score if the current bit size is greater
        if (bitSize > highScore) {
            highScore = bitSize;
            localStorage.setItem("highScore", highScore); // Save high score to local storage
        }

        newRound(); // Start a new round
    } else {
        document.getElementById("result").innerText = "Try again!"; // Prompt to try again
        document.getElementById("guessCount").innerText = `Number of guesses: ${guessCount}`; // Update guess count display
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
