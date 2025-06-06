let target = 1;
let startTime = Date.now();

function makeGuess() {
  const input = document.getElementById("guessInput").value;
  const result = document.getElementById("result");
  const timer = document.getElementById("timer");

  if (!input || isNaN(input)) {
    result.textContent = "Enter a valid number.";
    return;
  }

  if (parseInt(input) == target) {
    let endTime = Date.now();
    let timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    result.textContent = `Correct! The number was ${target}.`;
    timer.textContent = `You took ${timeTaken} seconds.`;
  } else {
    target *= 2;
    result.textContent = "Incorrect. Try again.";
  }
}
