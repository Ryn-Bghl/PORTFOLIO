// Form submission with JavaScript
document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert("Message sent successfully!");
            this.reset();
        } else {
            alert("Failed to send message. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
