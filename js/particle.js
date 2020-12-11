/*
 * Particle Class for a particle system in js
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

function get_random_number(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor(pos) {
        this.vel = [get_random_number(-40, 40), get_random_number(-40, 40)];
        this.acc = [get_random_number(-40, 40), get_random_number(-40, 40)];
        this.size = get_random_number(30, 40);
        this.decay_rate = 10.0;
        this.rotation = 0;
        this.rotation_speed = get_random_number(-3.14 / 16, 3.14 / 16);
        this.alive = true;
        this.pos = [
            pos[0] - this.size / 2,
            pos[1] - this.size / 2
        ];
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
        ctx.fillStyle = "rgb(182, 251, 0)";
        ctx.fill();

        ctx.restore();
    }
}
