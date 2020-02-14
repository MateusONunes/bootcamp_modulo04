const currentPage = location.pathname //windows.location
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) { /*tá dando erro aqui "getAtribute is not a function"*/
        item.classList.add("active")
    }
}
