let Steps = 1;

if (Steps === 1) {
  let choice = prompt("Merhaba " + "Bir sabah uyandınız ve kendinizi büyülü bir ormanda buldunuz. Etrafınıza baktınız ve iki yol gördünüz. Hangisini seçersiniz?\n1: A. Sağ yolu seçerim.\n2: B. Sol yolu seçerim.");
  if (choice === '1') {
    Steps = 2;
  } else if (choice === '2') {
    Steps = 3;
  } else {
    alert("Lütfen geçerli bir seçenek girin.");
  }
}

if (Steps === 2) {
  let choice = prompt("Sağ yolu seçtin... " + " ve bir ejderha ile karşılaştınız. Ejderha size bir seçenek sundu. Hangisini seçersiniz?\n1: A. Ejderhanın hizmetkarı olmayı seçerim.\n2: B. Ejderha ile savaşmayı seçerim.");
  if (choice === '1') {
    Steps = 4;
  } else if (choice === '2') {
    Steps = 5;
  } else {
    alert("Lütfen geçerli bir seçenek girin.");
  }
}

if (Steps === 3) {
  let choice = prompt("Sola döndün " + "  ve bir periyle karşılaştınız. Size bir dilek hakkı verdi. Ne dilerdiniz?\n1: A. Evime geri dönmeyi dilerim.\n2: B. Ormanda yaşamaya devam etmeyi dilerim.");
  if (choice === '1') {
    Steps = 6;
  } else if (choice === '2') {
    Steps = 7;
  } else {
    alert("Lütfen geçerli bir seçenek girin.");
  }
}

if (Steps === 4) {
  alert('Peri dileğinizi yerine getirdi ve aniden evinizdesiniz. Kahvenizi yudumlarken, ormanda geçirdiğiniz zamanı düşünüyorsunuz. (SON)');
  {
    alert("Lütfen geçerli bir seçenek girin.");
  }
}

if (Steps === 5) {
  alert('7. Ejderha ile savaştınız ve kazandınız. Ormanın yeni koruyucusu oldunuz ve ormanda huzur ve dengeyi sağladınız. (SON)')
  {
    alert("Lütfen geçerli bir seçenek girin.");
  }
}

if (Steps === 6) {
  alert("Ejderhanın hizmetkarı oldunuz ve ormanda birçok macera yaşadınız. Ancak, her zaman evinizi özlediniz. (SON)");
}

if (Steps === 7) {
  alert("7. Ejderha ile savaştınız ve kazandınız. Ormanın yeni koruyucusu oldunuz ve ormanda huzur ve dengeyi sağladınız. (SON)");
}
