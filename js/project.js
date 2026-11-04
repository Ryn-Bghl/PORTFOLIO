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

/* ==========================================================================
   Project Image Lightbox (1st Plan Full-Screen Zoom)
   ========================================================================== */
(() => {
    const isFr = (document.documentElement.lang || "fr").startsWith("fr");
    const closeBtnLabel = isFr ? "FERMER" : "CLOSE";

    // Create lightbox DOM elements once
    let lightbox = document.querySelector("#project_lightbox");
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "project_lightbox";
        lightbox.className = "project-lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", isFr ? "Agrandissement de l'image" : "Image Zoom View");
        lightbox.innerHTML = `
            <div class="project-lightbox-content">
                <div class="project-lightbox-img-wrap">
                    <img src="" alt="" class="project-lightbox-img" />
                </div>
                <div class="project-lightbox-bar">
                    <span class="project-lightbox-title"></span>
                    <button type="button" class="project-lightbox-close" aria-label="${isFr ? 'Fermer la vue agrandie' : 'Close enlarged view'}">
                        <i data-lucide="x" class="icon" aria-hidden="true"></i> ${closeBtnLabel}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    lucide.createIcons();

    const lightboxImg = lightbox.querySelector(".project-lightbox-img");
    const lightboxTitle = lightbox.querySelector(".project-lightbox-title");
    const closeBtn = lightbox.querySelector(".project-lightbox-close");

    const openLightbox = (src, caption) => {
        if (!src) return;
        lightboxImg.src = src;
        lightboxImg.alt = caption || (isFr ? "Aperçu agrandi du projet" : "Project enlarged preview");
        lightboxTitle.textContent = caption || "";
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => {
            if (!lightbox.classList.contains("active")) {
                lightboxImg.src = "";
            }
        }, 200);
    };

    document.querySelectorAll(".project-screenshot-carousel").forEach((carousel) => {
        const track = carousel.querySelector(".project-screenshot-track");
        const slides = carousel.querySelectorAll(".project-screenshot-slide");
        const counter = carousel.querySelector(".project-screenshot-counter");
        const previousButton = carousel.querySelector(".project-screenshot-prev");
        const nextButton = carousel.querySelector(".project-screenshot-next");

        if (!track || !counter || !previousButton || !nextButton || slides.length < 1) return;

        const slideCount = slides.length;
        slides.forEach((slide) => {
            const clone = slide.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });
        for (let index = slideCount - 1; index >= 0; index -= 1) {
            const clone = slides[index].cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.insertBefore(clone, track.firstChild);
        }

        let currentIndex = slideCount;
        let isMoving = false;
        const updatePosition = () => {
            const slideWidth = track.querySelector(".project-screenshot-slide").getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            const firstVisible = ((currentIndex - slideCount) % slideCount + slideCount) % slideCount;
            counter.textContent = `${String(firstVisible + 1).padStart(2, "0")} / ${String(slideCount).padStart(2, "0")}`;
        };
        const move = (direction) => {
            if (isMoving) return;
            isMoving = true;
            currentIndex += direction;
            updatePosition();
        };

        track.addEventListener("transitionend", (event) => {
            if (event.target !== track) return;
            if (currentIndex >= slideCount * 2) {
                currentIndex -= slideCount;
            } else if (currentIndex < slideCount) {
                currentIndex += slideCount;
            }
            track.style.transition = "none";
            updatePosition();
            track.offsetHeight;
            track.style.transition = "";
            isMoving = false;
        });

        previousButton.addEventListener("click", () => move(-1));
        nextButton.addEventListener("click", () => move(1));
        window.addEventListener("resize", updatePosition);
        track.style.transition = "none";
        updatePosition();
        track.offsetHeight;
        track.style.transition = "";
    });

    // Click handler for zoomable project screenshots and hero frames
    document.addEventListener("click", (event) => {
        const figure = event.target.closest(".project-figure, .project-screenshot-slide");
        const heroMedia = event.target.closest(".project-media-frame");

        if (figure) {
            const img = figure.querySelector("img");
            if (!img) return;
            const captionSpan = figure.querySelector(".project-figure-caption span:first-child, .project-screenshot-caption span:first-child");
            const caption = captionSpan ? captionSpan.textContent.trim() : (img.alt || "");
            openLightbox(img.currentSrc || img.src, caption);
            return;
        }

        if (heroMedia && (event.target.tagName === "IMG" || event.target.closest(".project-media-frame"))) {
            const img = heroMedia.querySelector("img");
            if (!img) return;
            const footerSpan = heroMedia.querySelector(".project-media-footer span:first-child");
            const caption = footerSpan ? footerSpan.textContent.trim() : (img.alt || "");
            openLightbox(img.currentSrc || img.src, caption);
            return;
        }

        // Close lightbox if clicking close button, backdrop, or enlarged image
        if (lightbox.classList.contains("active")) {
            if (event.target === closeBtn || event.target === lightbox || event.target === lightboxImg || event.target.closest(".project-lightbox-img-wrap")) {
                closeLightbox();
            }
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
})();
