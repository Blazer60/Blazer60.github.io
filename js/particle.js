/*
 * Particle Class for a particle system in js
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

function get_random_number(min, max) {
    return Math.random() * (max + 1) + min;
}

class Particle {
    constructor(pos) {
        this.pos = pos;
        this.vel = [get_random_number(0, 40), get_random_number(0, 40)];
        this.acc = [get_random_number(-1, 1), get_random_number(-1, 1)];
        this.size = 10.0;
        this.decay_rate = 10.0;
        this.rotation = 0;
        this.rotation_speed = 0;
        this.alive = true;
    }

    update(delta_time) {
        /* Update Velocity */
        this.vel[0] += this.acc[0] * delta_time;
        this.vel[1] += this.acc[1] * delta_time;

        /* Update position */
        this.pos[0] += this.vel[0] * delta_time;
        this.pos[1] += this.vel[1] * delta_time;

        /* Update size */
        this.size = Math.max(0, this.size - (this.decay_rate * delta_time));

        /* Check size to see if it dies */
        if (this.size <= 0) {
            this.alive = false;
        }
    }

    render(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size);
    }
}
