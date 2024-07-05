let countries = [
  {
      countryName: "Turkey",
      population: 84200000,
      flag: "🇹🇷",
      famousFood: "Kebab",
      capitalCity: "Ankara"
  },
  {
      countryName: "Italy",
      population: 60480000,
      flag: "🇮🇹",
      famousFood: "Pizza",
      capitalCity: "Rome"
  },
  {
      countryName: "Japan",
      population: 125800000,
      flag: "🇯🇵",
      famousFood: "Sushi",
      capitalCity: "Tokyo"
  },
  {
      countryName: "Brazil",
      population: 212600000,
      flag: "🇧🇷",
      famousFood: "Feijoada",
      capitalCity: "Brasilia"
  },
  {
      countryName: "India",
      population: 1393000000,
      flag: "🇮🇳",
      famousFood: "Curry",
      capitalCity: "New Delhi"
  },
  {
      countryName: "France",
      population: 65270000,
      flag: "🇫🇷",
      famousFood: "Baguette",
      capitalCity: "Paris"
  },
  {
      countryName: "Mexico",
      population: 126000000,
      flag: "🇲🇽",
      famousFood: "Tacos",
      capitalCity: "Mexico City"
  },
  {
      countryName: "China",
      population: 1441000000,
      flag: "🇨🇳",
      famousFood: "Peking Duck",
      capitalCity: "Beijing"
  },
  {
      countryName: "Greece",
      population: 10420000,
      flag: "🇬🇷",
      famousFood: "Moussaka",
      capitalCity: "Athens"
  },
  {
      countryName: "Spain",
      population: 47350000,
      flag: "🇪🇸",
      famousFood: "Paella",
      capitalCity: "Madrid"
  },
  {
      countryName: "Germany",
      population: 83100000,
      flag: "🇩🇪",
      famousFood: "Bratwurst",
      capitalCity: "Berlin"
  },
  {
      countryName: "United States",
      population: 331900000,
      flag: "🇺🇸",
      famousFood: "Burger",
      capitalCity: "Washington, D.C."
  },
  {
      countryName: "South Korea",
      population: 51840000,
      flag: "🇰🇷",
      famousFood: "Kimchi",
      capitalCity: "Seoul"
  },
  {
      countryName: "Egypt",
      population: 104100000,
      flag: "🇪🇬",
      famousFood: "Koshary",
      capitalCity: "Cairo"
  },
  {
      countryName: "Russia",
      population: 145900000,
      flag: "🇷🇺",
      famousFood: "Borscht",
      capitalCity: "Moscow"
  },
  {
      countryName: "Australia",
      population: 25690000,
      flag: "🇦🇺",
      famousFood: "Vegemite",
      capitalCity: "Canberra"
  },
  {
      countryName: "Thailand",
      population: 69790000,
      flag: "🇹🇭",
      famousFood: "Pad Thai",
      capitalCity: "Bangkok"
  },
  {
      countryName: "Argentina",
      population: 45380000,
      flag: "🇦🇷",
      famousFood: "Asado",
      capitalCity: "Buenos Aires"
  },
  {
      countryName: "Canada",
      population: 38000000,
      flag: "🇨🇦",
      famousFood: "Poutine",
      capitalCity: "Ottawa"
  },
  {
      countryName: "South Africa",
      population: 59310000,
      flag: "🇿🇦",
      famousFood: "Biltong",
      capitalCity: "Pretoria"
  }
];


function createCountryHtml(country) {
  return `<li>
  <label>
  <input required type="text" name="inputCountries" value="${country.countryName}"> (${country.flag}) ${country.countryName} ${country.population} ${country.famousFood} ${country.capitalCity}
  </label>
  </li>`
}

function renderCountries() {
  let countryList = document.querySelector('#countryList');
  countryList.innerHTML = countries.map(x => createCountryHtml(x)).join('');
}

function handleNewCountry(e) {
  e.preventDefault();

  let formData = new FormData(document.querySelector('#newCountryForm'));
  let formObj = Object.fromEntries(formData);

  formObj.id = countries.length + 1;
  formObj.countryName = formObj.name; 
  formObj.population = Number(formObj.population);
  
  countries.push(formObj);
  renderCountries();

  document.querySelector('#newCountryForm').reset();
}



function handleEditCountry(e) {
  e.preventDefault();
  let formData = new FormData(document.querySelector('#editCountryForm'));
  let formObj = Object.fromEntries(formData);

  formObj.population = Number(formObj.population);

  let country = countries.find(x => x.countryName === formObj.name);
  if(country) {
    country.flag = formObj.flag
    country.population = formObj.population
    country.capitalCity = formObj.capitalCity
    country.famousFood = formObj.famousFood
  } else {
    alert('Bu isimde bir ülke bulunmamaktadır.Kontrol edip tekrar deneyiniz.');
  }

  renderCountries();
}

function handleDeleteCountry(e) {
  e.preventDefault();
  let formData = new FormData(document.querySelector('#editCountryForm'));
  let formObj = Object.fromEntries(formData);

  let countryIndex = countries.findIndex(x => x.countryName === formObj.name);
  if (countryIndex > -1) {
    countries.splice(countryIndex, 1);
    renderCountries(); 
  } else {
    alert('Bu isimde bir ülke bulunmamaktadır. Kontrol edip tekrar deneyiniz.');
  }

  document.querySelector('#editCountryForm').reset(); 
}

function bindEditorEventes() {
  document.querySelector('#newCountryForm').addEventListener('submit', handleNewCountry);
  document.querySelector('#editCountryForm').addEventListener('submit', handleEditCountry);
  document.querySelector('#deleteBtn').addEventListener('click', handleDeleteCountry);
}

function init() {
  renderCountries();
  bindEditorEventes();
}



init();