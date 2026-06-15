function renderAboutScreen() {
    return `
        <section class="screen-content">
            <h1 class="screen-title">TimeVisual</h1>

            <p class="screen-text">
                Время уходит.<br>
                Ты сам решаешь, чем его наполнить.
            </p>

            <button class="back-button" onclick="showScreen('home')">Назад</button>
        </section>
    `;
}