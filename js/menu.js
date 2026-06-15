const menuItems = [
    {
        id: "new-period",
        title: "Новый период"
    },
    {
        id: "journal",
        title: "Журнал"
    },
    {
        id: "settings",
        title: "Настройки"
    },
    {
        id: "about",
        title: "О приложении"
    }
];

const settingsButton = document.querySelector(".settings-button");
const menu = document.querySelector("#menu");

function initMenu() {
    renderMenu();

    settingsButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    document.addEventListener("click", function (event) {
        const clickedMenu = menu.contains(event.target);
        const clickedButton = settingsButton.contains(event.target);

        if (!clickedMenu && !clickedButton) {
            menu.classList.add("hidden");
        }
    });
}

function renderMenu() {
    menu.innerHTML = "";

    menuItems.forEach(function (item) {
        const button = document.createElement("button");

        button.classList.add("menu-item");
        button.textContent = item.title;

        button.addEventListener("click", function () {
            showScreen(item.id);
            menu.classList.add("hidden");
        });

        menu.appendChild(button);
    });
}