/*
 * Particle Class for a particle system in js
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */


class Particle {
    constructor() {
        /* Size */
        this.starting_size = 0.0;
        this.size = 0.0;

        /* Vectors */
        this.vel = [0.0, 0.0];
        this.acc = [0.0, 0.0];
        this.pos = [0.0, 0.0];

        /* Rotation */
        this.rotation = 0;
        this.rotation_speed = get_random_number(-3.14 / 16, 3.14 / 16);

        /* Colours (rgba form) */
        this.colour = [1, 1, 1, 1];

        this.alive = false;
    }

    /*
     * Reset function to reduce processor
     * load compared to malloc
     */
    enable(pos) {
        this.starting_size = get_random_number(30, 40);
        this.size = this.starting_size;

        this.vel = [get_random_number(-100, 100), get_random_number(-100, 100)];
        this.acc = [get_random_number(min_cross_wind, max_cross_wind), get_random_number(min_gravity, max_gravity)];
        this.pos = [
            pos[0] - this.size / 2,
            pos[1] - this.size / 2
        ];

        /* Rotation */
        this.rotation = 0;
        this.rotation_speed = get_random_number(-3.14 / 16, 3.14 / 16);

        this.alive = true;
    }

    update(delta_time, starting_colour, final_colour, decay_rate) {
        /* Update Velocity */
        this.vel[0] += this.acc[0] * delta_time;
        this.vel[1] += this.acc[1] * delta_time;

        /* Update position */
        this.pos[0] += this.vel[0] * delta_time;
        this.pos[1] += this.vel[1] * delta_time;

        /* Update the rotation */
        this.rotation += this.rotation_speed;

        /* Update size */
        this.size = Math.max(0, this.size - this.starting_size * decay_rate * delta_time);

        /* update colours */
        this.colour = rgba_lerp(final_colour, starting_colour, normalise(this.size, 0, this.starting_size));

        /* Check size to see if it dies */
        if (this.size <= 0) {
            this.alive = false;
        }
    }

    render(ctx, is_circle) {
        /* Stops rotation & position being applied exponentially */
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.pos[0] + this.size / 2, this.pos[1] + this.size / 2);
        ctx.rotate(this.rotation);

        if (is_circle) {
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        }
        else {
            ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.fillStyle = "rgba(" + this.colour[0] + ", " + this.colour[1] + ", " + this.colour[2] + ", " + this.colour[3] + ")";
        ctx.fill();

        ctx.restore();
    }
}