window.addEventListener("scroll", function() {
    document.querySelectorAll(".appear").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
});