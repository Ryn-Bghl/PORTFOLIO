document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const isFr = (document.documentElement.lang || "fr").startsWith("fr");
    const msgs = isFr ? {
        captchaErr: "Veuillez valider le captcha.",
        sending: "Envoi en cours...",
        successTitle: "Message envoyé",
        successMsg: "Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.",
        errTitle: "Erreur",
        errMsg: "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
    } : {
        captchaErr: "Please fill out captcha field",
        sending: "Sending...",
        successTitle: "Success",
        successMsg: "Your message has been sent successfully!",
        errTitle: "Error",
        errMsg: "An error occurred. Please try again."
    };

    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
        const captchaField = document.querySelector("textarea[name=h-captcha-response]");
        if (!captchaField || !captchaField.value) {
            e.preventDefault();
            openPopup(msgs.errTitle, msgs.captchaErr);
            return;
        }

        submitButton.textContent = msgs.sending;
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
            openPopup(msgs.successTitle, msgs.successMsg);
            location.reload();
        } else {
            console.error("Error:", response.statusText);
            openPopup(msgs.errTitle, msgs.errMsg);
        }
    } catch (error) {
        openPopup(msgs.errTitle, msgs.errMsg);
        console.error("Error:", error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
