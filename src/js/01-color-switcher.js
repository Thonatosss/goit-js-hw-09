function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;

startBtn.addEventListener('click', OnStartBtnClick);
stopBtn.addEventListener('click', OnStopBtnClick);



function OnStartBtnClick (){

    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
}

function OnStopBtnClick (){
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
}

