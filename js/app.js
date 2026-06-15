const screen = document.querySelector("#screen");

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

function showActivePeriodScreen(targetDateTime, secondsLeft) {
    stopClock();

    if (typeof stopCountdown === "function") {
        stopCountdown();
    }

    screen.innerHTML = renderActivePeriodScreen(secondsLeft);
    initActivePeriodScreen(targetDateTime);
}

initMenu();
showScreen("home");