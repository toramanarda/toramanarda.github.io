const names = ["Arda Toraman", "Aysu Aşçı", "Berat Dimen", "Berk", "Doğa Savaş", "Doğukan Sarı", "Ece Ceylan", "Ece Sema Bekdemir", "Fatih Kaya", "Gökhan Ünlü", "Halil Yormaz", "Kemal Özalp","Kerem Kaçmaz","Melek Dal","Muhammed Baki Çağlayan","Muhammed Yazıcı","Ömer Fırat","Sıla Kara","Sudenur Taştekin","Tunahan Orak","Emre Özçalkap","Furkan","Muhammed Hasan Türkmen"];
const numbers = Array.from({length: names.length}, (_, i) => i + 1);

const generate = document.getElementById("generate-button");
const name = document.getElementById("name");
const sira = document.getElementById("sira");

generate.addEventListener("click", () => {
  if (names.length > 0 && numbers.length > 0) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomNameIndex];
    names.splice(randomNameIndex, 1); 

    const randomNoIndex = Math.floor(Math.random() * numbers.length);
    const randomNo = numbers[randomNoIndex];
    numbers.splice(randomNoIndex, 1); 

    name.textContent = `İsim: ${randomName}`;
    sira.textContent = `Sıra No: ${randomNo}`;
  } else {
    alert('Tüm isimler ve sıra numaraları kullanıldı. (İYİ DERSLER 🥳)');
  }
});