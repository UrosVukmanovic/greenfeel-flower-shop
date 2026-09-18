window.addEventListener("scroll", function() {
    document.querySelectorAll(".appear").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
});

const contactForm = document.getElementById("greenfeelContactForm");
const formFeedback = document.getElementById("formFeedback");
const messageField = document.getElementById("poruka");
const counter = document.getElementById("porukaCounter");

if (messageField && counter) {
    const updateCounter = () => {
        const length = messageField.value.length;
        counter.textContent = `${length} / 500`;
    };

    messageField.addEventListener("input", updateCounter);
    updateCounter();
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get("ime") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const subject = (formData.get("tema") || "").toString().trim();
        const message = (formData.get("poruka") || "").toString().trim();

        if (!name || !email || !subject || !message) {
            formFeedback.textContent = "Popunite sva polja kako bismo vam odgovorili.";
            formFeedback.classList.add("error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formFeedback.textContent = "Unesite validan email format.";
            formFeedback.classList.add("error");
            return;
        }

        const mailtoBody = [
            `Ime: ${name}`,
            `Email: ${email}`,
            `Tema: ${subject}`,
            "",
            `Poruka:\n${message}`
        ].join("\n");

        const mailtoLink = `mailto:contact.greenfeel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
        formFeedback.textContent = "Vaš zahtev je pripremljen za slanje na mail.";
        formFeedback.classList.remove("error");
        contactForm.reset();
        if (counter) counter.textContent = "0 / 500";
        window.location.href = mailtoLink;
    });
}