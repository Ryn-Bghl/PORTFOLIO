// context menu appears on right click
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (document.querySelector("#context_menu")) {
        document.querySelector("#context_menu").remove();
    }

    const contextMenu = document.createElement("div");
    contextMenu.innerHTML = `    
        <nav>
            <ul>
                <li><button id="context_home">home</button></li>
                <li><button id="context_about">about</button></li>
                <li><button id="context_projects">projects</button></li>
                <li><button id="context_contact">contact</button></li>
            </ul>
        </nav>
    `;
    contextMenu.id = "context_menu";
    contextMenu.style.position = "absolute";
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.left = `${event.pageX}px`;
    document.body.appendChild(contextMenu);
});

// context menu disappears on click
document.addEventListener("click", () => {
    if (document.querySelector("#context_menu")) {
        document.querySelector("#context_menu").remove();
    }
});

const sections = document.querySelectorAll("main section");

function openSection(sectionId) {
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.remove("close");
            section.classList.add("open");
        } else {
            section.classList.remove("open");
            section.classList.add("close");
        }
    });
}

// context menu buttons
document.addEventListener("click", (event) => {
    if (event.target.id === "context_home") {
        openSection("home");
    } else if (event.target.id === "context_about") {
        openSection("about");
    } else if (event.target.id === "context_projects") {
        openSection("projects");
    } else if (event.target.id === "context_contact") {
        openSection("contact");
    }
});

// add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("section");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const sectionId = button.getAttribute("id");
            openSection(sectionId);
        });
    });

    // CTA contact event listener avec stopPropagation
    document
        .querySelector("#cta_contact")
        .addEventListener("click", (event) => {
            event.stopPropagation(); // Empêche la propagation vers la section parent
            openSection("contact");
        });

    const carouselSlide = document.querySelector(".carousel-slide");
    const projects = document.querySelectorAll(".project");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function showProject(index) {
        if (index >= projects.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = projects.length - 1;
        }
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        showProject(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        showProject(currentIndex);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carouselSlide.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carouselSlide.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
    });

    carouselSlide.addEventListener("touchend", () => {
        if (touchStartX - touchEndX > 50) {
            currentIndex++;
            showProject(currentIndex);
        }

        if (touchStartX - touchEndX < -50) {
            currentIndex--;
            showProject(currentIndex);
        }
    });
});
