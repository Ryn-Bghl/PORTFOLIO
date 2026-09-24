// Context menu for project internal pages
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (document.querySelector("#context_menu")) {
        document.querySelector("#context_menu").remove();
    }

    const contextMenu = document.createElement("div");
    contextMenu.innerHTML = `    
        <nav>
            <ul>
                <li><button onclick="window.location.href='../index.html#home'">home</button></li>
                <li><button onclick="window.location.href='../index.html#about'">about</button></li>
                <li><button onclick="window.location.href='../index.html#projects'">all projects</button></li>
                <li><button onclick="window.location.href='../index.html#contact'">contact</button></li>
            </ul>
        </nav>
    `;
    contextMenu.id = "context_menu";
    contextMenu.style.position = "absolute";
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.left = `${event.pageX}px`;
    document.body.appendChild(contextMenu);
});

// Remove context menu on click
document.addEventListener("click", () => {
    if (document.querySelector("#context_menu")) {
        document.querySelector("#context_menu").remove();
    }
});
