let electronicProducts = [
    {
        name: "iPhone 14",
        stock: 25,
        origin: "USA",
        price: "$999",
        category: "Smartphone",
        icon: "📱"
    },
    {
        name: "Samsung Galaxy S22",
        stock: 30,
        origin: "South Korea",
        price: "$899",
        category: "Smartphone",
        icon: "📱"
    },
    {
        name: "MacBook Pro",
        stock: 15,
        origin: "USA",
        price: "$1999",
        category: "Laptop",
        icon: "💻"
    },
    {
        name: "Dell XPS 13",
        stock: 20,
        origin: "USA",
        price: "$1299",
        category: "Laptop",
        icon: "💻"
    },
    {
        name: "Sony WH-1000XM4",
        stock: 40,
        origin: "Japan",
        price: "$349",
        category: "Headphones",
        icon: "🎧"
    },
    {
        name: "Apple Watch Series 7",
        stock: 35,
        origin: "USA",
        price: "$399",
        category: "Smartwatch",
        icon: "⌚"
    },
    {
        name: "iPad Pro",
        stock: 25,
        origin: "USA",
        price: "$1099",
        category: "Tablet",
        icon: "📱"
    },
    {
        name: "Amazon Echo Dot",
        stock: 50,
        origin: "USA",
        price: "$49",
        category: "Smart Speaker",
        icon: "🔊"
    },
    {
        name: "Google Nest Hub",
        stock: 40,
        origin: "USA",
        price: "$89",
        category: "Smart Display",
        icon: "🖥️"
    },
    {
        name: "PlayStation 5",
        stock: 10,
        origin: "Japan",
        price: "$499",
        category: "Gaming Console",
        icon: "🎮"
    },
    {
        name: "Xbox Series X",
        stock: 12,
        origin: "USA",
        price: "$499",
        category: "Gaming Console",
        icon: "🎮"
    },
    {
        name: "Nikon D850",
        stock: 8,
        origin: "Japan",
        price: "$2999",
        category: "Camera",
        icon: "📷"
    },
    {
        name: "Canon EOS R5",
        stock: 7,
        origin: "Japan",
        price: "$3899",
        category: "Camera",
        icon: "📷"
    },
    {
        name: "LG OLED TV",
        stock: 18,
        origin: "South Korea",
        price: "$1299",
        category: "Television",
        icon: "📺"
    },
    {
        name: "Samsung QLED TV",
        stock: 20,
        origin: "South Korea",
        price: "$1499",
        category: "Television",
        icon: "📺"
    },
    {
        name: "Apple AirPods Pro",
        stock: 50,
        origin: "USA",
        price: "$249",
        category: "Earbuds",
        icon: "🎧"
    },
    {
        name: "Bose QuietComfort Earbuds",
        stock: 45,
        origin: "USA",
        price: "$279",
        category: "Earbuds",
        icon: "🎧"
    },
    {
        name: "Fitbit Charge 5",
        stock: 30,
        origin: "USA",
        price: "$149",
        category: "Fitness Tracker",
        icon: "📟"
    },
    {
        name: "GoPro Hero 9",
        stock: 15,
        origin: "USA",
        price: "$399",
        category: "Action Camera",
        icon: "📹"
    },
    {
        name: "DJI Mavic Air 2",
        stock: 10,
        origin: "China",
        price: "$799",
        category: "Drone",
        icon: "🚁"
    }
  ];

let sales = [];
  
function createProductHtml(product) {
  return `<li>
    <label>
      <input ${product.stock < 1 ? 'disabled' : ''} required type="radio" name="selectedProduct" value="${product.name}:${product.id}"> (${product.stock}) ${product.icon} ${product.name} ${product.origin} ${product.category} - ${product.price} 
    </label>
  </li>`;
}


function renderProducts() {
  productList.innerHTML = electronicProducts.map(x => createProductHtml(x)).join('');
}

function handleSalesForm(e) {
  e.preventDefault();
  let formData = new FormData(salesForm);
  let formObj = Object.fromEntries(formData);

  if(!formObj.selectedProduct) {
    alert('Ürün seçilmedi!');
    return;
  }

  let productName = formObj.selectedProduct.split(':')[0]; 
  let product = electronicProducts.find(x => x.name === productName);
  
  if(!product) {
    alert('Seçili ürün bulunamadı!');
    return;
  }

  if(product.stock < 0) {
    alert('Bu üründe yeterli stok yok!');
    return;
  }
  
  product.stock--;

  sales.push({
    name: product.name,
    price: parseFloat(product.price.replace('$', '').replace(',', ''))
  });

  calculateSalesTotal();

  salesForm.reset();
  renderProducts();
}

function calculateSalesTotal() {
  salesTotal.innerText = sales.reduce((total, current) => total + current.price, 0).toFixed(2);
}


function handlePaymentTypeClick() {
  switch (this.value) {
    case '1':
        paidTotalInput.disabled = true;
        paidTotalInput.required = false;
        paidTotalInput.value = '';
      break;
    case '2':
        paidTotalInput.disabled = false;
        paidTotalInput.required = true;
        paidTotalInput.focus();
      break;
  }
}

function bindSalesFormEvents() {
  salesForm.addEventListener('submit', handleSalesForm);
  let paymentTypeSelectors = document.querySelectorAll('input[name="paymentType"]');
  paymentTypeSelectors.forEach(x => x.addEventListener('click', handlePaymentTypeClick));
}

function handleNewProduct(e) {
  e.preventDefault();
  let formData = new FormData(newProductForm);
  let formObj = Object.fromEntries(formData);
  formObj.id = crypto.randomUUID();
  formObj.price = Number(formObj.price);
  formObj.stock = Number(formObj.stock);
  electronicProducts.push(formObj);
  newProductForm.reset();
  renderProducts();
}

function handleEditProduct(e) {
  e.preventDefault();
  let formData = new FormData(editProductForm);
  let formObj = Object.fromEntries(formData);

  formObj.price = Number(formObj.price);
  formObj.stock = Number(formObj.stock);

  let product = electronicProducts.find(x => x.name === formObj.name);
  if(product) {
    product.icon = formObj.icon
    product.price = formObj.price
    product.stock = formObj.stock
    product.origin = formObj.origin
    product.category = formObj.category
  } else {
    alert('Bu isimde bir ürün bulunmamaktadır. Kontrol edip tekrar deneyiniz.');
  }

  editProductForm.reset();
  renderProducts();
}

function handleDeleteProduct(e) {
  e.preventDefault();
  let formData = new FormData(editProductForm);
  let formObj = Object.fromEntries(formData);

  let productIndex = electronicProducts.findIndex(x => x.name === formObj.name);
  if (productIndex > -1) {
    electronicProducts.splice(productIndex, 1);
  } else {
    alert('Bu isimde bir ürün bulunmamaktadır. Kontrol edip tekrar deneyiniz.');
  }

  editProductForm.reset();
  renderProducts();
}

function bindEditorEvents() {
  newProductForm.addEventListener('submit', handleNewProduct);
  editProductForm.addEventListener('submit', handleEditProduct);
  document.querySelector('#deleteBtn').addEventListener('click', handleDeleteProduct);
}


function bindNewProductFormEvents() {
  newProductForm.addEventListener('submit', handleNewProduct);
}

function init() {
  renderProducts();
  bindSalesFormEvents();
  bindEditorEvents();
}

init();