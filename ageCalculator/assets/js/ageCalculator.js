function calculateAge() {
  let inputDay = document.querySelector("#day").value;
  let inputMonth = document.querySelector("#month").value;
  let inputYear = document.querySelector("#year").value;

  inputDay = Number(inputDay);
  inputMonth = Number(inputMonth);
  inputYear = Number(inputYear);

  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDay = today.getDate();

  let age = currentYear - inputYear;
  let months = currentMonth - inputMonth;
  let days = currentDay - inputDay;

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
    months += (months < 0) ? 12 : 0;
  }
  if (days < 0) {
    currentMonth--;
    days = Math.floor((today - new Date(currentYear, currentMonth - 1, 1)) / (1000 * 60 * 60 * 24));
    months = currentMonth - inputMonth;
  }

  document.querySelector(".outputYear").innerText = age;
  document.querySelector(".outputMonth").innerText = months;
  document.querySelector(".outputDays").innerText = days;

  let live = {
    day: inputDay,
    month: inputMonth,
    year: inputYear
  };

  localStorage.setItem('live', JSON.stringify(live));
}

let current = localStorage.getItem('live');
if (current) {
  let live = JSON.parse(current);
  document.querySelector("#day").value = live.day;
  document.querySelector("#month").value = live.month;
  document.querySelector("#year").value = live.year;
  calculateAge(); 
}

document.querySelector(".click").addEventListener("click", calculateAge);
