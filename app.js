import init, { getState, openFields, toggleFlag } from "./pkg/server.js";

async function main() {
    await init();
    render();
}

function render() {
    let root = document.getElementById("root");
    root.innerHTML = "";
    
    let data = getState()
        .split("\n")
        .map(row => row.trim().split(/\s+/));
    
    root.style.display = "inline-grid";
    root.style.gridTemplate = `repeat(${data.length - 1}, auto) / repeat(${data[0].length}, auto)`;

    for (let y = 0; y < data.length - 1; y++) {
        for (let x = 0; x < data[0].length; x++) {
            let element = document.createElement("a");
            element.classList.add("field");
            element.href = "#";
            element.innerText = data[y][x];

            element.addEventListener("contextmenu", evt => {
                evt.preventDefault();
                toggleFlag(y, x);
                render();
            });

            element.addEventListener("click", evt => {
                evt.preventDefault();
                openFields(y, x);
                render();
            });    
        }
    }
}

main();