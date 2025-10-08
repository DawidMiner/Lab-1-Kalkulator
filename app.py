from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    num1 = request.form.get("num1", "")
    num2 = request.form.get("num2", "")
    operator = request.form.get("operator")

    if request.method == "POST":
        try:
            n1 = float(num1)
            n2 = float(num2)
            if operator == "+":
                result = n1 + n2
            elif operator == "-":
                result = n1 - n2
            elif operator == "*":
                result = n1 * n2
            elif operator == "/":
                result = n1 / n2 if n2 != 0 else "Błąd: dzielenie przez zero"
        except ValueError:
            result = "Błąd: niepoprawne dane"

    return render_template("index.html", num1=num1, num2=num2, result=result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
