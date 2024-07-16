let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = "Pause";
        lapBtn.disabled = false;
        resetBtn.disabled = true;
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime += difference;
        startStopBtn.innerHTML = "Start";
        lapBtn.disabled = true;
        resetBtn.disabled = false;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    lapCounter = 0;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = '';
    startStopBtn.innerHTML = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    running = false;
}

function lap() {
    lapCounter++;
    const li = document.createElement('li');
    li.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
    lapsList.appendChild(li);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + savedTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
