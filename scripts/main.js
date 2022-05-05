(function(){
    let calculation = [];
    let currentNum = '';
    let operator = '';
    let result = ''; // show null as zero on calculator screen
    
    const pushNumber = event => calculation.push(event.currentTarget.value);
    const pushOperator = event => calculation.push(event.currentTarget.value);
    const calculate = event => {
        // if number, build current number
        // if operator, stop building number and use existing operator to update result
        // if operator, save new operator value
        // create update function based on result, operator, and current num
        // if clear, set result to null
        
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
                }
                currentNum = '';
                console.log(`operator ${entry}`);
                console.log(`result ${result}`);
            }
        }
        updateResult();
        console.log(`equals ${result}`);
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
            result = currentNum;
        }
        // CHECK FOR NO OTHER INPUTS
    }

    const $numbers = document.querySelectorAll('.number');
    $numbers.forEach(button => button.addEventListener('click',pushNumber));

    const $operator = document.querySelectorAll('.operator, .clear');
    $operator.forEach(button => button.addEventListener('click',pushOperator));

    const $equal = document.querySelector('.equal-sign');
    $equal.addEventListener('click',calculate);

    



})();