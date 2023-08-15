const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function disableBtn(boule) {
startBtn.disabled = boule; 
stopBtn.disabled = !boule;
};

function onStartClick() {
    disableBtn(true); 

 timerId = setInterval(() => { 
   getRandomHexColor();
   document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
};

function onStopClick() {
     disableBtn(false);
    clearInterval(timerId);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }