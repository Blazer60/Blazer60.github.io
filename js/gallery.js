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

function setMain(id) {
    if (id < sourceImages.length) { imageElement.src = sourceImages[id]; }
}

function createImage(src, id) {
    let img = document.createElement("img");
    img.src = src;
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
