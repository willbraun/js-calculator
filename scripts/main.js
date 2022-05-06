(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');
    const $plusMinus = document.querySelector('.plus-minus');
    const $percent = document.querySelector('.percent');

    let input = '';
    let calculation = [];
    let currentNum = '';
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
        input = '';
        if (event.currentTarget.value === 'clear') {
            calculation = calculation.filter(element => !Number.isInteger(Number(element)));
            replaceDisplay(0);
        } else {
            if (calculation.some(element => Number.isInteger(Number(element)))) {
                calculate();
            }
            calculation.push(event.currentTarget.value); 
        }
    }

    const flipSign = () => {
        if (input) {
            input = (Number(input) * -1).toString();
            replaceDisplay(input);
            calculation.push('flip');
        }
        else {
            result *= -1;
            replaceDisplay(result);
        }
    }

    const pushPercent = () => {
        // if you have an input, multiply that by 0.01
        // push *, then push 0.01 to the calculation array
        // if you don't have an input, multiply result by 0.01

        
        replaceDisplay(result);
    }

    // Calculate always runs on equals, and runs on operator clicks only if numbers have been entered
    // Calculate can accept an array of no values, just numbers, just operators, or operators and then numbers
    // Calculate of just numbers will create a currentNum, set it to result, and display result
    // Calculate of array starting with operators will store final operator for use on later currentNum from numbers in array
    // When an operator appears, update and display result value then clear currentNum

    const calculate = event => {
        console.log(`start result ${result}`);
        console.log(calculation);

        if (calculation.length === 0) {
            replaceDisplay(result);
            return;
        };
        for (let entry of calculation) {
            if (entry === 'flip') {
                currentNum = (Number(currentNum) * -1).toString();
            }
            else if (Number.isInteger(Number(entry))) {
                currentNum += entry;
                console.log(`currentNum ${currentNum}`);
            } else {
                updateResult();
                operator = entry;
                console.log(`operator ${entry}`);
            }
            console.log(`result ${result}`);
        }
        updateResult();
        console.log(`equals ${result}`);

        replaceDisplay(result);
        calculation = [];
        operator = '';
        input = '';
    }
    
    const updateResult = () => {
        if (!currentNum) {
            currentNum = result.toString();
        }

        if (operator === '+') {
            result += Number(currentNum);
        }
        else if (operator === '-') {
            result -= Number(currentNum);
        }
        else if (operator === '*') {
            result *= Number(currentNum);
        }
        else if (operator === '/') {
            result /= Number(currentNum);
        }
        else if (operator === '') {
            result = Number(currentNum);
        }
        currentNum = '';
    }

    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',calculate);
    $plusMinus.addEventListener('click',flipSign);
    $percent.addEventListener('click',pushPercent);

    
})();