document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    const hCaptcha = form.querySelector(
        "textarea[name=h-captcha-response]"
    ).value;
    if (!hCaptcha) {
        e.preventDefault();
        alert("Please fill out captcha field");
        return;
    }

    try {
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: json,
        });

        response
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    window.location.href = "success.html";
                }
            })
            .catch((error) => {
                alert("An error occurred. Please try again.");
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    } catch (error) {
        alert("An error occurred. Please try again.");
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
