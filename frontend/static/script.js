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
    // ZMIANA: Usuwamy http://127.0.0.1:5000 i zostawiamy samą ścieżkę
    // Dzięki temu zapytanie trafi tam, gdzie hostowana jest strona
    const resp = await fetch("/api/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expr })
    });

    if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Błąd serwera");
    }

    const json = await resp.json();
    getDisplay().value = json.result;
  } catch (err) {
    console.error("Błąd komunikacji z API:", err);
    getDisplay().value = "Błąd";
  }
};