let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand || '0';
    if (operation != null) {
        let opSymbol = operation;
        if (operation === '*') opSymbol = '×';
        if (operation === '/') opSymbol = '÷';
        previousOperandTextElement.innerText = `${previousOperand} ${opSymbol}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') {
        if (previousOperand !== '') {
            operation = op;
            updateDisplay();
        }
        return;
    }
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current === 0 ? "Error" : prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}
