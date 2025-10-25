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
function handleTouch(carouselSlide, callback) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    carouselSlide.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    carouselSlide.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;

        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);

        if (deltaX > deltaY) {
            e.preventDefault();
        }
    });

    carouselSlide.addEventListener("touchend", () => {
        if (touchStartX - touchEndX > 75) {
            callback(1);
        }

        if (touchStartX - touchEndX < -75) {
            callback(-1);
        }
    });
}

function showProject(index, carouselSlide) {
    if (!carouselSlide) return;
    carouselSlide.style.transform = `translateX(-${index * 100}%)`;
}

function updateProject(direction, currentIndex, projects, carouselSlide) {
    currentIndex += direction;

    if (currentIndex >= projects.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = projects.length - 1;
    }

    showProject(currentIndex, carouselSlide);
    return currentIndex;
}

function initCarousel() {
    const carouselSlide = document.querySelector(".carousel-slide");
    if (!carouselSlide) return;

    const projects = document.querySelectorAll(".project");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (projects.length <= 1) {
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
    }

    let currentIndex = 0;

    nextBtn.addEventListener("click", () => {
        currentIndex = updateProject(1, currentIndex, projects, carouselSlide);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = updateProject(-1, currentIndex, projects, carouselSlide);
    });

    handleTouch(carouselSlide, (direction) => {
        currentIndex = updateProject(direction, currentIndex, projects, carouselSlide);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Event listeners for nav links
    document.querySelectorAll("header nav a").forEach((navLink) => {
        navLink.addEventListener("click", (event) => {
            event.preventDefault();
            const sectionId = navLink.getAttribute("data-section-id");
            if (sectionId) {
                openSection(sectionId);
            }
        });
    });

    // Event listeners for CTA buttons with stop propagation
    document.querySelectorAll("a.cta").forEach((ctaButton) => {
        ctaButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Empêche la propagation vers la section parent
            event.preventDefault(); // Prevent default link behavior
            const sectionId = ctaButton.getAttribute("data-section-id");
            if (sectionId) {
                openSection(sectionId);
            }
        });
    });

    initCarousel();
});
