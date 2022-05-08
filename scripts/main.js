(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .sci-operator, .clear');
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
    let calculation = [];
    let memory = [0];
    
    const replaceDisplay = item => {
        $screen.value = item.toString();
    }

    const calcStringToNum = () => {
        console.log('start STN');
        console.log(calculation);
        
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
                        newCalculation.push(Number(currentNum),entry);
                    }
                    else {
                        newCalculation[1] = entry;
                    }
                    currentNum = '';
                }
            }
            else {
                newCalculation.push(entry);
            }
        }
        currentNum && newCalculation.length < 3 ? newCalculation.push(Number(currentNum)) : null;
        newCalculation.length === 0 ? newCalculation.push(0) : null;
        newCalculation.length === 2 && newCalculation.every(element => typeof element === 'number') ? newCalculation.shift() : null;
        calculation = newCalculation.slice(0,3);
        input = '';
        console.log('end STN');
        console.log(calculation);
    }

    const pushNumber = event => {
        calculation.push(event.currentTarget.value);
        input += event.currentTarget.value;
        replaceDisplay(input);
    }

    const pushOperator = event => {
        calcStringToNum();
        input = '';
        if (event.currentTarget.value === 'clear') {
            calculation.pop();
            replaceDisplay(0);
            console.log('cleared');
            console.log(calculation);
        } else {
            calculation.length === 3 ? calculate() : null;
            calculation.push(event.currentTarget.value); 
        }
    }

    const pushConstant = event => {
        calculation.push(Math[event.currentTarget.value]);
        replaceDisplay(Math[event.currentTarget.value]);
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
        const modifier = event.currentTarget.value;
        const index = findLastNumberIndex(calculation);
        console.log(index);
        console.log(calculation[index]);

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
        else if (modifier === 'sqaure-root') {
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
        console.log(modifier);
        console.log(calculation);
        return;

        // for (let i = calculation.length - 1; i >= 0; i--) {
        //     if (typeof calculation[i] === 'number') {
        //         if (modifier === 'plus-minus') {
        //             calculation[i] *= -1;
        //         }
        //         else if (modifier === 'percent') {
        //             calculation[i] *= 0.01;
        //         }
        //         else if (modifier === 'sqaure') {
        //             calculation[i] = Math.pow(calculation[i],2);
        //         }
        //         else if (modifier === 'cube') {
        //             calculation[i] = Math.pow(calculation[i],3);
        //         }
        //         else if (modifier === 'sqaure-root') {
        //             calculation[i] = Math.sqrt(calculation[i]);
        //         }
        //         else if (modifier === 'cube-root') {
        //             calculation[i] = Math.cbrt(calculation[i]);
        //         }
        //         else if (modifier === 'log') {
        //             calculation[i] = Math.log10(calculation[i]);
        //         }
        //         else if (modifier === 'ln') {
        //             calculation[i] = Math.log(calculation[i]);
        //         }
        //         else if (modifier === 'sin') {
        //             calculation[i] = Math.sin(calculation[i]);
        //         }
        //         else if (modifier === 'cos') {
        //             calculation[i] = Math.cos(calculation[i]);
        //         }
        //         else if (modifier === 'tan') {
        //             calculation[i] = Math.tan(calculation[i]);
        //         }
        //         else if (modifier === 'sinh') {
        //             calculation[i] = Math.sinh(calculation[i]);
        //         }
        //         else if (modifier === 'cosh') {
        //             calculation[i] = Math.cosh(calculation[i]);
        //         }
        //         else if (modifier === 'tanh') {
        //             calculation[i] = Math.tanh(calculation[i]);
        //         }
        //         replaceDisplay(calculation[i]);
        //         input = '';
        //         console.log(modifier);
        //         console.log(calculation);
        //         return;
        //     }
        // }
    }

    const calculate = () => {
        console.log('start calc');
        console.log(calculation);
        if (calculation.length > 0) {
            [num1,operator,num2] = calculation;

            if (typeof operator === 'number') {
                [operator, num2] = [num2, operator];
                console.log(num2 + ' ' + operator);
            }

            if (!num2) {
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
        console.log('end calc');
        console.log(calculation);
    }

    const equals = () => {
        calcStringToNum();
        calculate();
    }

    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $decimal.addEventListener('click',pushNumber);
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',equals);
    $modifiers.forEach(button => button.addEventListener('click',modifyInput));
    $constants.forEach(button => button.addEventListener('click',pushConstant));

    $memoryAdd.addEventListener('click',() => {
        calcStringToNum();
        memory.push(calculation[0]);
    });
    $memorySubtract.addEventListener('click',() => {
        calcStringToNum();
        memory.push(calculation[0] * -1);
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