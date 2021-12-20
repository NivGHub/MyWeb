//Creating state using object
//State to be saved in Local storage
var state = {
    
    balance: 0,
    income: 0,
    expense: 0,

    //Creating arrway for transaction history data
    transactions: []
}

//Creating variable for the "My Balance" amount
var balanceEl = document.querySelector('#balance');

//Creating variable for the "My Income" amount
var incomeEl = document.querySelector('#income');

//Creating variable for the "My Expense" amount
var expenseE1 = document.querySelector ('#expense');

//Creating variable for the transaction history elements
var transactionsEl = document.querySelector('#transaction');

//Creating variable for the add income and add expense button in the add new transaction section
var incomeBtnEl = document.querySelector('#incomeBtn');
var expenseBtnEl = document.querySelector('#expenseBtn');

//Creating variable for the input name and input transaction section in the add new transaction section
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');



//Creating function to populate the hard coded values in the html section
function init() {

    //To retrieve the data from the local storage, retrieve the state using the getItem function
    //Using JSON.parse to convert a string to an object
    var localState = JSON.parse(localStorage.getItem('expenseTrackerProState'));

    //If statement to check if we have a state
    if (localState !== null) {
        state = localState;
    }

    //Creating the calculations for the transactions
    updateState();

    //Calling the render function
    initListeners(); 

    // updateChart();
    

}


//Creating random identifier function
function uniqueId() {

    //Need to put math.round for whole number
    return Math.round(Math.random() * 1000000);
}

//Creating function for the initListeners()
//Event listener can then be called to listen on clicks function
//Referring to click function of the add income and add expense button
function initListeners() {

    //Listening for the income
    incomeBtnEl.addEventListener('click', onAddIncomeClick);

    //Listening for the expense
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}

//Creating function for the add income and add expense listeners
function onAddIncomeClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, 'income');
    
}

function addTransaction(name, amount, type) {
    var name = nameInputEl.value;
    var amount = amountInputEl.value;

    //Creating if statement for the add income to accept pass value only, not blanks
    if (name !== '' && amount !== '') {

        //Creating variable for the transactions
        var transaction = {

            //Add the id to the transaction, created in delete button section
            id: uniqueId(),
            name: name,

            //Using the parse int as amount will contain integers
            amount: parseInt(amount), 
            type: type
        };

    //Testing add income button: OK
    //console.log('income', nameInputEl.value, amountInputEl.value);

        //To add new record to the transaction in the state variable, access state
        state.transactions.push(transaction);

        //console.log(state);

        //Calling the updateState function to update the transactions records
        updateState();

    //Creating a window alert which shall pop up if user do not input a value in the add new transaction section
    } else {
        alert('Please fill in the blanks to record transactions');
    }

    //To clear the value in the input box after recording the transactions details
    nameInputEl.value = '';
    amountInputEl.value = '';
}
//Creating function for the add income and add expense listeners
function onAddExpenseClick() {
    
    //console.log('expense');
    //Configuring the add expense button to record expense in transactions
    addTransaction(nameInputEl.value, amountInputEl.value, 'expense');
}

//Creating function for the click delete button
function onDeleteClick(event) {

    //Binding id to the delete button
    //Using the parseInt as id is integer
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;

    //debugger;

    //Loop through all the transactions in the state to check if id is matching
    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id ===id) {

            //Collecting the index which is stored in the variable deleteIndex
            deleteIndex = i;
            break;
            
        }
    }
        //Using splice function to remove a particular transaction
        state.transactions.splice(deleteIndex, 1);

        //Calling the updateState function for the user inferface to re render
        updateState();    

}

//Creating function update state to loop through all the transactions on the state variable to populate the values in balance, income, expense and transaction history
function updateState() {

    //Creating variables for balance, income and expense
    var balance = 0,
        income = 0,
        expense = 0,
        item;

    //Creating for loop
    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        //Creating if statement for the transactions

        //If income amount is inputted, income value will be incremented
        if (item.type === 'income') {
            income += item.amount;

          //If expense amount is inputted, expense value will be incremented
        } else if (item.type === 'expense') {
            expense += item.amount;
        }

        //Creating the calculations for the balance section (Income subtract expense)
        balance = income - expense;

        // Testing
        // console.log(balance, income, expense);

        //To update values in the state, hence income, expense and balance will sync together
        state.balance = balance;
        state.income = income;
        state.expense = expense;

        //*****Persisting data to the Local Storage*****
        //Creating setItem function to store value
        //Using JSON.stringigy function to convert an object to string
        //Data will be stored in the key named 'expenseTrackerProState'
        localStorage.setItem('expenseTrackerProState', JSON.stringify(state))

        //Calling the render function to call the user interface after updating the state
        render();

    }

}

//Creating render function to be called in the init function after calculating the values in the state
//User Interface function
function render() {
        //Creating the console.log for testing
        //console.log('init');

        //Assigning the value to the "My balance" section and linking it to state
        //Using backtick "``" to easily combine string and variable, ${} must be used inside the backticks
        balanceEl.innerHTML = `Rs${state.balance}`;
        incomeEl.innerHTML = `Rs${state.income}`;
        expenseE1.innerHTML = `Rs${state.expense}`;

        //Creating the variables for the for loop
        //Creating the container element to add div to add delete button in the transaction history
        //Creating the amount element variable
        //Creating the item variable to assign the state.transaction
        //Creating the variable for the delete button element in the transaction history
        var transactionEl, containerEl, amountEl, item, btnEl;

        //Clearing old transactions element to be able to add new transactions
        transactionsEl.innerHTML = '';

        //Creating a for loop, to loop through all the transactions Array
        for (var i = 0; i < state.transactions.length; i++) {
            item = state.transactions[i]

            //Creating the li element using the "createElement" function (HTML Element)
            transactionEl = document.createElement('li');

            //Appending the transactions string
            transactionEl.append(item.name);

            //Appending the li element to the transaction element
            transactionsEl.appendChild(transactionEl);

            //Creating the div element
            containerEl = document.createElement('div');

            //Creating the span element for the amount
            amountEl = document.createElement('span');

            //Creating if condition for class income-amt and expense-amt
            if (item.type === 'income') {
                amountEl.classList.add('income-amount');
            } else if (item.type === 'expense') {
                amountEl.classList.add('expense-amount');
            }
            //Targetting the amount text in transactions
            amountEl.innerHTML = `Rs${item.amount}`;

            //Appending the span to the div element
            containerEl.appendChild(amountEl);

            //Creating the button element
            btnEl = document.createElement('button');

            //Setting attribute to the delete button
            btnEl.setAttribute('data-id', item.id);
            btnEl.innerHTML = 'Delete';

            //Creating event listener to activate the delete button on click
            btnEl.addEventListener('click', onDeleteClick);
            
            //Apending the button element to the container div element
            containerEl.appendChild(btnEl);
            

            //Appending the container element to the transaction element
            transactionEl.appendChild(containerEl);     
                
    }
    
}


init();