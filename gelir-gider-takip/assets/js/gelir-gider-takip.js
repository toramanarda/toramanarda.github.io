let incomeExpense = document.querySelector('income-expense');
let incomeList = document.querySelector('income-list');
let totalIncome = document.querySelector('total-income');
let expense = document.querySelector('expense');
let expenseList = document.querySelector('expense-list');
let totalExpense = document.querySelector('total-expense');
let total = document.querySelector('total');
let clear = document.querySelector('.clear');
let incomeExpenseList = [];


function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(incomeExpense);
  let formObj = Object.fromEntries(formData);
  incomeExpenseList.push(formObj);
  renderList();
  save();
}

incomeExpense.addEventListener('submit', handleFormSubmit);

function renderList() {
  incomeExpense.innerHTML = '';
  for(let i = 0; i < incomeExpenseList.length; i++) {
    incomeExpense.innerText += 
    `
    <h3>${incomeExpenseList[i].amount} tutarında ${incomeExpenseList[i].description} geliri eklendi. </h3>
    `
  }
};

function save() {
  localStorage.incomeExpenseList = JSON.stringify(incomeExpenseList);
};

function clearList() {
  localStorage.clear(); //localstorageyi sıfırlar
  incomeExpenseList = [];
  renderList();
}