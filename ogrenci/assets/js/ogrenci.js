let studentForm = document.querySelector('#studentForm');
let clearStorageButton = document.querySelector('#clearStorage');
let allStudentsContainer = document.querySelector('#allStudents');
let sectionsContainer = document.querySelector('#sections');

let students = JSON.parse(localStorage.students || '[]');

let renderStudents = () => {
  allStudentsContainer.innerHTML = '';
  sectionsContainer.innerHTML = '';

  let sections = {};

  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let studentHTML = `
      <div class="student">
        <h4>${student.name} ${student.lastname}</h4>
        <p>Bölüm: ${student.section}</p>
        <p>Ortalama Not: ${student.grade}</p>
        <p>Başarı Durumu: ${student.status}</p>
      </div>
    `;
    allStudentsContainer.innerHTML += studentHTML;

    if (!sections[student.section]) {
      sections[student.section] = [];
    }
    sections[student.section].push(studentHTML);
  }

  let sectionNames = [];
  let sectionIndex = 0;
  for (let sectionName in sections) {
    sectionNames[sectionIndex++] = sectionName;
  }

  for (let i = 0; i < sectionNames.length; i++) {
    let sectionName = sectionNames[i];
    let sectionHTML = `<div><h3>${sectionName}</h3>`;
    let studentsInSection = sections[sectionName];
    for (let j = 0; j < studentsInSection.length; j++) {
      sectionHTML += studentsInSection[j];
    }
    sectionHTML += '</div>';
    sectionsContainer.innerHTML += sectionHTML;
  }
};

let calculateGradeAndStatus = (midterm1, midterm2, final) => {
  let puan = (midterm1 * 0.4 + midterm2 * 0.4 + final * 0.6).toFixed(2);
  let status = '';

  if (puan >= 90) status = 'AA Başarılı';
  else if (puan >= 85) status = 'BA Başarılı';
  else if (puan >= 80) status = 'BB Başarılı';
  else if (puan >= 75) status = 'CB Geçer';
  else if (puan >= 70) status = 'CC Geçer';
  else if (puan >= 65) status = 'DC Koşullu Geçer';
  else if (puan >= 60) status = 'DD Koşullu Geçer';
  else if (puan >= 50) status = 'FD Başarısız - Kalır';
  else status = 'FF Başarısız - Kalır';

  return { puan, status };
};

studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = document.querySelector('#name').value;
  let lastname = document.querySelector('#lastname').value;
  let section = document.querySelector('#section').value;
  let midterm1 = parseFloat(document.querySelector('#midterm1').value);
  let midterm2 = parseFloat(document.querySelector('#midterm2').value);
  let final = parseFloat(document.querySelector('#final').value);

  let { puan, status } = calculateGradeAndStatus(midterm1, midterm2, final);

  let newStudent = {
    id: students.length + 1,
    name,
    lastname,
    section,
    midterm1,
    midterm2,
    final,
    grade: puan,
    status
  };

  students.push(newStudent);
  localStorage.students = JSON.stringify(students);

  renderStudents();
  studentForm.reset();
});

clearStorageButton.addEventListener('click', () => {
  localStorage.removeItem('students');
  students = [];
  renderStudents();
});

renderStudents();
