const ACTIVE_PERIOD_KEY = "timevisual_active_period";

function saveActivePeriod(period) {
    localStorage.setItem(ACTIVE_PERIOD_KEY, JSON.stringify(period));
}

function getActivePeriod() {
    const savedPeriod = localStorage.getItem(ACTIVE_PERIOD_KEY);

    if (!savedPeriod) {
        return null;
    }

    return JSON.parse(savedPeriod);
}

function clearActivePeriod() {
    localStorage.removeItem(ACTIVE_PERIOD_KEY);
}