
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const days = timer.querySelector('[data-days]');
const hours = timer.querySelector('[data-hours]');
const minutes = timer.querySelector('[data-minutes]');
const seconds = timer.querySelector('[data-seconds]');

flatpickr(inputDate, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

     let currentDate = Date.now();
      console.log(selectedDates[0].getTime());
      console.log(currentDate);
      if(selectedDates[0].getTime() < currentDate) {
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;

        return;
      }
      startBtn.disabled = false;
    },
  });
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  };

  startBtn.addEventListener('click', startTimer);

  function startTimer () {
    const getDate = inputDate._flatpickr.selectedDates[0].getTime();

     startBtn.disabled = true;

     const timeInterval = setInterval(() => {
         const msTime = getDate - Date.now();

         if (msTime <= 0) {
            clearInterval(timeInterval);
            updateTimer(0);
            startBtn.disabled = false;
         } else {
            updateTimer(msTime);
         }
     }, 1000);
  };
  function updateTimer(ms) {
     const {
        days: daysValue, 
        hours: hoursValue,
        minutes: minutesValue,
        seconds: secondsValue,
    } = convertMs(ms);

    days.textContent = addLeadingZero(daysValue);
    hours.textContent = addLeadingZero(hoursValue);
    minutes.textContent = addLeadingZero(minutesValue);
    seconds.textContent = addLeadingZero(secondsValue);
  };
  
//   console.log(convertMs(2000)); 
//   console.log(convertMs(140000)); 
//   console.log(convertMs(24140000));