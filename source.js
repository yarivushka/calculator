/////////////////////////////////////////////////////////////////////
//operation funcions
function add (a, b) {
    return a + b;
};
function subtract (a, b) {
    return a - b;
};
function multiply (a, b) {
    return a * b;
};
function divide (a, b) {
    return a / b;
};
function operate(a, b, operator){
    switch (operator) {
        case '+':
            return add(a ,b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);;
        case '/':
            return divide(a, b);
    }
};
///////////////////////////////////////////////////////////

function displayLimit() {
    if (rowData.length > 11) {
        return false;
    }
}
function isOperator (sign) {
    if (!bufferValue.textContent.match(/[/+*=-]/)) {
        return true;
    }
}
function holdData (sign) {
    if (isOperator(sign)){
        dataBank['a'] = Number(rowData);
        dataBank['operator']  = sign;
        displayValue.textContent = '';
        bufferValue.textContent += sign;
        rowData = '';
    } else {
        dataBank['a'] = Number(displayValue.textContent);
        dataBank['operator'] = sign;
        bufferValue.textContent = displayValue.textContent + sign;
        displayValue.textContent = '';
    }
}

function calculateResult(){
    dataBank['b'] = Number(rowData);
    result = operate(dataBank['a'], dataBank['b'], dataBank['operator']).toString();
    displayValue.textContent = result.slice(0, 12);
    bufferValue.textContent += '=\n' + result.slice(0, 12);
    dataBank = {};
    rowData = '';
}

function keyFunction(e) {
    if (e.key === undefined) {
        e.key = this.id
    }
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            if (bufferValue.textContent.match(/[=]/)){
                bufferValue.textContent = '';
            }
            if (displayLimit() !== false) {
                bufferValue.textContent += e.key;
                rowData += e.key;
                displayValue.textContent = rowData;
            }
            break;
        case 'Escape':
            bufferValue.textContent = '';
            rowData = '';
            displayValue.textContent = '_';
            break;
        case '-':
            holdData('-');
            break;
        case '*':
            holdData('*');
            break;
        case '+':
            holdData('+')
            break;
        case '/':
            holdData('/');
            break;
        case '=':
        case 'Enter':
            if (rowData != '' && bufferValue.textContent.match(/[/+*-]/) && !bufferValue.textContent.includes('=')) {
                calculateResult();
            } else{
                return false;
            }break;
        case 'Backspace':
            if(!bufferValue.textContent.includes('=')) {
                if(bufferValue.textContent.charAt(bufferValue.textContent.length -1).match(/[/+*-]/)) {
                    rowData = bufferValue.textContent;
                    displayValue.textContent = rowData;
                    console.log(rowData);
                }
                rowData = rowData.slice(0, -1);
                displayValue.textContent = displayValue.textContent.slice(0, -1);
                bufferValue.textContent = bufferValue.textContent.slice(0, -1);
            } else {
                return false;
            }
            break;
    }};

const display = document.querySelector('.display');
const displayValue = document.querySelector('.displayValue');
displayValue.textContent = '_';
const bufferValue = document.querySelector('.bufferValue');
bufferValue.textContent = '';
let rowData = '';
let dataBank = {};
let result;
document.addEventListener('keydown', keyFunction)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', keyFunction));