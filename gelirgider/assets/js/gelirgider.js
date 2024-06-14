let gelirGiderForm = document.querySelector('.gelirgider');
let gelir = document.querySelector('.gelirList');
let gelirToplam = document.getElementById('gelirToplam');
let gider = document.querySelector('.giderList');
let giderToplam = document.getElementById('giderToplam');
let sifirla = document.querySelector('.delete');
let karZararToplam = document.getElementById('karZararToplam');
let gelirAddButton = document.querySelector('.geliradd');
let giderAddButton = document.querySelector('.gideradd');

let gelirListesi = [];
let giderListesi = [];

if (typeof localStorage.gelirListesi !== 'undefined') {
  gelirListesi = JSON.parse(localStorage.gelirListesi);
  renderGelir();
}

if (typeof localStorage.giderListesi !== 'undefined') {
  giderListesi = JSON.parse(localStorage.giderListesi);
  renderGider();
}

function handleGelirForm(e) {
  e.preventDefault();
  let formData = new FormData(gelirGiderForm);
  let gelirMiktari = parseFloat(formData.get('gelir')) || 0;
  if (gelirMiktari > 0) {
    gelirListesi.push({ gelir: gelirMiktari });
    saveGelir();
    renderGelir();
    calculateTotal();
  }
  gelirGiderForm.reset();
}

function handleGiderForm(e) {
  e.preventDefault();
  let formData = new FormData(gelirGiderForm);
  let giderMiktari = parseFloat(formData.get('gider')) || 0;
  if (giderMiktari > 0) {
    giderListesi.push({ gider: giderMiktari });
    saveGider();
    renderGider();
    calculateTotal();
  }
  gelirGiderForm.reset();
}

gelirAddButton.addEventListener('click', handleGelirForm);
giderAddButton.addEventListener('click', handleGiderForm);

function saveGelir() {
  localStorage.setItem('gelirListesi', JSON.stringify(gelirListesi));
}

function saveGider() {
  localStorage.setItem('giderListesi', JSON.stringify(giderListesi));
}

function renderGelir() {
  gelir.innerHTML = '';
  let total = 0;
  for (let i = 0; i < gelirListesi.length; i++) {
    let gelirAmount = parseFloat(gelirListesi[i].gelir) || 0;
    gelir.innerHTML += `<br>${gelirAmount}`;
    total += gelirAmount;
  }
  gelirToplam = total.toFixed(2);
}

function renderGider() {
  gider.innerHTML = '';
  let total = 0;
  for (let i = 0; i < giderListesi.length; i++) {
    let giderAmount = parseFloat(giderListesi[i].gider) || 0;
    gider.innerHTML += `<br>${giderAmount}`;
    total += giderAmount;
  }
  giderToplam = total.toFixed(2);
}

function calculateTotal() {
  let gelirTotal = 0;
  let giderTotal = 0;

  for (let i = 0; i < gelirListesi.length; i++) {
    gelirTotal += parseFloat(gelirListesi[i].gelir) || 0;
  }

  for (let i = 0; i < giderListesi.length; i++) {
    giderTotal += parseFloat(giderListesi[i].gider) || 0;
  }

  let karZarar = gelirTotal - giderTotal;
  karZararToplam.textContent = karZarar.toFixed(2);
  localStorage.karZarar, karZarar.toFixed(2);
}

function clearForm(e) {
  e.preventDefault();
  localStorage.clear();
  giderListesi = [];
  gelirListesi = [];
  renderGelir();
  renderGider();
  karZararToplam.textContent = '';
}

sifirla.addEventListener('click', clearForm);

calculateTotal();
