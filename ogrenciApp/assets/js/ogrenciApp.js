let students = [];
let id = 0;

if (localStorage.students) {
  students = JSON.parse(localStorage.students);
  renderStudents();
}

if (localStorage.id) {
  id = Number(localStorage.id);
}

function generateId() {
  id++;
  localStorage.id = id;
  return id;
}

function save() {
  localStorage.students = JSON.stringify(students);
}

function renderStudents() {
  let allStudentsContainer = document.querySelector('#allStudents');
  let sectionsContainer = document.querySelector('#sections');

  allStudentsContainer.innerHTML = '';
  sectionsContainer.innerHTML = '';

  let sections = {};

  students.forEach(student => {
    let studentHTML = `
      <div class="student">
        <h4>${student.name} ${student.lastname}</h4>
        <p>Bölüm: ${student.section}</p>
        <p>Ortalama Not: ${student.grade}</p>
        <p>Başarı Durumu: ${student.status}</p>
        <a href="#" class="editStudentBtn" data-studentid="${student.id}">Düzenle</a>
        <a href="#" class="deleteStudentBtn" data-studentid="${student.id}">Sil</a>
      </div>
    `;
    allStudentsContainer.innerHTML += studentHTML;

    if (!sections[student.section]) {
      sections[student.section] = [];
    }
    sections[student.section].push(studentHTML);
  });

  for (let section in sections) {
    let sectionHTML = `<div><h3>${section}</h3>${sections[section].join('')}</div>`;
    sectionsContainer.innerHTML += sectionHTML;
  }

  document.querySelectorAll('.editStudentBtn').forEach(btn => btn.addEventListener('click', handleEditBtn));
  document.querySelectorAll('.deleteStudentBtn').forEach(btn => btn.addEventListener('click', handleDeleteBtn));
}

document.querySelector('#addStudentBtn').addEventListener('click', () => {
  modal.classList.remove('editModal');
  document.querySelector('input[name="id"]').value = "";
  modal.showModal();
});

document.querySelector('#studentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = new FormData(e.target);
  let formObj = Object.fromEntries(formData);
  e.target.reset();

  formObj.midterm1 = parseFloat(formObj.midterm1);
  formObj.midterm2 = parseFloat(formObj.midterm2);
  formObj.final = parseFloat(formObj.final);
  formObj.grade = (formObj.midterm1 * 0.4 + formObj.midterm2 * 0.4 + formObj.final * 0.6).toFixed(2);

  if (formObj.grade >= 90) formObj.status = 'AA Başarılı';
  else if (formObj.grade >= 85) formObj.status = 'BA Başarılı';
  else if (formObj.grade >= 80) formObj.status = 'BB Başarılı';
  else if (formObj.grade >= 75) formObj.status = 'CB Geçer';
  else if (formObj.grade >= 70) formObj.status = 'CC Geçer';
  else if (formObj.grade >= 65) formObj.status = 'DC Koşullu Geçer';
  else if (formObj.grade >= 60) formObj.status = 'DD Koşullu Geçer';
  else if (formObj.grade >= 50) formObj.status = 'FD Başarısız - Kalır';
  else formObj.status = 'FF Başarısız - Kalır';

  if (formObj.id !== '') {
    let student = students.find(x => x.id === Number(formObj.id));
    student.name = formObj.name;
    student.lastname = formObj.lastname;
    student.section = formObj.section;
    student.midterm1 = formObj.midterm1;
    student.midterm2 = formObj.midterm2;
    student.final = formObj.final;
    student.grade = formObj.grade;
    student.status = formObj.status;
  } else {
    formObj.id = generateId();
    students.push(formObj);
  }

  save();
  renderStudents();
  modal.close();
});

document.querySelector('#clearStorage').addEventListener('click', () => {
  if (confirm('Tüm verileri silmek istediğinizden emin misiniz?')) {
    localStorage.removeItem('students');
    localStorage.removeItem('id');
    students = [];
    renderStudents();
  }
});

function handleDeleteBtn(e) {
  e.preventDefault();

  if (!confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
    return;
  }

  students = students.filter(x => x.id !== Number(this.dataset.studentid));
  save();
  renderStudents();
}

function handleEditBtn(e) {
  e.preventDefault();

  modal.classList.add('editModal');

  let studentId = Number(this.dataset.studentid);
  let student = students.find(x => x.id === studentId);
  document.querySelector('input[name="id"]').value = student.id;
  document.querySelector('input[name="name"]').value = student.name;
  document.querySelector('input[name="lastname"]').value = student.lastname;
  document.querySelector('input[name="section"]').value = student.section;
  document.querySelector('input[name="midterm1"]').value = student.midterm1;
  document.querySelector('input[name="midterm2"]').value = student.midterm2;
  document.querySelector('input[name="final"]').value = student.final;
  modal.showModal();
}

renderStudents();
