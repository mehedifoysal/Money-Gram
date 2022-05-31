/*
* Balance calculate
*/
const balanceCalculate = (e) => {
    e.preventDefault();

    //income initial value
    let incomeValue = document.getElementById('income').value;

    if (incomeValue !== '') {
        //income
        let income = validateInput('income');

        //expenses
        let expenseForFood = validateInput('expense-for-food');
        let expenseForRent = validateInput('expense-for-rent');
        let expenseForClothes = validateInput('expense-for-clothes');

        //total expenses
        let totalExpensesTag = document.querySelector('#total-expenses span');
        let totalExpenses = parseInt(expenseForFood) + parseInt(expenseForRent) + parseInt(expenseForClothes);

        //remove error message if it exists
        removeErrorMessage('expense-error', true);

        if (income > 0) {
            if (income > totalExpenses) {
                totalExpensesTag.innerHTML = totalExpenses;
                //balance
                let balanceTag = document.querySelector('#current-balance span');
                let balance = income - totalExpenses;
                balanceTag.innerHTML = balance;
            } else {
                showErrorMessage('expense-error', 'You have to reduce your expenses. Your expenses are higher than your income.', true);
            }
        }

    } else {
        removeErrorMessage('income');
        showErrorMessage('income', 'Please enter your income first');
    }
}
document.querySelector('.balance-calculate').addEventListener('submit', balanceCalculate);
document.querySelector('.balance-calculate').addEventListener('change', balanceCalculate);
document.querySelector('.balance-calculate').addEventListener('keyup', balanceCalculate);


/*
* Save balance calculate
*/
const savePercentage = (e) => {
    e.preventDefault();

    //income initial value
    let incomeValue = document.getElementById('income').value;
    if (incomeValue !== '') {

        //income
        let income = validateInput('income');
        let savingPercentage = document.getElementById('saving-percentage').value;
        removeErrorMessage('saving-error', true);

        if (savingPercentage !== '') {
            let currentBalanceTag = document.querySelector('#current-balance span');
            let currentBalance = parseInt(currentBalanceTag.innerHTML);
            savingPercentage = validateInput('saving-percentage');

            if (savingPercentage > 100) {
                showErrorMessage('saving-error', 'You can save up to 100% of your income.', true);
            } else if (savingPercentage >= 0) {
                //calculate savings
                let savings = income * savingPercentage / 100;
                let savingAmountTag = document.querySelector('#saving-amount span');
                savingAmountTag.innerHTML = savings;

                //remaining balance
                let remainingBalanceTag = document.querySelector('#remaining-balance span');
                if (currentBalance >= savings) {
                    let remainingBalance = currentBalance - savings;
                    remainingBalanceTag.innerHTML = remainingBalance;
                } else {
                    showErrorMessage('saving-error', 'Your current balance is low. You can\'t save ' + savingPercentage + '% of your income', true);
                }

            }
        } else {
            removeErrorMessage('saving-error', true);
            showErrorMessage('saving-error', 'Please enter your saving percentage', true);
        }
    } else {
        removeErrorMessage('income');
        showErrorMessage('income', 'Please enter your income first');
    }
}
document.querySelector('.save-balance-form').addEventListener('submit', savePercentage);
document.querySelector('.save-balance-form').addEventListener('change', savePercentage);
document.querySelector('.save-balance-form').addEventListener('keyup', savePercentage);

//input validation
function validateInput(inputIdSelector) {
    let inputValue = document.getElementById(inputIdSelector).value;

    if (inputIdSelector === 'saving-percentage') {
        inputIdSelector = 'saving-error';
    }

    //remove error message p tag
    removeErrorMessage(inputIdSelector);

    //check if input is empty
    if (inputValue === '') {
        inputValue = 0;
    }

    //check input value
    if (inputValue < 0) {
        showErrorMessage(inputIdSelector, 'Please enter a positive number.');
    } else if (!isNaN(inputValue) && inputValue >= 0) {
        return inputValue;
    } else {
        showErrorMessage(inputIdSelector, 'Please enter a number.');
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

    //insert error message
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
        if (errorMessagePTag !== null) {
            element.removeChild(errorMessagePTag);
        }
    } else {
        errorMessagePTag = element.parentNode.querySelector('p');
        if (errorMessagePTag !== null) {
            element.parentNode.removeChild(errorMessagePTag);
        }
    }
}