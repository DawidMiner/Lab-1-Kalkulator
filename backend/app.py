from flask import Flask, request, jsonify, abort
import re
from flask_cors import CORS  # <-- dodaj import

app = Flask(__name__)
CORS(app)  # <-- włącz CORS globalnie

ALLOWED = re.compile(r'^[0-9+\-*/().\s]+$')

def safe_eval(expr: str):
    expr = expr.strip()
    if not expr:
        raise ValueError("Empty expression")
    if not ALLOWED.match(expr):
        raise ValueError("Invalid characters")
    # eval in restricted namespace
    return eval(expr, {"__builtins__": None}, {})

@app.route("/api/calc", methods=["POST"])
def calculate():
    data = request.get_json(force=True)
    expr = data.get("expression", "")
    try:
        result = safe_eval(expr)
        return jsonify({"result": str(result)})
    except ZeroDivisionError:
        return jsonify({"error": "Division by zero"}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception:
        return jsonify({"error": "Invalid expression"}), 400

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})
