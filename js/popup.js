function openPopup(title, message) {
    const popup = document.getElementById('popup');
    if (!popup) return;

    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');

    if (popupTitle) popupTitle.innerHTML = title;
    if (popupMessage) popupMessage.innerHTML = message;

    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.getElementById('popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
});
