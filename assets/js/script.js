//money calculation form

document.querySelector('.balance-calculate').addEventListener('submit', function(e) {
    e.preventDefault();

    //income
    let income = document.getElementById('income').value;

    //expenses
    let expenseForFood = validateInput('expense-for-food');
    let expenseForRent = validateInput('expense-for-rent');
    let expenseForClothes = validateInput('expense-for-clothes');

    //total expenses
    let totalExpenses = parseInt(expenseForFood) + parseInt(expenseForRent) + parseInt(expenseForClothes);

    console.log(expenseForFood);

});

//input validation
function validateInput(inputIdSelector) {
    let input = document.getElementById(inputIdSelector);
    let inputValue = document.getElementById(inputIdSelector).value;

    //remove error message
    input.parentNode.removeChild('p');

    //check if input is empty
    if(inputValue === '') {
        inputValue = 0;
    }
    //check if input is a number
    if (!isNaN(inputValue) && inputValue >= 0) {
        return inputValue;
    } else {
        showErrorMessage(inputIdSelector, 'Please enter a valid number');
        return false;
    }
}

//show error message
function showErrorMessage(inputIdSelector, errorMessage) {
    let input = document.getElementById(inputIdSelector);
    let pTag = document.createElement('p');
    pTag.classList.add('error-message');
    pTag.innerText = errorMessage;
    input.parentNode.insertBefore(pTag, input.nextSibling);
}