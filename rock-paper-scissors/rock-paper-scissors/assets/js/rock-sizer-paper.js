let ad = prompt("Hoş geldin, adın nedir?");
let hareketler = ["taş", "kağıt", "makas"];
console.log(hareketler);

let kullaniciHamlesi = prompt(ad + " taş/kağıt/makas tarafını seç bakalım");

let bilgisayarHamlesi = hareketler[Math.round(Math.random() * 2)];


if (kullaniciHamlesi == "taş" && bilgisayarHamlesi == "taş") {
  alert("Şansa bak, " + ad + " bilgisayar taşı seçti ve berabere kaldın!");
} else if (kullaniciHamlesi == "makas" && bilgisayarHamlesi == "taş") {
  alert("Üzgünüm " + ad + ",  bilgisayar taşı seçti ve taş makası kırar! Kaybettin");
} else if (kullaniciHamlesi == "kağıt" && bilgisayarHamlesi == "taş") {
  alert("Süpersin, " + ad + "  bilgisayar taşı seçti ve kazandın!");
} else if (kullaniciHamlesi == "taş" && bilgisayarHamlesi == "makas") {
  alert("Süpersin, " + ad + "  bilgisayar makası seçti ve kazandın!");
} else if (kullaniciHamlesi == "makas" && bilgisayarHamlesi == "makas") {
  alert("Şansa bak, " + ad + " bilgisayar makası seçti ve berabere kaldın!");
} else if (kullaniciHamlesi == "kağıt" && bilgisayarHamlesi == "makas") {
  alert("Üzgünüm " + ad + ", bilgisayar makası seçti ve makas kağıdı keser! Kaybettin");
} else if (kullaniciHamlesi == "makas" && bilgisayarHamlesi == "kağıt") {
  alert("Süpersin, " + ad + " bilgisayar kağıdı seçti ve kazandın!");
} else if (kullaniciHamlesi == "kağıt" && bilgisayarHamlesi == "kağıt") {
  alert("Şansa bak, " + ad + " bilgisayar kağıdı seçti ve berabere kaldın!");
} else if (kullaniciHamlesi == "taş" && bilgisayarHamlesi == "kağıt") {
  alert("Üzgünüm " + ad + ", bilgisayar kağıdı seçti ve kağıt taşı sarar! Kaybettin");
} else {
  alert("Lütfen taş, kağıt veya makas seçin.");
}