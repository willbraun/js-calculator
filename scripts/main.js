(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');
    const $plusMinus = document.querySelector('.plus-minus');
    const $percent = document.querySelector('.percent');
    const $decimal = document.querySelector('.decimal');

    let input = '';
    let calculation = [];
    
    const replaceDisplay = item => {
        $screen.value = item.toString();
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
        currentNum ? newCalculation.push(Number(currentNum)) : null;
        calculation = newCalculation;
        console.log('end STN');
        console.log(calculation);
    }

    const flipSign = () => {
        calcStringToNum();
        for (let i = calculation.length - 1; i >= 0; i--) {
            if (typeof calculation[i] === 'number') {
                calculation[i] *= -1;
                replaceDisplay(calculation[i]);
                console.log('flip');
                console.log(calculation);
                return;
            }
        }
    }

    const pushPercent = () => {
        calcStringToNum();
        for (let i = calculation.length - 1; i >= 0; i--) {
            if (typeof calculation[i] === 'number') {
                calculation[i] *= 0.01;
                replaceDisplay(calculation[i]);
                console.log('%');
                console.log(calculation);
                return;
            }
        }
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

    const equals = () => {
        calcStringToNum();
        calculate();
    }

    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $decimal.addEventListener('click',pushNumber);
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',equals);
    $plusMinus.addEventListener('click',flipSign);
    $percent.addEventListener('click',pushPercent);

})();