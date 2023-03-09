import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const fp = flatpickr;
let startTime = null;
disableBtn(startBtn, true);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0];
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return
    }
    disableBtn(startBtn, false);
  },
};

fp(dateInput, options);

const timer = {
  start() {
    const currentTime = Date.now();
    let diff = startTime - currentTime;

    const timerInervalId = setInterval(() => {
      updateTimer(convertMs((diff -= 1000)), timerInervalId);
    }, 1000)
  }
}
startBtn.addEventListener('click', () => {
  timer.start();
});



function updateTimer({ days, hours, minutes, seconds }, timerInervalId) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
  validation(days, hours, minutes, seconds, timerInervalId);

}
function validation(days, hours, minutes, seconds, timerInervalId) {
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    return clearInterval(timerInervalId);
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}
function disableBtn(button, option) {
  return button.disabled = option;
}
