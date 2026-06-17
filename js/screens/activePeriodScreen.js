let countdownInterval = null;

function renderActivePeriodScreen(period) {
	
	const completedShortTasksCount = (period.tasks || [])
    .filter(task => task.type === "short" && task.completed)
    .length;
    
	const tasksHtml = (period.tasks || [])
    .map((task, index) => {
        if (task.type === "long") {
            return `
                <li class="task-card task-card-long">
                    <div class="task-header">
                        <span class="task-badge">Длинная</span>
                        <span class="task-title">${task.title}</span>
                    </div>

                    <div class="task-progress">
                        <div class="task-progress-fill"></div>
                    </div>
                </li>
            `;
        }

        const completedClass = task.completed ? "task-card-completed" : "";
        const checkboxText = task.completed ? "✓" : "";

        return `
            <li class="task-card task-card-short ${completedClass}">
                <button class="task-checkbox" onclick="completeShortTask(${index})">
                    ${checkboxText}
                </button>
                <span class="task-title">${task.title}</span>
            </li>
        `;
    })
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
			
			<div class="effort-bank">
			    <div class="effort-bank-title">Банк усилий</div>
			    <div class="effort-bank-value">${completedShortTasksCount}</div>
			    <div class="effort-bank-label">завершённых действий</div>
			</div>

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

    const taskTypeInput = prompt(
        "Тип задачи:\n1 — короткая\n2 — длинная"
    );

    let taskType = "short";

    if (taskTypeInput === "2") {
        taskType = "long";
    }

    if (!period.tasks) {
        period.tasks = [];
    }

    period.tasks.push({
        title: taskTitle,
        type: taskType,
        completed: false,
        createdAt: new Date().toISOString()
    });

    updateActivePeriod(period);

    showActivePeriodScreen(period);
}

function completeShortTask(taskIndex) {
    const period = getActivePeriod();

    if (!period || !period.tasks || !period.tasks[taskIndex]) {
        return;
    }

    const task = period.tasks[taskIndex];

    if (task.type !== "short") {
        return;
    }

    task.completed = true;
    task.completedAt = new Date().toISOString();

    updateActivePeriod(period);
    showActivePeriodScreen(period);
}