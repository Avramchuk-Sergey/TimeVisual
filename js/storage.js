const ACTIVE_PERIOD_KEY = "timevisual_active_period";
const PERIOD_HISTORY_KEY = "timevisual_period_history";

function saveActivePeriod(period) {
    localStorage.setItem(ACTIVE_PERIOD_KEY, JSON.stringify(period));
}

function getActivePeriod() {
    const savedPeriod = localStorage.getItem(ACTIVE_PERIOD_KEY);

    if (!savedPeriod) {
        return null;
    }

    const period = JSON.parse(savedPeriod);

    if (new Date(period.endDate) <= new Date()) {
        finishActivePeriod(period);
        return null;
    }

    return period;
}

function clearActivePeriod() {
    localStorage.removeItem(ACTIVE_PERIOD_KEY);
}

function getPeriodHistory() {
    const savedHistory = localStorage.getItem(PERIOD_HISTORY_KEY);

    if (!savedHistory) {
        return [];
    }

    return JSON.parse(savedHistory);
}

function savePeriodHistory(history) {
    localStorage.setItem(PERIOD_HISTORY_KEY, JSON.stringify(history));
}

function finishActivePeriod(period) {
    const history = getPeriodHistory();

    const finishedPeriod = {
        ...period,
        finishedAt: new Date().toISOString(),
        status: "finished"
    };

    history.unshift(finishedPeriod);

    savePeriodHistory(history);
    clearActivePeriod();
}