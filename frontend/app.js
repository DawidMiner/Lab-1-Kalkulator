import { appendValue, clearValue } from './src/calculator.js';

const API = "http://localhost:5000";

const display = document.getElementById("display");

function append(ch) {
  display.value = appendValue(display.value, ch);
}

function clearDisplay() {
  display.value = clearValue();
}

async function calc() {
  const expr = display.value;
  const resp = await fetch(`${API}/api/calc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expression: expr })
  });
  const json = await resp.json();
  display.value = json.result ?? json.error;
}

window.append = append;
window.clearDisplay = clearDisplay;
window.calc = calc;
