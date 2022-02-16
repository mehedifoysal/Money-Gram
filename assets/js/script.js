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
    let inputValue = document.getElementById(inputIdSelector).value;
    if(inputValue === '') {
        inputValue = 0;
    }
    if (!isNaN(inputValue) && inputValue >= 0) {
        return inputValue;
    } else {
        alert('Please enter a valid number');
        return false;
    }
}