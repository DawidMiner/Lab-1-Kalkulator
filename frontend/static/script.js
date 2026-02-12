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
    const resp = await fetch("/api/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expr })
    });

    const json = await resp.json();
    getDisplay().value = json.result;
  } catch {
    getDisplay().value = "Błąd";
  }
};
