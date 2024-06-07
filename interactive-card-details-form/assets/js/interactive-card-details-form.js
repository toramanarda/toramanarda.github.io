
let cvv = document.querySelector('.cvv');
let cvvInput = document.querySelector('.cvvInput');
let cardNumber = document.querySelector('.cardNumber');
let cardNumberInput = document.querySelector('.cardNumberInput');
let monthInput = document.querySelector('.monthInput');
let yearsInput = document.querySelector('.yearsInput');
let month = document.querySelector('.month');
let years = document.querySelector('.years');
let name = document.querySelector('.name');
let nameInput = document.querySelector('.nameInput');

function handlecardNumberInput() {
  cardNumber.innerText = this.value;
}

cardNumberInput.addEventListener('keyup', handlecardNumberInput);

function handlemonthInput() {
  month.innerText = this.value;
}

function handleyearsInput() {
  years.innerText = this.value;
}

yearsInput.addEventListener('keyup', handleyearsInput);
monthInput.addEventListener('keyup', handlemonthInput);

function handlecvvInput() {
  cvv.innerText = this.value;
}

cvvInput.addEventListener('keyup', handlecvvInput);

function handlecardnameInput() {
  name.innerText = this.value;
}

nameInput.addEventListener('keyup', handlecardnameInput);

let cardArea = document.querySelector('.card-area');
let cardFormArea = document.querySelector('.card-form-area');
let confirmBtn = document.querySelector('.confirm-button');


confirmBtn.addEventListener('click', function (e) {
  e.preventDefault();
  cardFormArea.style.display = 'none';

  let thankYouHTML = `
  <div class="container">
   <div class="thankYou">
        <img src="/assets/img/success.svg" alt="">
        <h1>THANK YOU</h1>
        <p>We’ve added your card details</p>
        <input type="submit" class="continueBtn" value="Continue">
    </div>
  </div>
  
    `;


  cardArea.innerHTML += thankYouHTML;

  let continueBtn = document.querySelector('.continueBtn');


  continueBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.thankYou').remove();
    cardFormArea.style.display = 'block';
  });
});

