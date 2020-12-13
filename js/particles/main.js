/*
 * Main class that runs the the
 * particle system on particleSystem.html
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

/* User inputs */
let particle_cap_element = document.getElementById("particle-cap");
let spawn_amount_element = document.getElementById("spawn-amount");
let starting_colour_element = document.getElementById("starting-colour");
let final_colour_element = document.getElementById("final-colour");
let spawn_element = document.getElementById("spawn-rate");
let decay_element = document.getElementById("decay-rate");
let gravity_element = document.getElementById("gravity");
let cross_wind_element = document.getElementById("cross-wind");
let center_element = document.getElementById("spawn-center");
let reverse_render_element = document.getElementById("reverse-render");
let render_circles_element = document.getElementById("circles");

/* Delta Frames */
let last_delta = 0;

/* Globals */
let min_gravity = 0.0;
let max_gravity = 0.0;
let min_cross_wind = 0.0;
let max_cross_wind = 0.0;
let spawn_at_center = true;
let primaryColour = "";
let emitter = new Emitter(1000);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mouse_pos = [window.innerWidth / 2, window.innerHeight / 2]


function draw(deltaTime) {
    /* Logic update */
    emitter.update(deltaTime);

    /* Render update */
    ctx.fillStyle = primaryColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    emitter.render(ctx);

    /* FPS Counter */
    ctx.fillStyle = "rgb(182, 251, 0)";
    ctx.fillText((Math.round(1 / deltaTime).toString()), 10, 10);

    window.requestAnimationFrame(function () {
        draw(update_delta_time(), ctx);
    });
}


function main() {
    primaryColour = window.getComputedStyle(document.body).backgroundColor;
    ctx.font = "30px Arial";

    set_event_listeners();

    draw(0);
}

window.onload = main;
