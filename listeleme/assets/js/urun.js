let productForm = document.querySelector("#productForm");
let resetBtn = document.querySelector("#resetBtn");
let allProducts = document.querySelector("#allProducts");
let categoryProducts = document.querySelector("#categories");
let sonucToplam = document.querySelector("#sonucToplam");
let productList = [];
let editIndex = -1;

if (typeof localStorage.productList !== "undefined") {
  productList = JSON.parse(localStorage.productList);
  renderProductDetails();
}

function handleProductForm(e) {
  e.preventDefault();
  let formData = new FormData(productForm);
  let formObj = Object.fromEntries(formData);
  formObj.price = parseFloat(formObj.price);

  if (editIndex === -1) {
    productList.push(formObj);
  } else {
    productList[editIndex] = formObj;
    editIndex = -1;
  }

  productForm.reset();
  renderProductDetails();
  save();
}

productForm.addEventListener("submit", handleProductForm);

function renderProductDetails() {
  allProducts.innerHTML = '';
  let total = 0;

  for (let i = 0; i < productList.length; i++) {
    total += productList[i].price;
    allProducts.innerHTML += `
      <div class="product-item">
        <div>
          <h4>${productList[i].name}</h4>
          <p>${productList[i].description}</p>
          <p>Fiyat: ${productList[i].price} TL</p>
          <p>Kategori: ${productList[i].category}</p>
          <img src="${productList[i].image}" alt="${productList[i].name}" />
        </div>
        <div class="productEditControls">
          <button class="editBtn" data-index="${i}">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M481 31C445.1-4.8 386.9-4.8 351 31l-15 15L322.9 33C294.8 4.9 249.2 4.9 221.1 33L135 119c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L255 66.9c9.4-9.4 24.6-9.4 33.9 0L302.1 80 186.3 195.7 316.3 325.7 481 161c35.9-35.9 35.9-94.1 0-129.9zM293.7 348.3L163.7 218.3 99.5 282.5c-48 48-80.8 109.2-94.1 175.8l-5 25c-1.6 7.9 .9 16 6.6 21.7s13.8 8.1 21.7 6.6l25-5c66.6-13.3 127.8-46.1 175.8-94.1l64.2-64.2z"/></svg>
          </button>
          <button class="deleteBtn" data-index="${i}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M32 64H12C5.4 64 0 69.4 0 76v12c0 6.6 5.4 12 12 12H32V448c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V100h20c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H416 32zm80 0V44c0-24.3 19.7-44 44-44H292c24.3 0 44 19.7 44 44V64H112zM336 112c6.6 0 12 5.4 12 12V424c0 6.6-5.4 12-12 12s-12-5.4-12-12V124c0-6.6 5.4-12 12-12zM224 112c6.6 0 12 5.4 12 12V424c0 6.6-5.4 12-12 12s-12-5.4-12-12V124c0-6.6 5.4-12 12-12zM112 112c6.6 0 12 5.4 12 12V424c0 6.6-5.4 12-12 12s-12-5.4-12-12V124c0-6.6 5.4-12 12-12z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  sonucToplam.textContent = `${total} TL`;

  attachEventListeners();
  renderCategoryDetails();
}

function attachEventListeners() {
  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      editIndex = e.currentTarget.dataset.index;
      let product = productList[editIndex];
      document.querySelector('#name').value = product.name;
      document.querySelector('#price').value = product.price;
      document.querySelector(`input[name="category"][value="${product.category}"]`).checked = true;
      document.querySelector('#description').value = product.description;
      document.querySelector('#image').value = product.image;
    });
  });

  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      let index = e.currentTarget.dataset.index;
      productList.splice(index, 1);
      if(!confirm('Emin misin?')) {
        return;
    
      }
      renderProductDetails();
      save();
    });
  });
}

function renderCategoryDetails(selectedCategory = null) {
  categoryProducts.innerHTML = '';

  let categories = {};

  for (let i = 0; i < productList.length; i++) {
    let category = productList[i].category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(productList[i]);
  }

  if (selectedCategory) {
    if (categories[selectedCategory]) {
      let productsInCategory = categories[selectedCategory];
      for (let i = 0; i < productsInCategory.length; i++) {
        let product = productsInCategory[i];
        categoryProducts.innerHTML += `
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p>Fiyat: ${product.price} TL</p><br>
          <p>Kategori: ${product.category}</p><br>
          <img src="${product.image}" alt="${product.name}" />
        `;
      }
    } else {
      categoryProducts.innerHTML = 'Bu kategoride ürün yok.';
    }
  } else {
    for (let category of categories) {
      let sectionHTML = `<div><h3>${category}</h3>`;
      for (let i = 0; i < categories[category].length; i++) {
        let product = categories[category][i];
        sectionHTML += `
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p>Fiyat: ${product.price} TL</p><br>
          <img src="${product.image}" alt="${product.name}" />
        `;
      }
      sectionHTML += '</div>';
      categoryProducts.innerHTML += sectionHTML;
    }
  }
}

function save() {
  localStorage.productList = JSON.stringify(productList);
}

resetBtn.addEventListener("click", clear);

function chosenCategory() {
  let selectedCategory = document.querySelector('#categoryOptions input[name="category"]:checked').value;
  renderCategoryDetails(selectedCategory);
}

let categoryRadios = document.querySelectorAll('#categoryOptions input[name="category"]');
for (let i = 0; i < categoryRadios.length; i++) {
  categoryRadios[i].addEventListener('change', chosenCategory);
}

function clear() {
  if(!confirm('Emin misin?')) {
    return;

  }
  localStorage.clear();
  productList = [];
  renderProductDetails();
}
