function renderNewPeriodScreen() {
    return `
        <section class="screen-content">
            <h1>Новый период</h1>

            <div class="form-block">
                <label for="periodDateTime">Выбери дату и время окончания периода:</label>

                <input 
                    id="periodDateTime" 
                    class="date-input" 
                    type="datetime-local"
                >

                <button id="startPeriodButton" class="main-button">
                    Подтвердить
                </button>
            </div>

            <button class="back-button" onclick="showScreen('home')">Назад</button>
        </section>
    `;
}

function initNewPeriodScreen() {
    const button = document.getElementById("startPeriodButton");
    const input = document.getElementById("periodDateTime");

    button.addEventListener("click", function () {
        const selectedValue = input.value;

        if (!selectedValue) {
            alert("Сначала выбери дату и время.");
            return;
        }

        const selectedDate = new Date(selectedValue);
        const now = new Date();

        const difference = selectedDate - now;
        const secondsLeft = Math.floor(difference / 1000);

        if (secondsLeft <= 0) {
            alert("Выбери дату и время в будущем.");
            return;
        }

        const period = {
            title: "Новый период",
            endDate: selectedValue,
            createdAt: new Date().toISOString(),
			tasks: []
        };

        saveActivePeriod(period);
        showActivePeriodScreen(period);
    });
}