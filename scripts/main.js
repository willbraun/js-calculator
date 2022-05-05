(function(){
    const $numbers = document.querySelectorAll('.number');
    const $operator = document.querySelectorAll('.operator, .clear');
    const $equal = document.querySelector('.equal-sign');
    const $screen = document.querySelector('.calculator-screen');

    let newDisplay = true;
    let calculation = [];
    let currentNum = '';
    let operator = '';
    let result = ''; // show '' as zero on calculator screen

    const updateDisplay = string => {
        if (newDisplay) {
            $screen.value = string;
            newDisplay = false;
        } else {
            $screen.value += string;
        }
    }

    const pushNumber = event => {
        calculation.push(event.currentTarget.value);
        updateDisplay(event.currentTarget.value);
    }
    const pushOperator = event => {
        calculation.push(event.currentTarget.value);
        newDisplay = true;
    }

    const calculate = event => {
        for (let entry of calculation) {
            if (Number(entry)) {
                currentNum += entry;
                console.log(`currentNum ${currentNum}`);
            }
            else {
                if (entry === 'clear') {
                    result = '';
                    operator = '';
                }
                else {
                    updateResult();
                    operator = entry;
                    newDisplay = true;
                }
                currentNum = '';
                console.log(`operator ${entry}`);
                console.log(`result ${result}`);
            }
        }
        updateResult();
        console.log(`equals ${result}`);
        $screen.value = result.toString();
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
        // CHECK FOR NO OTHER INPUTS
    }



    $numbers.forEach(button => button.addEventListener('click',pushNumber));
    $operator.forEach(button => button.addEventListener('click',pushOperator));
    $equal.addEventListener('click',calculate);


    



})();