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

const thumbnails = [
    "../img/gallery/thumbnails/aggressor.jpg",
    "../img/gallery/thumbnails/Belakor.jpg",
    "../img/gallery/thumbnails/belakorBack.jpg",
    "../img/gallery/thumbnails/bloodletters.jpg",
    "../img/gallery/thumbnails/corvusBlackstar.jpg",
    "../img/gallery/thumbnails/eldarFalcon.jpg",
    "../img/gallery/thumbnails/eldarFalconBack.jpg",
    "../img/gallery/thumbnails/eldarFalconCockpit.jpg",
    "../img/gallery/thumbnails/eldarFalconSideEngine.jpg",
    "../img/gallery/thumbnails/eldarRanger.jpg",
    "../img/gallery/thumbnails/eldarRangerBack.jpg",
    "../img/gallery/thumbnails/eldarSquad.jpg",
    "../img/gallery/thumbnails/fleshHounds.jpg",
    "../img/gallery/thumbnails/khorneDeamonPrince.jpg",
    "../img/gallery/thumbnails/khorneDeamonPrinceBack.jpg",
    "../img/gallery/thumbnails/reiverSquad.jpg",
    "../img/gallery/thumbnails/vostroyanGuardSquad.jpg",
    "../img/gallery/thumbnails/vostroyanMedic.jpg",
    "../img/gallery/thumbnails/vostroyanMortarTeam.jpg",
]

const titles = [
    "Deathwatch Aggressor",
    "Be'lakor, the first Daemon Prince",
    "Be'lakor, the first Daemon Prince",
    "Khorne Bloodletter",
    "Corvus Blackstar",
    "Eldar Wave Serpent",
    "Eldar Wave Serpent",
    "Eldar Wave Serpent",
    "Eldar Wave Serpent",
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

const infos = [
    "One of my favourite models in the Deathwatch Arsenal. With two machine guns on it’s wrists, no one wanted to come close to this unit.",
    "I decided to experiment with the fades using an airbrush. I’m happy with the outcome however the colours don’t match up to the law of the Warhammer universe. That being said, the purple really makes it stand out in front of the sea of red Bloodletters.",
    "I decided to experiment with the fades using an airbrush. I’m happy with the outcome however the colours don’t match up to the law of the Warhammer universe. That being said, the purple really makes it stand out in front of the sea of red Bloodletters.",
    "How fast can I batch paint 20 of these beasts? Well… not very fast. But using some simple tricks, these guys look like they have had way more time put into them than they actually have.",
    "Deathwatch’s choice of transport to get units from planet to planet. Their pinpoint accuracy is unmatched compared to anything in its caliber. Everytime I look at this model, I always forget that it’s only made of plastic.",
    "A really nice paint scheme that brings cohesion to my Aeldari army.",
    "A really nice paint scheme that brings cohesion to my Aeldari army.",
    "A really nice paint scheme that brings cohesion to my Aeldari army.",
    "A really nice paint scheme that brings cohesion to my Aeldari army.",
    "Some of my most recent models to paint. With the new 9th edition rules, I had to adjust my army slightly. With their sniper rifles, they can pick off any commander on the board with ease.",
    "Some of my most recent models to paint. With the new 9th edition rules, I had to adjust my army slightly. With their sniper rifles, they can pick off any commander on the board with ease.",
    "Some units from my Eldar Army all in one picture. Here we have: Wave Serpent, Windriders, Rangers, Wraithguards, and Farseer",
    "The dogs of the underworld. They’re used to outflank the enemy and deny any physic powers casted from the enemy team.",
    "Covered in the skulls of his enemies, this Daemon takes no prisoners. This Forgeworld model took me the most amount of time compared to any other model that I’ve painted.",
    "Covered in the skulls of his enemies, this Daemon takes no prisoners. This Forgeworld model took me the most amount of time compared to any other model that I’ve painted.",
    "Reiver squads drop in from the sky and bring fear to the battlefield. As Deathwatch is a mixture of all space marine chapters, each right shoulder pad symbolises where the respected model originated from.",
    "Make Ready...! Fire! This is an interpretation of what napoleonic units would look like in the year 40,000.",
    "A close up of the medic for the squad. Hopefully none of them are afraid of syringes.",
    "Two Vostroyan Guards manning a mortar.",
]

function setMain(id) {
    if (id < sourceImages.length && imageElement !== null) {
        imageElement.style.backgroundImage = "url(" + sourceImages[id] + ")";
    }
    if (id < titles.length && titleElement !== null) {
        titleElement.innerText = titles[id];
    }

    if (id < infos.length && infoElement !== null) {
        infoElement.innerText = infos[id];
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
        createImage(thumbnails[i], i);
    }
}
