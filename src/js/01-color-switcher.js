const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopBtn.disabled = true;
startBtn.addEventListener('click', startChange);
stopBtn.addEventListener('click', stopChange);

function startChange(){
  timerId = setInterval(()=>{body.style.backgroundColor = getRandomHexColor();},1000)
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function stopChange(){
  clearInterval(timerId)
  startBtn.disabled = false;
  stopBtn.disabled = true;
 }
