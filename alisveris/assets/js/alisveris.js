let productForm = document.querySelector(".productForm");
let products = document.querySelector(".products");
let cartArea = document.querySelector(".total-amount");
let urunListesi = [];
let urunListesiSepet = [];


if (localStorage.urunListesi) {
  urunListesi = JSON.parse(localStorage.urunListesi);
  renderUrunDetay();
}

if (localStorage.urunListesiSepet) {
  urunListesiSepet = JSON.parse(localStorage.urunListesiSepet);
  renderSepetTotal();
}

function handleProductForm(e) {
  e.preventDefault();
  let formData = new FormData(productForm);
  let formObj = Object.fromEntries(formData);
  urunListesi.push(formObj);
  saveToLocal();
  renderUrunDetay();
  productForm.reset();
}

productForm.addEventListener("submit", handleProductForm);

function saveToLocal() {
  localStorage.urunListesi = JSON.stringify(urunListesi);
}

function renderUrunDetay() {
  products.innerHTML = "";
  for (let i = 0; i < urunListesi.length; i++) {
    let urunHTML = `
      <div class="urunList">
        <h4><strong>${urunListesi[i].name} / ${urunListesi[i].category}</strong></h4>
        <p><strong>Renk:</strong> ${urunListesi[i].color}</p>
        <p><strong>Fiyat:</strong> ${urunListesi[i].price} TL</p>
        <button class="secim">Sepete Ekle</button>
      </div>
    `;
    products.innerHTML += urunHTML;
  }

  let sepeteEkleButtons = document.querySelectorAll('.secim');
  for (let i = 0; i < sepeteEkleButtons.length; i++) {
    sepeteEkleButtons[i].addEventListener('click', function () {
      handleSepeteEkle(i);
    });
  }
}

function handleSepeteEkle(i) {
  let selectedProduct = urunListesi[i];
  urunListesiSepet.push(selectedProduct);
  saveToSepet();
  renderSepetTotal();
}

function saveToSepet() {
  localStorage.urunListesiSepet = JSON.stringify(urunListesiSepet);
}

function renderSepetTotal() {
  cartArea.textContent = "";
  let total = 0;
  for (let i = 0; i < urunListesiSepet.length; i++) {
    let sepetHTML = `
      <div class="added">
        <h4><strong>${urunListesiSepet[i].name} / ${urunListesiSepet[i].category}</strong></h4>
        <p><strong>Renk:</strong> ${urunListesiSepet[i].color}</p>
        <p><strong>Fiyat:</strong> ${urunListesiSepet[i].price} TL</p>
      </div>
    `;
    cartArea.innerHTML += sepetHTML;
    total += parseFloat(urunListesiSepet[i].price);
  }
  cartArea.innerHTML += `<div class="totalPrice"><strong>Toplam Tutar: ${total.toFixed(2)} TL</strong></div>`;
}