document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
        if (!document.querySelector("textarea[name=h-captcha-response]").value) {
            e.preventDefault();
            openPopup("Error", "Please fill out captcha field");
            return;
        }

        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: json,
        });

        if (response.ok) {
            const json = await response.json();
            console.log(json);
            openPopup("Success", "Your message has been sent successfully!");
            location.reload();
        } else {
            console.error("Error:", response.statusText);
            openPopup("Error", "An error occurred. Please try again.");
        }
    } catch (error) {
        openPopup("Error", "An error occurred. Please try again.");
        console.error("Error:", error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
