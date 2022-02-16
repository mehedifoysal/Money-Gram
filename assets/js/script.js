//money calculation form

document.querySelector('.balance-calculate').addEventListener('submit', function(e) {
    e.preventDefault();

    //income inital value
    let incomeValue = document.getElementById('income').value;

    if(incomeValue !== '') {
        //income
        let income = validateInput('income');

        //expenses
        let expenseForFood = validateInput('expense-for-food');
        let expenseForRent = validateInput('expense-for-rent');
        let expenseForClothes = validateInput('expense-for-clothes');

        //total expenses
        let totalExpensesTag = document.querySelector('#total-expenses span');
        let totalExpenses = parseInt(expenseForFood) + parseInt(expenseForRent) + parseInt(expenseForClothes);

        console.log(totalExpenses);
        console.log(income);

        //remove error message if it exists
        removeErrorMessage('expense-error', true);

        if(income > totalExpenses){
            totalExpensesTag.innerHTML = totalExpenses;
            //balance
            let balanceTag = document.querySelector('#current-balance span');
            let balance = income - totalExpenses;
            balanceTag.innerHTML = balance;
        }else{
            showErrorMessage('expense-error', 'You have to reduce your expenses. Your expenses are higher than your income.', true);
        }


    } else {
        //remove error message p tag
        removeErrorMessage('income');
        showErrorMessage('income', 'Please enter your income first');
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
    let inputValue = document.getElementById(inputIdSelector).value;

    //remove error message p tag
    removeErrorMessage(inputIdSelector);

    //check if input is empty
    if(inputValue === '') {
        inputValue = 0;
    }
    //check if input is a number
    if (!isNaN(inputValue) && inputValue >= 0) {
        return inputValue;
    } else {
        showErrorMessage(inputIdSelector, 'Please enter currect amount');
        return 0;
    }
}

//show error message
function showErrorMessage(IdSelector, errorMessage, insertChild = false) {
    let element = document.getElementById(IdSelector);
    //create error message
    let pTag = document.createElement('p');
    pTag.classList.add('error-message');
    pTag.innerText = errorMessage;
    if (insertChild) {
        element.appendChild(pTag);
    } else {
        element.parentNode.insertBefore(pTag, element.nextSibling);
    }
}

//remove error message
function removeErrorMessage(IdSelector, child = false) {
    let element, errorMessagePTag;
    element = document.getElementById(IdSelector);
    if (child) {
        errorMessagePTag = element.querySelector('p');
        if(errorMessagePTag !== null) {
            element.removeChild(errorMessagePTag);
        }
    } else {
        errorMessagePTag = element.parentNode.querySelector('p');
        if(errorMessagePTag !== null) {
            element.parentNode.removeChild(errorMessagePTag);
        }
    }
}