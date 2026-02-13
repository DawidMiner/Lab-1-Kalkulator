import os
import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

base_dir = os.path.dirname(os.path.abspath(__file__))
frontend_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend'))

app = Flask(__name__,
            static_folder=os.path.join(frontend_dir, 'static'),
            static_url_path='/static')
CORS(app)

ALLOWED = re.compile(r'^[0-9+\-*/().\s]+$')

def safe_eval(expr: str):
    expr = expr.strip()
    if not expr:
        raise ValueError("Empty expression")
    if not ALLOWED.match(expr):
        raise ValueError("Invalid characters")
    return eval(expr, {"__builtins__": None}, {})


@app.route("/")
def index():
    return send_from_directory(frontend_dir, 'index.html')


@app.route("/api/calc", methods=["POST"])
@app.route("/api/calc/", methods=["POST"])
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)