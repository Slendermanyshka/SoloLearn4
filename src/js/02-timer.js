import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datepicker = document.getElementById("datetime-picker");

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;



let refs = {
 daysCounter: document.querySelector('[data-days]'),
 hoursCounter: document.querySelector('[data-hours]'),
 minutesCounter: document.querySelector('[data-minutes]'),
 secondsCounter: document.querySelector('[data-seconds]')
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate= selectedDates[0].getTime();
    if(selectedDate <= options.defaultDate.getTime()){
      window.alert("Please choose a date in the future!");
      return;
    }
    else{
      startBtn.disabled = false;
    }
  },
};

flatpickr(datepicker, options);

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

startBtn.addEventListener('click',timer);
stopBtn.addEventListener('click',()=>{
  clearInterval(timerID);
});

function timer(){
  stopBtn.disabled=false;
  let timerID = setInterval(()=>{
    const currentTime = Date.now();
    const backtimer = selectedDate - currentTime;
    const time = convertMs(backtimer);
    uiUpd(time);

    if(backtimer<=0){
      clearInterval(timerID);
      uiUpd(convertMs(0));

    }
  },1000)
}

 function convertToString(value){
  return value.toString().padStart(2,"0");
};

function uiUpd ({ days, hours, minutes, seconds }){
  refs.daysCounter.textContent = `${convertToString(days)}`;
  refs.hoursCounter.textContent = `${convertToString(hours)}`;
  refs.minutesCounter.textContent = `${convertToString(minutes)}`;
  refs.secondsCounter.textContent = `${convertToString(seconds)}`;
}


