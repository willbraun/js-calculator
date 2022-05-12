(function(){

    'use strict';

    const $numbers = document.querySelectorAll('.number');
    const $operators = document.querySelectorAll('.operator, .sci-operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');
    const $decimal = document.querySelector('.decimal');
    const $modifiers = document.querySelectorAll('.modifier');
    const $constants = document.querySelectorAll('.pi, .e');
    const $memoryAdd = document.querySelector('.madd');
    const $memorySubtract = document.querySelector('.msubtract');
    const $memoryRecall = document.querySelector('.mrecall');
    const $memoryClear = document.querySelector('.mclear');

    let input = '';
    let calculation = [0];
    let memory = [0];
    
    const replaceDisplay = item => {
        if (!Number.isFinite(Number(item))) {
            $screen.value = 'Not a number';
        }
        else {
            $screen.value = item.toString();
        }
    }

    const toNumberSafe = item => {
        if (item === '.') {
            return 0;
        }
        else {
            return Number(item);
        }  
    }

    const calcStringToNum = () => {
        let currentNum = '';
        let newCalculation = [];
        for (let entry of calculation) {
            if (typeof entry === 'string') {
                if (Number.isInteger(Number(entry)) || entry === '.') {
                    currentNum += entry;
                }
                else {
                    if (currentNum) {
                        newCalculation = [];
                        newCalculation.push(toNumberSafe(currentNum),entry);
                    }
                    else {
                        newCalculation[1] = entry;
                    }
                    currentNum = '';
                }
            }
            else {
                newCalculation.push(toNumberSafe(entry));
            }
        }
        currentNum && newCalculation.length < 3 ? newCalculation.push(toNumberSafe(currentNum)) : null;
        newCalculation.length === 0 ? newCalculation.push(0) : null;
        newCalculation.length === 2 && newCalculation.every(element => typeof element === 'number') ? newCalculation.shift() : null;
        calculation = newCalculation.slice(0,3);
        input = '';
    }

    const pushNumber = event => {
        const val = event.target.value;
        if ($screen.value === '0' && val === '0') return;
        if ($screen.value.includes('.') && val === '.') return;
        calculation.push(val);
        input += val;
        input === '.' ? input = '0.' : null;
        replaceDisplay(input);
    }

    const pushOperator = event => {
        calcStringToNum();
        input = '';
        if (event.target.value === 'clear') {
            calculation.pop();
            replaceDisplay(0);
        } else {
            calculation.length === 3 ? calculate() : null;
            calculation.push(event.target.value); 
        }
    }

    const pushConstant = event => {
        calculation.push(Math[event.target.value]);
        replaceDisplay(Math[event.target.value]);
    }

    const findLastNumberIndex = array => {
        for (let i = calculation.length - 1; i >= 0; i--) {
            if (typeof calculation[i] === 'number') {
                return i;
            }
        }
    }

    const modifyInput = event => {
        calcStringToNum();
        const modifier = event.target.value;
        const index = findLastNumberIndex(calculation);

        if (modifier === 'plus-minus') {
            calculation[index] *= -1;
        }
        else if (modifier === 'percent') {
            calculation[index] *= 0.01;
        }
        else if (modifier === 'square') {
            calculation[index] = Math.pow(calculation[index],2);
        }
        else if (modifier === 'cube') {
            calculation[index] = Math.pow(calculation[index],3);
        }
        else if (modifier === 'square-root') {
            calculation[index] = Math.sqrt(calculation[index]);
        }
        else if (modifier === 'cube-root') {
            calculation[index] = Math.cbrt(calculation[index]);
        }
        else if (modifier === 'log') {
            calculation[index] = Math.log10(calculation[index]);
        }
        else if (modifier === 'ln') {
            calculation[index] = Math.log(calculation[index]);
        }
        else if (modifier === 'sin') {
            calculation[index] = Math.sin(calculation[index]);
        }
        else if (modifier === 'cos') {
            calculation[index] = Math.cos(calculation[index]);
        }
        else if (modifier === 'tan') {
            calculation[index] = Math.tan(calculation[index]);
        }
        else if (modifier === 'sinh') {
            calculation[index] = Math.sinh(calculation[index]);
        }
        else if (modifier === 'cosh') {
            calculation[index] = Math.cosh(calculation[index]);
        }
        else if (modifier === 'tanh') {
            calculation[index] = Math.tanh(calculation[index]);
        }
        replaceDisplay(calculation[index]);
        input = '';
        return;
    }

    const calculate = () => {
        let num1, operator, num2;

        if (calculation.length > 0) {
            [num1,operator,num2] = calculation;

            if (typeof operator === 'number') {
                [operator, num2] = [num2, operator];
            }

            if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
                operator = '';
            }

            if (!num2 && num2 !== 0) {
                num2 = num1;
            }

            if (operator === '+') {
                num1 += num2;
            }
            else if (operator === '-') {
                num1 -= num2;
            }
            else if (operator === '*') {
                num1 *= num2;
            }
            else if (operator === '/') {
                num1 /= num2;
            }
            else if (operator === 'exponent') {
                num1 = Math.pow(num1,num2);
            }
            else if (operator === 'root') {
                num1 = Math.pow(num1,(1/num2));
            }
            else if (!operator) {
                num1 = num2;
            }
        }
        else {
            num1 = 0;
        }
        replaceDisplay(num1);
        calculation = [num1];
    }

    const equals = () => {
        calcStringToNum();
        calculate();
    }

    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $decimal.addEventListener('click',pushNumber);
    $operators.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',equals);
    $modifiers.forEach(button => button.addEventListener('click',modifyInput));
    $constants.forEach(button => button.addEventListener('click',pushConstant));

    $memoryAdd.addEventListener('click',() => {
        calcStringToNum();
        memory.push(calculation[findLastNumberIndex(calculation)]);
    });
    $memorySubtract.addEventListener('click',() => {
        calcStringToNum();
        memory.push(calculation[findLastNumberIndex(calculation)] * -1);
    });
    $memoryRecall.addEventListener('click',() => {
        const recall = memory.reduce((a,b) => a + b);
        replaceDisplay(recall);
        calculation = [recall];
    });
    $memoryClear.addEventListener('click',() => {
        memory = [0];
    });

})();