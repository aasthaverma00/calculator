// ----- Variables to remember things -----
let current = "0";      // the number being typed
let previous = null;    // the number typed before the operator
let operator = null;    // + - * /
let justCalculated = false;
 
// Get the screen and history elements from the HTML
const screen = document.getElementById("screen");
const history = document.getElementById("history");
 
// Show the current number on the screen
function updateScreen() {
  screen.textContent = current;
}
 
// ----- When a number (or dot) is clicked -----
function appendNumber(num) {
  // start fresh after pressing "="
  if (justCalculated) {
    current = "0";
    justCalculated = false;
  }
 
  // don't allow two dots
  if (num === "." && current.includes(".")) return;
 
  // replace the starting 0, otherwise add to the end
  if (current === "0" && num !== ".") {
    current = num;
  } else {
    current = current + num;
  }
  updateScreen();
}
 
// ----- When + - × ÷ is clicked -----
function chooseOperator(op) {
  // if there is already a calculation waiting, finish it first
  if (operator !== null && !justCalculated) {
    calculate();
  }
  previous = current;
  operator = op;
  justCalculated = false;
  history.textContent = previous + " " + symbol(op);
  current = "0";
}
 
// ----- When = is clicked -----
function calculate() {
  if (operator === null) return;
 
  const a = Number(previous);
  const b = Number(current);
  let result;
 
  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "*") result = a * b;
  if (operator === "/") {
    if (b === 0) {
      current = "Error";
      history.textContent = "Can't divide by 0";
      operator = null;
      justCalculated = true;
      updateScreen();
      return;
    }
    result = a / b;
  }
 
  history.textContent = previous + " " + symbol(operator) + " " + current + " =";
  current = String(Math.round(result * 100000000) / 100000000); // avoids 0.1+0.2 problem
  operator = null;
  previous = null;
  justCalculated = true;
  updateScreen();
}
 
// ----- Extra buttons -----
function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  justCalculated = false;
  history.textContent = "";
  updateScreen();
}
 
function toggleSign() {
  if (current === "0" || current === "Error") return;
  current = String(Number(current) * -1);
  updateScreen();
}
 
function percent() {
  current = String(Number(current) / 100);
  updateScreen();
}
 
function squareRoot() {
  const n = Number(current);
  if (n < 0) {
    current = "Error";
  } else {
    current = String(Math.round(Math.sqrt(n) * 100000000) / 100000000);
  }
  justCalculated = true;
  updateScreen();
}
 
// Turn * and / into × and ÷ for the history text
function symbol(op) {
  if (op === "*") return "×";
  if (op === "/") return "÷";
  if (op === "-") return "−";
  return op;
}
 