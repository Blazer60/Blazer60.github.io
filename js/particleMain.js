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

    window.addEventListener("resize", resize_canvas, false);
    resize_canvas();
    draw(0);
}

window.onload = main;
