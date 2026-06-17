let countdownInterval = null;

function renderActivePeriodScreen(period) {
    return `
        <section class="screen-content">
            <div class="clock" id="clock">00:00:00</div>

            <p>До конца периода осталось:</p>

            <div class="countdown" id="countdown">...</div>

            <p>секунд</p>

            <button class="main-button">
                Добавить задачу
            </button>

            <button class="back-button" onclick="showScreen('home')">Назад</button>
        </section>
    `;
}

function initActivePeriodScreen(period) {
    startClock();

    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const targetDate = new Date(period.endDate);
        const now = new Date();

        const difference = targetDate - now;
        const secondsLeft = Math.floor(difference / 1000);

        if (secondsLeft <= 0) {
            countdownElement.textContent = "0";
            stopCountdown();
            finishActivePeriod(period);
            return;
        }

        countdownElement.textContent = secondsLeft;
    }

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}