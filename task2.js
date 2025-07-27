document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapTimesContainer = document.getElementById('lapTimes');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;

    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = Math.floor((time % 1000) / 10);

        return (
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + '.' +
            String(milliseconds).padStart(2, '0')
        );
    }

    
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

   
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    }

   
    function pause() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
    }

    
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        lapTimesContainer.innerHTML = '';
        lapCount = 0;
    }

   
    function lap() {
        if (isRunning) {
            lapCount++;
            const lapTime = document.createElement('div');
            lapTime.className = 'lap-item';
            lapTime.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span>${formatTime(elapsedTime)}</span>
            `;
            lapTimesContainer.prepend(lapTime);
        }
    }

   
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);

    
    updateDisplay();
});