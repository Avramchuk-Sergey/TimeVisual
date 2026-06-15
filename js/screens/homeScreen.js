function renderHomeScreen() {
    const activePeriod = getActivePeriod();

    const activePeriodButton = activePeriod
        ? `<button class="main-button" onclick="showActivePeriodScreen(getActivePeriod())">
                Активный период
           </button>`
        : "";

    return `
        <section class="screen app">
            <div id="clock" class="clock">00:00:00</div>

            <div class="hourglass">
                <svg viewBox="0 0 120 180" class="hourglass-svg">
                    <path d="M30 20 H90 M30 160 H90" class="frame-line" />
                    <path d="M35 25 C35 55 55 75 60 90 C65 75 85 55 85 25" class="frame-line" />
                    <path d="M35 155 C35 125 55 105 60 90 C65 105 85 125 85 155" class="frame-line" />

                    <clipPath id="topClip">
                        <path d="M35 25 C35 55 55 75 60 90 C65 75 85 55 85 25 Z" />
                    </clipPath>

                    <clipPath id="bottomClip">
                        <path d="M35 155 C35 125 55 105 60 90 C65 105 85 125 85 155 Z" />
                    </clipPath>

                    <rect id="sandTop" x="35" y="25" width="50" height="65" clip-path="url(#topClip)" class="sand-svg" />
                    <rect id="sandBottom" x="35" y="155" width="50" height="0" clip-path="url(#bottomClip)" class="sand-svg" />

                    <circle cx="60" cy="96" r="2" class="sand-svg" />
                    <circle cx="60" cy="106" r="2" class="sand-svg" />
                    <circle cx="60" cy="116" r="2" class="sand-svg" />
                </svg>
            </div>

            ${activePeriodButton}
        </section>
    `;
}