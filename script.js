// Variables

let state = document.querySelectorAll("._control");
let countdown;
const countdownDisplay = document.querySelector('.displayTime')
const breakStamp = document.querySelector('.endBreakTime')
const allButtons = document.querySelectorAll('[data-time]')

// Main function
function timer(seconds) {
  // Clear queue on every beginning of call
  clearInterval(countdown)
  const current = Date.now();
  const future = current + seconds * 1000;
  // Running it once to account for setInterval
  displayTime(seconds);
  displayEndBreak(future);

  countdown = setInterval(() => {
    const left = Math.round((future - Date.now()) / 1000);
    // check if need stop
    if (left < 0) {
      clearInterval(countdown);
      // Need set interval
      // let audio = new Audio('buzzer.mp3')
      // audio.play();
      return;
    }
    // else display it
    displayTime(left);
  }, 1000);
}

// Managing display
window.addEventListener("load", function hideControls() {
  [].forEach.call(state, function(button) {
    button.style.visibility = "hidden";
  });
});

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const display = `${minutes}:${remainder < 10 ? '0' : ""}${remainder}`;
  countdownDisplay.textContent = display;
  document.title = display;
  [].forEach.call(state, function(button) {
    button.style.visibility = "visible";
  })
}

function displayEndBreak(timestamp) {
  const endbreak = new Date(timestamp);
  const hour = endbreak.getHours();
  const minutes = endbreak.getMinutes();
  breakStamp.textContent = `Break ends at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// Managing controls
allButtons.forEach(button => button.addEventListener("click", startTimer));
document.customTime.addEventListener("submit", function(event) {
  event.preventDefault();
  const time = this.minutes.value;
  timer(time * 60);
  this.reset();
});
