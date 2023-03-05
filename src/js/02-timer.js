import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const fp = flatpickr;
let startTime = null;
startBtn.disabled = true;

function updateTimer ({days, hours, minutes, seconds}){
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

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
function addLeadingZero(value){
    return String(value).padStart(2, '0')
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0];
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return
    }
    startBtn.disabled = false;
  },
};

fp(dateInput, options);

const timer = {
    start() {
        const currentTime = new Date();
        let diff = startTime - currentTime;
        
        
        const timerInervalId = setInterval(() => {
            if(diff <= 0){
                
                clearInterval(timerInervalId);
            }
            updateTimer(convertMs((diff -= 1000)))
            
        }, 1000)
        
        
    }
}

startBtn.addEventListener('click', () => {
    timer.start();
});




