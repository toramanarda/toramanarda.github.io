document.addEventListener('DOMContentLoaded', function () {
  let form = document.getElementById('contactForm');
  let resultTable = document.getElementById('resultTable');
  let toast = document.getElementById('toast');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let firstName = document.querySelector('.firstname').value;
    let lastName = document.querySelector('.lastname').value;
    let email = document.querySelector('.emailInput').value;
    let queryType = document.querySelector('input[name="queryType"]:checked').value;
    let message = document.querySelector('.messageBox').value;
    let consent = document.querySelector('.consentCheckboxInput').checked ? "Yes" : "No";

    let tableHTML = `
      <table border="1" style="width: 100%; margin-top: 20px;">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Query Type</th>
            <th>Message</th>
            <th>Consent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${queryType}</td>
            <td>${message}</td>
            <td>${consent}</td>
          </tr>
        </tbody>
      </table>
    `;

    resultTable.innerHTML = tableHTML;

    // Toast mesajını göster
    toast.style.display = 'block';

    // 3 saniye sonra toast mesajını gizle
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  });
})

document.addEventListener("DOMContentLoaded", function () {
  let queryTypeRadios = document.querySelectorAll('.queryType input[type="radio"]');

  queryTypeRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      queryTypeRadios.forEach(function (radio) {
        radio.closest('.query').style.backgroundColor = 'transparent';
      });

      if (radio.checked) {
        radio.closest('.query').style.backgroundColor = '#E0F1E8';
      }
    });
  });
});