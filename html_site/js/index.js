document.getElementById("contactForm").addEventListener("submit", function (e) {
  //データ送信を無効
  e.preventDefault();

  let isAgreePrivacy = document.getElementById("checkPrivacy").checked;
  console.log(isAgreePrivacy);

  let questionElements = document.getElementsByName("question");
  let len = questionElements.length;
  let checkValue = "";
  for (let i = 0; i < len; i++) {
    if (questionElements.item(i).checked) {
      checkValue = questionElements.item(i).value;
    }
  }
  console.log(checkValue);

  if (!isAgreePrivacy) {
    alert("プライバシーポリシーに同意しない場合は送信できません。");
    return;
  }
  if (checkValue != "yes") {
    alert("もひとつ確認に同意しない場合は送信できません。");
    return;
  }
  // OKなら送信
  sencContact();
});

function sencContact() {
  alert("送信しました！");
}
