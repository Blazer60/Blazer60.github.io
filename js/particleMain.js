/*
 * Main class that runs the the
 * particle system on particleSystem.html
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

let primaryColour = "";
let emitter = new Emitter(400);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mouse_pos = [0, 0]

/* Delta Frames */
let last_delta = 0;

/* User inputs */
let starting_colour_element = document.getElementById("starting-colour");
let starting_colour = [];

let final_colour_element = document.getElementById("final-colour");
let final_colour = [];

let decay_element = document.getElementById("decay-rate");
let decay_rate = 0.0;

function hex_to_rgba(hex) {
    hex = hex.split("");
    let r = hex.splice(1, 2).join("");
    let g = hex.splice(1, 2).join("");
    let b = hex.splice(1, 2).join("");
    r = parseInt(r, 16);
    b = parseInt(b, 16);
    g = parseInt(g, 16);
    return [r, g, b, 0.5];
}

function update_delta_time() {
    const time = Date.now() / 1000;
    const delta_time = time - last_delta;
    last_delta = time;
    return delta_time;
}

function get_mouse_pos(event) {
    mouse_pos = [
        event.clientX,
        event.clientY
    ]
}

function resize_canvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function draw(deltaTime) {

    ctx.fillStyle = primaryColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //console.log(ctx.size.width);
    emitter.update(deltaTime);

    emitter.render(ctx);
    ctx.fillStyle = "rgb(182, 251, 0)";
    ctx.fillText((Math.round(1 / deltaTime).toString()), 10, 10);
    window.requestAnimationFrame(function (){draw(update_delta_time(), ctx);});
}


function main() {
    primaryColour = window.getComputedStyle(document.body).backgroundColor;
    document.onmousemove = get_mouse_pos;
    ctx.font = "30px Arial";

    starting_colour_element.addEventListener("change", function () {
        starting_colour = hex_to_rgba(starting_colour_element.value);
    });
    starting_colour = hex_to_rgba(starting_colour_element.value);

    final_colour_element.addEventListener("change", function () {
        final_colour = hex_to_rgba(final_colour_element.value);
    });
    final_colour = hex_to_rgba(final_colour_element.value);

    decay_element.addEventListener("change", function () {
       decay_rate = decay_element.value;
    });
    decay_rate = decay_element.value;

    window.addEventListener("resize", resize_canvas, false);
    resize_canvas();
    draw(0);
}

window.onload = main;
