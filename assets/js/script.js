//money calculation form

document.querySelector('.balance-calculate').addEventListener('submit', function(e) {
    e.preventDefault();

    //income
    let income = validateInput('income');

    if(income > 0){
        //expenses
        let expenseForFood = validateInput('expense-for-food');
        let expenseForRent = validateInput('expense-for-rent');
        let expenseForClothes = validateInput('expense-for-clothes');

        //total expenses
        let totalExpensesTag = document.querySelector('#total-expenses span');
        let totalExpenses = parseInt(expenseForFood) + parseInt(expenseForRent) + parseInt(expenseForClothes);
        totalExpensesTag.innerHTML = totalExpenses;

        //balance
        let balanceTag = document.querySelector('#current-balance span');
        let balance = income - totalExpenses;
        balanceTag.innerHTML = balance;
    } else {
        alert('Please enter a valid income');
    }


});

document.querySelector('.save-balance-form').addEventListener('submit', function(e) {
    e.preventDefault();

    //income
    let income = validateInput('income');
    let saveBalance = document.getElementById('save-balance').value;
    let currentBalanceTag = document.querySelector('#current-balance span');
    let currentBalance = parseInt(currentBalanceTag.innerHTML);

    //calculate savings
    let savings = income * saveBalance / 100;
    let savingAmountTag = document.querySelector('#saving-amount span');
    savingAmountTag.innerHTML = savings;

    //remaining balance
    let remainingBalanceTag = document.querySelector('#remaining-balance span');
    let remainingBalance = currentBalance - savings;
    remainingBalanceTag.innerHTML = remainingBalance;

});

//input validation
function validateInput(inputIdSelector) {
    let input = document.getElementById(inputIdSelector);
    let inputValue = document.getElementById(inputIdSelector).value;

    //remove error message p tag
    errorMessagePTag = input.parentNode.querySelector('p');
    if(errorMessagePTag !== null) {
        input.parentNode.removeChild(errorMessagePTag);
    }

    //check if input is empty
    if(inputValue === '') {
        inputValue = 0;
    }
    //check if input is a number
    if (!isNaN(inputValue) && inputValue >= 0) {
        return inputValue;
    } else {
        showErrorMessage(inputIdSelector, 'Please enter a valid number');
        return 0;
    }
}

//show error message
function showErrorMessage(inputIdSelector, errorMessage) {
    let input = document.getElementById(inputIdSelector);
    //create error message
    let pTag = document.createElement('p');
    pTag.classList.add('error-message');
    pTag.innerText = errorMessage;
    input.parentNode.insertBefore(pTag, input.nextSibling);
}