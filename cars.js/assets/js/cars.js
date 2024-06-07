let cars = [
  {
    brand: "Ford",
    model: "Mustang",
    color: "Mavi"
  },
  {
    brand: "BMW",
    model: "3 Serisi",
    color: "Siyah"
  },
  {
    brand: "Mercedes-Benz",
    model: "E Serisi",
    color: "Kırmızı"
  },
  {
    brand: "Toyota",
    model: "Corolla",
    color: "Beyaz"
  },
  {
    brand: "Honda",
    model: "Civic",
    color: "Gri"
  },
  {
    brand: "Volkswagen",
    model: "Golf",
    color: "Yeşil"
  },
  {
    brand: "Audi",
    model: "A4",
    color: "Turuncu"
  },
  {
    brand: "Porsche",
    model: "911",
    color: "Sarı"
  },
  {
    brand: "Ferrari",
    model: "488 GTB",
    color: "Lacivert"
  },
  {
    brand: "Lamborghini",
    model: "Aventador",
    color: "Altın"
  },
  {
    brand: "Tesla",
    model: "Model S",
    color: "Gümüş"
  },
  {
    brand: "Subaru",
    model: "Impreza",
    color: "Mor"
  },
  {
    brand: "Chevrolet",
    model: "Camaro",
    color: "Turkuaz"
  },
  {
    brand: "Hyundai",
    model: "Tucson",
    color: "Kahverengi"
  },
  {
    brand: "Kia",
    model: "Sportage",
    color: "Pembe"
  },
  {
    brand: "Nissan",
    model: "Altima",
    color: "Beyaz"
  },
  {
    brand: "Jaguar",
    model: "F-Type",
    color: "Siyah"
  },
  {
    brand: "Land Rover",
    model: "Range Rover",
    color: "Gri"
  },
  {
    brand: "Volvo",
    model: "XC90",
    color: "Yeşil"
  },
  {
    brand: "Mazda",
    model: "MX-5",
    color: "Kırmızı"
  }
];

let tabloBody = document.querySelector(".arac-tablosu tbody");
let tabloHTML = '';

for (let i = 0; i < cars.length; i++) {
  let arac = cars[i];
  tabloHTML += '<tr>';
  tabloHTML += '<td>' + (i + 1) + '</td>';
  tabloHTML += '<td>' + arac.brand + '</td>';
  tabloHTML += '<td>' + arac.model + '</td>';
  tabloHTML += '<td>' + arac.color + '</td>';
  tabloHTML += '</tr>';
}

tabloBody.innerHTML = tabloHTML;