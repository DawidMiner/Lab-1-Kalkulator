import { appendValue, clearValue } from './src/calculator.js';

const API = "http://localhost:5000"; // ❌ żadnego process.env w przeglądarce

let currentValue = "";

function render() {
  document.getElementById("display").value = currentValue;
}

window.append = function (ch) {
  currentValue = appendValue(currentValue, ch);
  render();
};

window.clearDisplay = function () {
  currentValue = clearValue();
  render();
};

window.calc = async function () {
  try {
    const resp = await fetch(`${API}/api/calc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: currentValue })
    });

    const json = await resp.json();
    currentValue = json.result?.toString() || "Błąd";
    render();
  } catch {
    currentValue = "Błąd sieci";
    render();
  }
};
