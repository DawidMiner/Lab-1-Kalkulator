function appendNumber(num) {
    const display = document.getElementById('display');
    display.value += num;
}

function appendOperator(op) {
    const display = document.getElementById('display');
    display.value += op;
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Błąd';
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}
