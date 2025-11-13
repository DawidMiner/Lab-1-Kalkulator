import pytest
from backend.app import safe_eval, app

def test_safe_eval_simple():
    assert safe_eval("1+2") == 3

def test_safe_eval_complex():
    assert safe_eval("2*(3+4)-5/5") == 13.0

def test_safe_eval_invalid_chars():
    with pytest.raises(ValueError):
        safe_eval("__import__('os').system('ls')")

def test_api_calc(client):
    resp = client.post("/api/calc", json={"expression": "10/2"})
    assert resp.status_code == 200
    assert resp.get_json()["result"] == "5.0"

def test_api_div_zero(client):
    resp = client.post("/api/calc", json={"expression": "1/0"})
    assert resp.status_code == 400
    assert "Division by zero" in resp.get_json().get("error", "")

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as c:
        yield c
