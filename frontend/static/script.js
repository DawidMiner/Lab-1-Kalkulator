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


  const isTest = window.location.port === '3000';
  const apiUrl = isTest ? "http://127.0.0.1:5000/api/calc" : "/api/calc";

  try {
    const resp = await fetch(apiUrl, {
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