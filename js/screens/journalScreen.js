function renderJournalScreen() {
    const history = getPeriodHistory();

    if (history.length === 0) {
        return `
            <section class="screen journal-screen">
                <div class="screen-content">
                    <h1 class="screen-title">Журнал</h1>

                    <p class="screen-text">
                        Завершённых периодов пока нет.
                    </p>

                    <button class="back-button"
                            onclick="showScreen('home')">
                        На главную
                    </button>
                </div>
            </section>
        `;
    }

    const historyItems = history.map(function (period) {
        return `
            <div class="journal-item">
                <h2>${period.title || "Период"}</h2>
                <p>Создан: ${formatDateTime(period.createdAt)}</p>
                <p>Плановое окончание: ${formatDateTime(period.endDate)}</p>
                <p>Фактически завершён: ${formatDateTime(period.finishedAt)}</p>
                <p>Статус: ${period.status || "finished"}</p>
            </div>
        `;
    }).join("");

    return `
        <section class="screen journal-screen">
            <div class="screen-content">
                <h1 class="screen-title">Журнал</h1>

                <div class="journal-list">
                    ${historyItems}
                </div>

                <button class="back-button"
                        onclick="showScreen('home')">
                    На главную
                </button>
            </div>
        </section>
    `;
}

function formatDateTime(value) {
    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleString("ru-RU");
}