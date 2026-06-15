let countdownInterval = null;
let targetDateTime = null;

function renderActivePeriodScreen(secondsLeft) {
    return `
        <section class="screen-content">
            <div id="clock" class="clock"></div>

            <div class="period-box">
                <div class="period-label">До конца периода осталось:</div>
                <div id="countdown" class="countdown">${secondsLeft}</div>
                <div class="period-label">секунд</div>
            </div>

            <button class="main-button">Добавить задачу</button>
            <button class="back-button" onclick="showScreen('home')">Назад</button>
        </section>
    `;
}

function initActivePeriodScreen(targetTime) {
    targetDateTime = targetTime;

    startClock();

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement || !targetDateTime) {
        return;
    }

    const now = new Date();
    const difference = targetDateTime - now;

    let secondsLeft = Math.floor(difference / 1000);

    if (secondsLeft <= 0) {
        secondsLeft = 0;
        clearInterval(countdownInterval);
    }

    countdownElement.textContent = secondsLeft;
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}