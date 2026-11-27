"use strict";

const galleryImages = [
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000105211.jpg",
        alt: "Red žardinjera sa zimzelenim biljkama uz poslovni objekat",
        caption: "Zimzelene biljke u žardinjerama uz poslovni objekat"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000104326.png",
        alt: "Prikaz pre i posle uređenja dvorišne sadne površine",
        caption: "Uređenje sadne površine, prikaz pre i posle"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000104323.png",
        alt: "Kolaž primera sadnje žbunja i ukrasnog malča pre i posle uređenja",
        caption: "Primeri sadnje žbunja i završne obrade površine"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000103744.jpg",
        alt: "Zelene biljke u crnoj žardinjeri u enterijeru",
        caption: "Biljke u žardinjeri u poslovnom enterijeru"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000103564.jpg",
        alt: "Dugačka žardinjera sa sobnim biljkama u poslovnom prostoru",
        caption: "Biljne postavke u žardinjerama"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000103561.jpg",
        alt: "Biljne postavke uz prozor u enterijeru",
        caption: "Zelenilo uz prozorski zid"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000100612.jpg",
        alt: "Zeleni zid i bujna žardinjera sa različitim biljkama u enterijeru",
        caption: "Zeleni zid i biljna postavka"
    },
    {
        src: "../slike_cvecara/usluge/uredjenje%20poslovnog%20prostora/1000099477.jpg",
        alt: "Niz zimzelenih žbunova u dvorištu uz poslovni objekat",
        caption: "Zimzeleni žbunovi i ukrasna podloga"
    }
];

const galleryElement = document.getElementById("projectGallery");
const modalElement = document.getElementById("projectGalleryModal");
const modalImage = document.getElementById("projectGalleryModalImage");
const modalCaption = document.getElementById("projectGalleryModalCaption");
const counterElement = document.getElementById("projectGalleryCounter");
const previousButton = document.getElementById("projectGalleryPrevious");
const nextButton = document.getElementById("projectGalleryNext");

if (
    !(galleryElement instanceof HTMLElement) ||
    !(modalElement instanceof HTMLElement) ||
    !(modalImage instanceof HTMLImageElement) ||
    !(modalCaption instanceof HTMLElement) ||
    !(counterElement instanceof HTMLElement) ||
    !(previousButton instanceof HTMLButtonElement) ||
    !(nextButton instanceof HTMLButtonElement)
) {
    throw new Error("Nedostaju elementi potrebni za galeriju uređenja.");
}

const galleryModal = bootstrap.Modal.getOrCreateInstance(modalElement);
let activeImageIndex = 0;

function showImage(index) {
    activeImageIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[activeImageIndex];

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.caption;
    counterElement.textContent = `${activeImageIndex + 1} / ${galleryImages.length}`;
    previousButton.setAttribute("aria-label", `Prethodna fotografija. ${activeImageIndex + 1} od ${galleryImages.length}`);
    nextButton.setAttribute("aria-label", `Sledeća fotografija. ${activeImageIndex + 1} od ${galleryImages.length}`);
}

galleryImages.forEach((image, index) => {
    const column = document.createElement("div");
    column.className = "col-6 col-lg-4";

    const figure = document.createElement("figure");
    figure.className = "project-gallery-card home-section-card h-100 m-0";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-gallery-button";
    button.setAttribute("aria-label", `Otvori fotografiju: ${image.alt}`);

    const thumbnail = document.createElement("img");
    thumbnail.className = "project-gallery-image";
    thumbnail.src = image.src;
    thumbnail.alt = "";
    thumbnail.loading = "lazy";
    thumbnail.decoding = "async";

    const prompt = document.createElement("span");
    prompt.className = "project-gallery-prompt";
    prompt.textContent = "Uvećaj fotografiju";
    prompt.setAttribute("aria-hidden", "true");

    const caption = document.createElement("figcaption");
    caption.className = "p-3 home-card-copy";
    caption.textContent = image.caption;

    button.append(thumbnail, prompt);
    figure.append(button, caption);
    column.append(figure);
    galleryElement.append(column);

    button.addEventListener("click", () => {
        showImage(index);
        galleryModal.show();
    });
});

previousButton.addEventListener("click", () => showImage(activeImageIndex - 1));
nextButton.addEventListener("click", () => showImage(activeImageIndex + 1));

modalElement.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(activeImageIndex - 1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(activeImageIndex + 1);
    }
});
