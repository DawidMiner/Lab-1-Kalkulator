function getDisplay() {
  return document.getElementById("display");
}

window.append = function (char) {
  getDisplay().value += char;
};

window.clearDisplay = function () {
  getDisplay().value = "";
};

window.calc = async function () {
  const expr = getDisplay().value;

  try {
    // Zmieniamy ścieżkę na pełny URL do backendu (port 5000 w CI)
    const resp = await fetch("http://127.0.0.1:5000/api/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expr })
    });

    if (!resp.ok) {
        throw new Error("Błąd serwera");
    }

    const json = await resp.json();
    getDisplay().value = json.result;
  } catch (err) {
    console.error("Błąd komunikacji z API:", err);
    getDisplay().value = "Błąd";
  }
};