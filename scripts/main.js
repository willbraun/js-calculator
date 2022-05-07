(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');
    const $plusMinus = document.querySelector('.plus-minus');
    const $percent = document.querySelector('.percent');

    let input = '';
    let calculation = [];
    let operator = '';
    let result = 0;

    const replaceDisplay = item => {
        $screen.value = parseFloat(Number(item).toPrecision(7)).toString();
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

    const calcStringToNum = () => {
        console.log('start STN');
        console.log(calculation);
        
        let currentNum = '';
        let newCalculation = [];
        for (let entry of calculation) {
            if (typeof entry === 'string') {
                if (Number.isInteger(Number(entry))) {
                    currentNum += entry;
                }
                else {
                    if (currentNum) {
                        newCalculation = [];
                        newCalculation.push(Number(currentNum),entry);
                    }
                    else {
                        // multiple operators in a row
                        newCalculation[1] = entry;
                    }
                    currentNum = '';
                }
            }
            else {
                newCalculation.push(entry);
            }
        }
        currentNum ? newCalculation.push(Number(currentNum)) : null;
        calculation = newCalculation;
        console.log('end STN');
        console.log(calculation);
    }

    const equals = () => {
        calcStringToNum();
        calculate();
    }

    const flipSign = () => {
        calcStringToNum();
        
        
        // if (input) {
        //     input = (Number(input) * -1).toString();
        //     replaceDisplay(input);
        //     calculation.push('flip');
        // }
        // else {
        //     result *= -1;
        //     replaceDisplay(result);
        // }
    }

    const pushPercent = () => {
        // if you have an input, multiply that by 0.01
        // push *, then push 0.01 to the calculation array
        // if you don't have an input, multiply result by 0.01

        
        replaceDisplay(result);
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
            else if (!operator) {
                num1 = num2;
            }
        }
        else {
            num1 = 0;
        }
        
        replaceDisplay(num1);
        calculation = [num1];
        input = '';
        console.log('end calc');
        console.log(calculation);
    }

    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',equals);
    $plusMinus.addEventListener('click',flipSign);
    $percent.addEventListener('click',pushPercent);

    
})();