/*
 * gallery.js is used to load the images into
 * the gallery and change them based on which
 * one is clicked
 * Created On: 27/11/2020
 * @author: Ryan Purse
 */

// Globals
const titleElement = document.getElementById("title");
let imageElement = document.getElementById("image");
const infoElement = document.getElementById("info");
const sideBar = document.getElementById("side-bar");
let images = [];

const sourceImages = [
    "../img/gallery/aggressor.jpg",
    "../img/gallery/Belakor.jpg",
    "../img/gallery/belakorBack.jpg",
    "../img/gallery/bloodletters.jpg",
    "../img/gallery/corvusBlackstar.jpg",
    "../img/gallery/eldarFalcon.jpg",
    "../img/gallery/eldarFalconBack.jpg",
    "../img/gallery/eldarFalconCockpit.jpg",
    "../img/gallery/eldarFalconSideEngine.jpg",
    "../img/gallery/eldarRanger.jpg",
    "../img/gallery/eldarRangerBack.jpg",
    "../img/gallery/eldarSquad.jpg",
    "../img/gallery/fleshHounds.jpg",
    "../img/gallery/khorneDeamonPrince.jpg",
    "../img/gallery/khorneDeamonPrinceBack.jpg",
    "../img/gallery/reiverSquad.jpg",
    "../img/gallery/vostroyanGuardSquad.jpg",
    "../img/gallery/vostroyanMedic.jpg",
    "../img/gallery/vostroyanMortarTeam.jpg",
]

const titles = [
    "Deathwatch Aggressor",
    "Be'lakor, the first Daemon Prince",
    "Be'lakor, the first Daemon Prince",
    "Khorne Bloodletter",
    "Corvus Blackstar",
    "Eldar Falcon",
    "Eldar Falcon",
    "Eldar Falcon",
    "Eldar Falcon",
    "Eldar Rangers",
    "Eldar Rangers",
    "Eldar Squad",
    "Khorne Flesh Hounds",
    "Khorne Daemon Prince",
    "Khorne Daemon Prince",
    "Deathwatch Reiver Squad",
    "Imperial Guard: Vostroyan Guard Squad",
    "Imperial Guard: Medic",
    "Imperial Guard: Heavy Mortar Team",
]

function setMain(id) {
    if (id < sourceImages.length) {
        imageElement.src = sourceImages[id];
        imageElement.alt = titles[id];
    }
    if (id < titles.length) {
        titleElement.innerText = titles[id];
    }
}

function createImage(src, id) {
    let img = document.createElement("img");
    img.src = src;
    if (id < titles.length) {img.alt = titles[id];}
    img.className = "side-bar-image";
    img.addEventListener("click", function () {
        setMain(id);
    });
    sideBar.appendChild(img);
}

window.onload = function () {
    for (let i = 0; i < sourceImages.length; i++) {
        createImage(sourceImages[i], i);
    }
}
