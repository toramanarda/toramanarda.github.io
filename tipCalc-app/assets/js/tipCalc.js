let customerPay = document.querySelector(".bill input");
let btns = document.querySelectorAll(".select-tip button");
let tipCustom = document.querySelector(".customTips");
let numberPeople = document.querySelector(".selectPeople");
let tipAmount = document.querySelector(".amountTip");
let total = document.querySelector(".totalTip");
let reset = document.querySelector(".resetBtn");
let customform = document.querySelector(".customform");
let billAlert = document.querySelector(".billAlert");
let personAlert = document.querySelector(".personAlert");

let tip = 0;
let totaltip = 0;
let peopletip = 0;
let totalpaytip = 0;
let totalpeopletip = 0;

function handleTipClick() {
  tip = parseInt(this.innerText);
  totaltip = (customerPay.value * tip) / 100;
  totalpaytip = Number(customerPay.value) + totaltip;
  totalpeopletip = totalpaytip / numberPeople.value;
  total.innerText = "₺" + totalpeopletip.toFixed(2);
  peopletip = totaltip / numberPeople.value;
  tipAmount.innerText = "₺" + peopletip.toFixed(2);

  if (customerPay.value === "") {
    billAlert.innerText = "Cannot be zero";
    customerPay.style.border = "2px solid rgba(225, 116, 87, 1)";
  } else {
    billAlert.innerText = "";
    customerPay.style.border = "transparent";
  }
  if (numberPeople.value === "") {
    personAlert.innerText = "Cannot be zero";
    numberPeople.style.border = "2px solid rgba(225, 116, 87, 1)";
  } else {
    personAlert.innerText = "";
    numberPeople.style.border = "transparent";
  }

  if (total.innerText !== "₺0.00") {
    reset.style.background = "rgba(38, 194, 174, 1)";
  }

  return tip = 0;
}

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", handleTipClick);
}

let tipCustomtotal = 0;
let peoplecustomtip = 0;

function handleCustomClick(e) {
  e.preventDefault();
  tipCustomtotal = (customerPay.value * tipCustom.value) / 100;
  totalpaytip = Number(customerPay.value) + tipCustomtotal;
  totalpeopletip = totalpaytip / numberPeople.value;
  total.innerText = "₺" + totalpeopletip;
  peoplecustomtip = tipCustomtotal / numberPeople.value;
  tipAmount.innerText = "₺" + peoplecustomtip;

  if (customerPay.value === " ") {
    billAlert.innerText = "Cannot be zero";
    customerPay.style.border = "2px solid rgba(225, 116, 87, 1)";
  } else {
    billAlert.innerText = "";
    customerPay.style.border = "transparent";
  }
  if (numberPeople.value === "") {
    personAlert.innerText = "Cannot be zero";
    numberPeople.style.border = "2px solid rgba(225, 116, 87, 1)";
  } else {
    personAlert.innerText = "";
    numberPeople.style.border = "transparent";
  }

  if (total.innerText !== "₺0.00") {
    reset.style.background = "rgba(38, 194, 174, 1)";
  }
}

customform.addEventListener("submit", handleCustomClick);

function handleResetClick() {
  customerPay.value = "";
  tipCustom.value = "";
  total.innerText = "₺0.00";
  numberPeople.value = "";
  tipAmount.innerText = "₺0.00";
  reset.style.background = "rgba(13, 104, 109, 1)";
}

reset.addEventListener("click", handleResetClick);
