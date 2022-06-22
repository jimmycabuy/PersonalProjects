var secondsRemaining;
var intervalHandle;
var startButton = document.getElementById("start");
var audio = new Audio("/assets/audio_file.mp3");

startButton.onclick = function () {
  startCountdown();
};
function resetPage() {
  document.getElementById("inputArea").style.display = "flex";
}

function tick() {
  var timeDisplay = document.getElementById("time");
  var min = Math.floor(secondsRemaining / 60);
  var sec = secondsRemaining - min * 60;

  if (sec < 10) {
    sec = "0" + sec;
  }

  if (min < 10) {
    min = "0" + min;
  }

  var message = min.toString() + ":" + sec;

  timeDisplay.innerHTML = message;

  if (secondsRemaining === 0) {
    audio.play();
    alert("Time finish!");
    clearInterval(intervalHandle);
    resetPage();
    audio.pause();
    audio.currentTime = 0;
  }
  secondsRemaining--;
}

function startCountdown() {
  resetPage();

  var minutes = Math.floor(document.getElementById("minutes").value);

  if (isNaN(minutes) || minutes == "") {
    alert("Please enter a number");
    return;
  }

  secondsRemaining = minutes;

  intervalHandle = setInterval(tick, 1000);

  document.getElementById("inputArea").style.display = "none";
}
