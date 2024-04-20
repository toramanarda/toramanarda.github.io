const names = ["Aysu Aşçı", "Berat Dimen", "Berk", "Doğa Savaş", "Doğukan Sarı", "Ece Ceylan", "Ece Sema Bekdemir", "Fatih Kaya", "Gökhan Ünlü", "Halil Yormaz", "Kemal Özalp","Kerem Kaçmaz","Melek Dal","Muhammed Baki Çağlayan","Muhammed Yazıcı","Ömer Fırat","Sıla Kara","Sudenur Taştekin","Tunahan Orak","Emre Özçalkap","Furkan","Muhammed Hasan Türkmen"];

const generate = document.getElementById("generate-button");
const name = document.getElementById("name");
const sira = document.getElementById("sira");

generate.addEventListener("click", () => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNo = Math.floor(Math.random() * (23 + 1) + 1);
  const randomSira = randomNo;

  name.textContent = `İsim: ${randomName}`;
  sira.textContent = `Sıra No: ${randomNo}`;
});
