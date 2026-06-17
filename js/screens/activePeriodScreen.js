let countdownInterval = null;

function renderActivePeriodScreen(period) {
    const tasksHtml = (period.tasks || [])
        .map(task => `<li>${task.title}</li>`)
        .join("");

    return `
        <section class="screen-content">
            <div class="clock" id="clock">00:00:00</div>

            <p>До конца периода осталось:</p>

            <div class="countdown" id="countdown">...</div>

            <p>секунд</p>

            <button
                class="main-button"
                onclick="addTaskToActivePeriod()">
                Добавить задачу
            </button>

            <ul class="task-list">
                ${tasksHtml}
            </ul>

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

function addTaskToActivePeriod() {
    const period = getActivePeriod();

    if (!period) {
        return;
    }

    const taskTitle = prompt("Название задачи:");

    if (!taskTitle) {
        return;
    }

    if (!period.tasks) {
        period.tasks = [];
    }

    period.tasks.push({
        title: taskTitle,
        createdAt: new Date().toISOString()
    });

    updateActivePeriod(period);

    showActivePeriodScreen(period);
}