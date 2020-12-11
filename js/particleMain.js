/*
 * Main class that runs the the
 * particle system on particleSystem.html
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

let primaryColour = "";
let emitter = new Emitter(40);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/* Delta Frames */
let last_delta = 0;

function update_delta_time() {
    const time = Date.now()/1000;
    const delta_time = time - last_delta;
    last_delta = time;
    return delta_time;
}

function draw(deltaTime) {

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, ctx.size.width, ctx.size.height);

    //console.log(ctx.size.width);
    emitter.update(deltaTime);

    emitter.render(ctx);
    window.requestAnimationFrame(function (){draw(update_delta_time(), ctx);});
}


function main() {
    primaryColour = window.getComputedStyle(document.body).backgroundColor;

    ctx.size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    draw(0);
}

window.onload = main;
