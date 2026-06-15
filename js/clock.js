let clockIntervalId = null;

function formatTimePart(value) {
    return String(value).padStart(2, "0");
}

function startClock() {
    updateClock();

    clockIntervalId = setInterval(updateClock, 1000);
}

function stopClock() {
    if (clockIntervalId !== null) {
        clearInterval(clockIntervalId);
        clockIntervalId = null;
    }
}

function updateClock() {
    const clock = document.querySelector("#clock");

    if (!clock) {
        return;
    }

    const now = new Date();

    const hours = formatTimePart(now.getHours());
    const minutes = formatTimePart(now.getMinutes());
    const seconds = formatTimePart(now.getSeconds());

    clock.textContent = `${hours}:${minutes}:${seconds}`;

    const progress = now.getSeconds() / 60;

    updateHourglass(progress);
}