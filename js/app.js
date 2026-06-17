const screen = document.querySelector("#screen");

function initializeAppLifetime() {
    const appStartedAt = localStorage.getItem("appStartedAt");

    if (!appStartedAt) {
        localStorage.setItem("appStartedAt", new Date().toISOString());
    }
}

function showScreen(screenName) {
    stopClock();

    if (typeof stopCountdown === "function") {
        stopCountdown();
    }

    if (screenName === "home") {
        screen.innerHTML = renderHomeScreen();
        startClock();
        return;
    }

    if (screenName === "new-period") {
        screen.innerHTML = renderNewPeriodScreen();
        initNewPeriodScreen();
        return;
    }

    if (screenName === "journal") {
        screen.innerHTML = renderJournalScreen();
        return;
    }

    if (screenName === "settings") {
        screen.innerHTML = renderSettingsScreen();
        return;
    }

    if (screenName === "about") {
        screen.innerHTML = renderAboutScreen();
        return;
    }
}

function showActivePeriodScreen(period) {
    stopClock();

    if (typeof stopCountdown === "function") {
        stopCountdown();
    }

    screen.innerHTML = renderActivePeriodScreen(period);
    initActivePeriodScreen(period);
}

initializeAppLifetime();
initMenu();
showScreen("home");
