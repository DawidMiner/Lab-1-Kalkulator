const API = (process.env.BACKEND_URL) ? process.env.BACKEND_URL : "http://localhost:5000";

function append(ch) {
  const d = document.getElementById("display");
  if (d.dataset.lastResult) {
    d.value = "";
    delete d.dataset.lastResult;
  }
  d.value += ch;
}

function clearDisplay() {
  const d = document.getElementById("display");
  d.value = "";
  delete d.dataset.lastResult;
}

async function calc() {
  const d = document.getElementById("display");
  const expr = d.value;
  try {
    const resp = await fetch(`${API}/api/calc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expr })
    });
    const json = await resp.json();
    if (resp.ok) {
      d.value = json.result;
      d.dataset.lastResult = "1";
    } else {
      d.value = json.error || "Błąd";
    }
  } catch (e) {
    d.value = "Błąd sieci";
  }
}

// przypisujemy funkcje do globalnego obiektu window, żeby były widoczne dla onclick w HTML
window.append = append;
window.clearDisplay = clearDisplay;
window.calc = calc;

// attach event for Enter key
document.addEventListener("DOMContentLoaded", () => {
  const d = document.getElementById("display");
  d.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calc();
    }
  });
});
