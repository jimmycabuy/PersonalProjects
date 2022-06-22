function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var dd2 = today.getDate() + 7;
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();

  if (hh < 10) {
    hh = "0" + hh;
  }

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (dd2 < 10) {
    dd2 = "0" + dd2;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  dateDelivery = yyyy + "-" + mm + "-" + dd2;
  todayTime = hh + ":" + min;
  document.getElementById("inputdate1").value = today;
  document.getElementById("inputdate2").value = dateDelivery;
  document.getElementById("inputdatetime1").value = todayTime;
  document.getElementById("inputdatetime2").value = todayTime;
  document.getElementById("inputdate1").min = today;
  document.getElementById("inputdate2").min = today;
}

window.onload = function () {
  getDate();
};

function displayDeliveryLoc() {
  console.log("bonjour");
  var checkBox = document.getElementById("checkbox1");
  var div = document.getElementById("divdeliverylocation");

  if (checkBox.checked == true) {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}
