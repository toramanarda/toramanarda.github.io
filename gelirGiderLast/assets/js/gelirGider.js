let gelirGiderForm = document.querySelector('.gelirgider');
let gelir = document.querySelector('.gelirList');
let gelirToplam = document.querySelector('#gelirToplam');
let gider = document.querySelector('.giderList');
let giderToplam = document.querySelector('#giderToplam');
let sifirla = document.querySelector('.delete');
let karZararToplam = document.querySelector('#karZararToplam');
let gelirAddButton = document.querySelector('.geliradd');
let giderAddButton = document.querySelector('.gideradd');

let modal = document.querySelector('#modal');
let editForm = document.querySelector('#editForm');

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
    gelirListesi.push({ id: generateId(), gelir: gelirMiktari });
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
    giderListesi.push({ id: generateId(), gider: giderMiktari });
    saveGider();
    renderGider();
    calculateTotal();
  }
  gelirGiderForm.reset();
}

gelirAddButton.addEventListener('click', handleGelirForm);

giderAddButton.addEventListener('click', handleGiderForm);

function saveGelir() {
  localStorage.gelirListesi = JSON.stringify(gelirListesi);
}

function saveGider() {
  localStorage.giderListesi = JSON.stringify(giderListesi);
}

function renderGelir() {
  gelir.innerHTML = '';
  let total = 0;
  for (let i = 0; i < gelirListesi.length; i++) {
    let gelirAmount = parseFloat(gelirListesi[i].gelir) || 0;
    gelir.innerHTML += `<div data-id="${gelirListesi[i].id}">
                          <br>${gelirAmount} TL
                          <a href="#" class="gelirEditBtn" data-id="${gelirListesi[i].id}">Düzenle</a>
                          <a href="#" class="gelirDeleteBtn" data-id="${gelirListesi[i].id}">Sil</a>
                        </div>`;
    total += gelirAmount;
  }
  gelirToplam.textContent = total.toFixed(2);
  addGelirEventListeners();
}

function renderGider() {
  gider.innerHTML = '';
  let total = 0;
  for (let i = 0; i < giderListesi.length; i++) {
    let giderAmount = parseFloat(giderListesi[i].gider) || 0;
    gider.innerHTML += `<div data-id="${giderListesi[i].id}">
                          <br>${giderAmount} TL
                          <a href="#" class="giderEditBtn" data-id="${giderListesi[i].id}">Düzenle</a>
                          <a href="#" class="giderDeleteBtn" data-id="${giderListesi[i].id}">Sil</a>
                        </div>`;
    total += giderAmount;
  }
  giderToplam.textContent = total.toFixed(2);
  addGiderEventListeners();
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

  if (karZarar > 0) {
    karZararToplam.style.color = 'green';
    karZararToplam.textContent += ' TL kârdesiniz';
  } else if (karZarar < 0) {
    karZararToplam.style.color = 'red';
    karZararToplam.textContent += ' TL zarardasınız';
  } else {
    karZararToplam.style.color = 'black';
    karZararToplam.textContent += ' TL başa baştasınız';
  }

  localStorage.karZarar = karZarar.toFixed(2);
}

function clearForm(e) {
  e.preventDefault();
  if (confirm('Emin misin?')) {
    localStorage.clear();
    giderListesi = [];
    gelirListesi = [];
    renderGelir();
    renderGider();
    karZararToplam.textContent = '';
  }
}

sifirla.addEventListener('click', clearForm);

function generateId() {
  return Math.floor(Math.random() * 100000);
}

function addGelirEventListeners() {
  document.querySelectorAll('.gelirEditBtn').forEach(btn => {
    btn.addEventListener('click', handleEditGelir);
  });
  document.querySelectorAll('.gelirDeleteBtn').forEach(btn => {
    btn.addEventListener('click', handleDeleteGelir);
  });
}

function addGiderEventListeners() {
  document.querySelectorAll('.giderEditBtn').forEach(btn => {
    btn.addEventListener('click', handleEditGider);
  });
  document.querySelectorAll('.giderDeleteBtn').forEach(btn => {
    btn.addEventListener('click', handleDeleteGider);
  });
}

function handleEditGelir(e) {
  e.preventDefault();
  let id = this.dataset.id;
  let gelirItem = gelirListesi.find(item => item.id == id);
  openModal(gelirItem, 'gelir');
}

function handleDeleteGelir(e) {
  e.preventDefault();
  if (confirm('Emin misin?')) {
    let id = this.dataset.id;
    gelirListesi = gelirListesi.filter(item => item.id != id);
    saveGelir();
    renderGelir();
    calculateTotal();
  }
}

function handleEditGider(e) {
  e.preventDefault();
  let id = this.dataset.id;
  let giderItem = giderListesi.find(item => item.id == id);
  openModal(giderItem, 'gider');
}

function handleDeleteGider(e) {
  e.preventDefault();
  if (confirm('Emin misin?')) {
    let id = this.dataset.id;
    giderListesi = giderListesi.filter(item => item.id != id);
    saveGider();
    renderGider();
    calculateTotal();
  }
}

function openModal(item, type) {
  modal.showModal();
  if (type === 'gelir') {
    document.querySelector('.modalAddNew').style.display = 'none';
    document.querySelector('.modalEdit').style.display = 'block';
    document.querySelector('.modalGiderAddNew').style.display = 'none';
    document.querySelector('.modalGiderEdit').style.display = 'none';
    document.querySelector('.modelAddNew').style.display = 'none';
    document.querySelector('.modelEdit').style.display = 'inline-block';
    document.querySelector('.modelGiderAddNew').style.display = 'none';
    document.querySelector('.modelGiderEdit').style.display = 'none';
    document.querySelector('input[name="amount"]').value = item.gelir;
  } else {
    document.querySelector('.modalAddNew').style.display = 'none';
    document.querySelector('.modalEdit').style.display = 'none';
    document.querySelector('.modalGiderAddNew').style.display = 'none';
    document.querySelector('.modalGiderEdit').style.display = 'block';
    document.querySelector('.modelAddNew').style.display = 'none';
    document.querySelector('.modelEdit').style.display = 'none';
    document.querySelector('.modelGiderAddNew').style.display = 'none';
    document.querySelector('.modelGiderEdit').style.display = 'inline-block';
    document.querySelector('input[name="amount"]').value = item.gider;
  }
  document.querySelector('input[name="id"]').value = item.id;
}

editForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let id = document.querySelector('input[name="id"]').value;
  let amount = parseFloat(document.querySelector('input[name="amount"]').value);
  let itemIndex = gelirListesi.findIndex(item => item.id == id);
  if (itemIndex !== -1) {
    gelirListesi[itemIndex].gelir = amount;
    saveGelir();
    renderGelir();
    calculateTotal();
  } else {
    itemIndex = giderListesi.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
      giderListesi[itemIndex].gider = amount;
      saveGider();
      renderGider();
      calculateTotal();
    }
  }
  modal.close();
});

calculateTotal();
