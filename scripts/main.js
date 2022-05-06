(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');

    let input = '';
    let calculation = [];
    let currentNum = '';
    let operator = '';
    let result = 0;

    const replaceDisplay = string => {
        $screen.value = string;
    }

    const pushNumber = event => {
        calculation.push(event.currentTarget.value);
        input += event.currentTarget.value;
        replaceDisplay(input);
    }

    const pushOperator = event => {
        input = '';
        if (event.currentTarget.value === 'clear') {
            calculation = [];
            replaceDisplay('0');
        } else {
            calculation.push(event.currentTarget.value); 
        }
    }

    const calculate = event => {
        console.log(`start result ${result}`);
        console.log(calculation);
        if (calculation.length === 0) {
            replaceDisplay(result.toString());
            return;
        };
        for (let entry of calculation) {
            if (Number.isInteger(Number(entry))) {
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

        replaceDisplay(result.toString());
        calculation = [];
    }
    
    const updateResult = () => {
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
        // CHECK FOR NO OTHER INPUTS
    }



    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',calculate);


})();