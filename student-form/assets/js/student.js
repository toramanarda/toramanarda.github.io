let contactForm = document.querySelector('.contact-form');
let students = document.querySelector('.students');
let studentList = [];

if(typeof localStorage.studentList !== 'undefined') {
    studentList = JSON.parse(localStorage.studentList);
    renderStudents();
}

function handleFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData(contactForm); //ezberle
    let formObj = Object.fromEntries(formData); // ezberle
    studentList.push(formObj); // buraya neden gönderdiğimizi anlatacağım
    contactForm.reset();

    save();
    renderStudents();
}
contactForm.addEventListener('submit', handleFormSubmit);

function save() {
    localStorage.studentList = JSON.stringify(studentList);
}

function renderStudents() {
    students.innerHTML = '';
    for(let i = 0; i < studentList.length; i++) {
        students.innerHTML += `<div class="student">
      <h5><a href="mailto:${studentList[i].email}">${studentList[i].name}</a></h5>
      <h6>${studentList[i].age} - ${studentList[i].gender}</h6>
    </div>`;
    }
}

