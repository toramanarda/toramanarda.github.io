let contactForm = document.querySelector('.contact-form');
let print = document.querySelector('.print');
let clear = document.querySelector('.clear');
let adresDefteriList = [];

if (typeof localStorage.adresDefteriList !== 'undefined') {
  adresDefteriList = JSON.parse(localStorage.adresDefteriList);
  renderList();
};

function handleFormSubmit(e) {
  e.preventDefault(); 
  let formData = new FormData(contactForm); 
  let formObj = Object.fromEntries(formData); 
  adresDefteriList.push(formObj); 
  contactForm.reset(); 
  renderList(); 
  save();
}

contactForm.addEventListener('submit', handleFormSubmit);

function renderList() {
  print.innerHTML = ''; 
  for (let i = 0; i < adresDefteriList.length; i++) {
    print.innerHTML +=
    `<div class="person">
    <h1> Ad: ${adresDefteriList[i].ad} </h1>
    <h1> Soyad: ${adresDefteriList[i].soyad} </h1>
    <h1> Telefon Numarası: ${adresDefteriList[i].phone} </h1>
    <h1> Adres: ${adresDefteriList[i].message} </h1>
    </div>`
  }
};

function save () {
  localStorage.adresDefteriList = JSON.stringify(adresDefteriList); // iletisim listesini JSON methodu ile json a dönüştürdük daha sonrada localstorageye adresDefteriList adı altında kayıt ettik.
};
//render düzenleme yapılacak yeri ifade ediyor

function clearList() {
  localStorage.clear(); //localstorageyi sıfırlar
  adresDefteriList = [];
  renderList();
}

clear.addEventListener('click', clearList);