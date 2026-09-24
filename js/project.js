// Context menu for project internal pages
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (document.querySelector("#context_menu")) {
        document.querySelector("#context_menu").remove();
    }

    const isFr = (document.documentElement.lang || "fr").startsWith("fr");
    const isEnSubdir = window.location.pathname.includes("/en/");
    const basePath = isEnSubdir ? "../index.html" : "../index.html";
    const labels = isFr
        ? { home: "accueil", about: "à propos", projects: "tous les projets", contact: "contact" }
        : { home: "home", about: "about", projects: "all projects", contact: "contact" };

    const contextMenu = document.createElement("div");
    contextMenu.innerHTML = `    
        <nav>
            <ul>
                <li><button onclick="window.location.href='${basePath}#home'">${labels.home}</button></li>
                <li><button onclick="window.location.href='${basePath}#about'">${labels.about}</button></li>
                <li><button onclick="window.location.href='${basePath}#projects'">${labels.projects}</button></li>
                <li><button onclick="window.location.href='${basePath}#contact'">${labels.contact}</button></li>
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
