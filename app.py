from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    expression = request.json.get("expression", "")
    try:
        # Bezpieczne eval - tylko podstawowe operacje
        allowed_chars = "0123456789+-*/.() "
        if any(c not in allowed_chars for c in expression):
            return jsonify({"result": "Błąd: niedozwolone znaki"})
        result = eval(expression)
    except ZeroDivisionError:
        result = "Błąd: dzielenie przez zero"
    except Exception:
        result = "Błąd: niepoprawne wyrażenie"
    return jsonify({"result": str(result)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
