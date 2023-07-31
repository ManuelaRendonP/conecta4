document.addEventListener("DOMContentLoaded", function () {
    const boardElement = document.getElementById("board");
    const rows = 6;
    const columns = 7;

    // Generar círculos
    for (let i = 0; i < rows * columns; i++) {
        const circleElement = document.createElement("div");
        circleElement.classList.add("circle");
        boardElement.appendChild(circleElement);
    }
});
