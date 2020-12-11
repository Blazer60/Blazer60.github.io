/*
 * Particle Class for a particle system in js
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

function get_random_number(min, max) {
    return Math.random() * (max - min) + min;
}

function normalise(x, min, max) {
    /* returns a number between 0-1 based on x */
    return (x - min) / (max - min);
}

function rgba_lerp(start, stop, time) {
    for (let i = 0; i < 4; i++) {
        stop[i] = Math.round(lerp(start[i], stop[i], time));
    }
    return stop;
}

function lerp(min, max, time) {
    return (max - min) * time + min;
}

class Particle {
    constructor(pos) {
        /* Size */
        this.starting_size = get_random_number(30, 40);
        this.size = this.starting_size;
        this.decay_rate = 10.0;

        /* Vectors */
        this.vel = [get_random_number(-40, 40), get_random_number(-40, 40)];
        this.acc = [get_random_number(-40, 40), get_random_number(-80, 0)];
        this.pos = [
            pos[0] - this.size / 2,
            pos[1] - this.size / 2
        ];

        /* Rotation */
        this.rotation = 0;
        this.rotation_speed = get_random_number(-3.14 / 16, 3.14 / 16);

        /* Colours (rgba form) */
        this.starting_colour = [255, 0, 0, 0.5];
        this.final_colour = [0, 255, 0, 0.5];
        this.colour = [...this.starting_colour];

        this.alive = true;
    }

    update(delta_time) {
        /* Update Velocity */
        this.vel[0] += this.acc[0] * delta_time;
        this.vel[1] += this.acc[1] * delta_time;

        /* Update position */
        this.pos[0] += this.vel[0] * delta_time;
        this.pos[1] += this.vel[1] * delta_time;

        /* Update the rotation */
        this.rotation += this.rotation_speed;

        /* Update size */
        this.size = Math.max(0, this.size - (this.decay_rate * delta_time));

        /* update colours */
        this.colour = rgba_lerp(this.starting_colour, this.final_colour, normalise(this.size, 0, this.starting_size));

        /* Check size to see if it dies */
        if (this.size <= 0) {
            this.alive = false;
        }
    }

    render(ctx) {
        /* Stops rotation being applied exponentially */
        ctx.save();
        ctx.beginPath();
        /*
        ctx.fillStyle = "rgb(182, 251, 0)";
        ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size);
         */
        ctx.translate(this.pos[0] + this.size / 2, this.pos[1] + this.size / 2);
        ctx.rotate(this.rotation);
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.fillStyle = "rgba(" + this.colour[0] + ", " + this.colour[1] + ", " + this.colour[2] + ", " + this.colour[3] + ")";
        ctx.fill();

        ctx.restore();
    }
}
