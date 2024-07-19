let modalBtn = document.querySelector('#addBtn');
let modal = document.querySelector('#modal');
let modalList = document.querySelector('#modalList');
const productList = document.querySelector('.productList');
const cart = document.querySelector('#cart');

let products = [];
let basketProducts = [];


function createProductHtml(image, name,id, category, price) {
 return ` 
  <div  class="dessert">
    <img src="${image}">
    <button data-id="${id}" id="addProduct"> <img id="shoppingBag" src="/dessert/assets/img/shopping.svg" alt="">  Add to Cart</button>
    <div class="info"><p>${category}</p><h3>${name}</h3><h4>$${price}</h4></div>
  </div>`;
    }

function render() {
  productList.innerHTML = products.map(
    x => createProductHtml(
      x.image.desktop, 
      x.name,
      x.id,
      x.category,
      x.price 
    )).join('');
    document.querySelectorAll("#addProduct").forEach((x) => x.addEventListener('click',addProductBasket));
}

function addProductBasket(e) {
 e.preventDefault();

let productId =Number(this.dataset.id);
let product =products.find(x => x.id === productId);
let basketItem =basketProducts.find(x => x.id === productId);

if(basketItem) {
  basketProducts.map(x => {
    if(basketItem.id === x.id){
      x.quantity++
    }
  })
}else{
  basketProducts.push(
    { 
    id : product.id,
    name : product.name,
    price : product.price,
    category : product.category,
    quantity : 1 ,
    image:product.image
    }
  );
}
renderBasket();
}

function createBasketHtml(name,quantity,price,id) {
  return `
<div class="productBasketBox">
  <div class="basket">
    <div class="productBox">
      <h3>${name}</h3>
      <h4>${quantity}x <span>@ $${price}<span>$${quantity*price}</span></span></h4>
    </div>
    <a data-id="${id}" class="deleteBtn" href="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z" fill="#AD8A85"/><path d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z" fill="#AD8A85"/></svg></a>
  </div>
</div>`;
}

function handleDeleteBtn(e){
  e.preventDefault();

  basketProducts = basketProducts.filter(x => x.id !== Number(this.dataset.id));
  renderBasket();
}

function renderBasket() {
  cart.innerHTML = basketProducts.map(x => createBasketHtml(
    x.name,
    x.quantity,
    x.price, 
    x.id
  )).join('');
   
    document.querySelectorAll(".deleteBtn").forEach((x) => x.addEventListener('click',handleDeleteBtn));   
    modalBtn.addEventListener('click',handleModalClick);
    calculateSalesTotal();
    quantityTotal.innerText = calculateQuantityTotal();
  };
  
function handleModalClick() {
  modalList.innerHTML = basketProducts.map(x => createOrderHtml(
    x.image.thumbnail,
    x.name,
    x.quantity,
    x.price, 
    x.id
    )).join('');
        
modal.showModal();

}

function calculateSalesTotal() {

  let total=0;
  for (let i =0; i < basketProducts.length; i++ ){
    total += Number(basketProducts[i].price)*Number(basketProducts[i].quantity);
  }
  salesTotal.innerHTML =`$`+ total;
  orderSalesTotal.innerHTML =`$`+total;
}

function calculateQuantityTotal() {

  let total=0;
  for (let i =0; i < basketProducts.length; i++ ){
    total += Number(basketProducts[i].quantity);
  }
  return total;
}

function createOrderHtml(image,name,quantity,price) {
  return `
<div class="productBasketBox">
  <div class="basket">
  <img  src="${image}" >
  <div class="productBox">
    <h3>${name}</h3>
    <h4>${quantity}x <span>@ $${price}</span></h4>
  </div>
  <h4>$${quantity*price}</h4>
</div>
</div>`;
}

resetBtn.addEventListener('click',handleConfirmClick);

function handleConfirmClick() {
  modal.close();
  basketProducts = [];
  renderBasket();
}

function init() {
  fetch('https://dummyjson.czaylabs.com.tr/api/products')
    .then(res => res.json())
    .then(res => {
      products = res.data;
      render();
      
    });
};

init();


