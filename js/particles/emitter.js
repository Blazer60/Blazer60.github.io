/*
 * Emitter class that controls
 * all particles assigned to it.
 * p => particle
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

class Emitter {
    constructor(max_particle_count) {
        this.max_p_count = max_particle_count;
        this.render_new_first = false;

        /* Particle Spawning */
        this.p_spawn_rate = 1;
        this.spawn_time = 0.0;
        this.spawn_amount = 1;

        /* Particle "globals" */
        this.p_start_colour = [];
        this.p_end_colour = [];
        this.p_decay_rate = 40.0;
        this.is_p_circle = false;

        this.particles = [];
        this.set_p_size(this.max_p_count);
        this.p_next = 0;
        this.p_last = 0;
    }

    set_p_size(size) {
        if (size === undefined || size < 1) {
            size = 1;
        }
        this.max_p_count = Math.floor(size);
        this.particles = [];
        for (let i = 0; i < this.max_p_count; i++) {
            this.particles[i] = new Particle();
        }
        this.p_next = 0;
        this.p_last = 0;
    }

    enable_particle() {
        this.particles[this.p_next].enable([mouse_pos[0], mouse_pos[1]]);
        /* Increment index for next particle */
        this.p_next = (this.p_next + 1) % this.max_p_count;
    }

    /*
     * % for negative numbers
     */
    loop_back(num) {
        num--;
        if (num < 0) {
            num += this.particles.length;
        }
        return num;
    }

    update(delta_time) {
        /* check if you can spawn a new particle */
        this.spawn_time += delta_time;
        if (this.spawn_time > this.p_spawn_rate) {
            for (let i = 0; i < this.spawn_amount; i++) {
                this.enable_particle();
            }
            this.spawn_time = 0.0;
        }

        /* Update all particles (if alive) */
        for (let particle of this.particles) {
            if (particle.alive) {
                particle.update(delta_time, this.p_start_colour, this.p_end_colour, this.p_decay_rate);
                if (!particle.alive) {
                    /* Keep track of the oldest p for quicker rendering */
                    this.p_last = (this.p_last + 1) % this.particles.length;
                }
            }
        }
    }

    /*
     * old-new || new-old
     * depending on user input
     */
    render(ctx) {
        const p_first = this.loop_back(this.p_next)

        if (this.render_new_first) {
            /* Render newest first */
            for (let i = p_first; i !== this.p_last; i = this.loop_back(i)) {
                this.particles[i].render(ctx, this.is_p_circle);
            }
        }
        else {
            /* Render oldest first */
            for (let i = this.p_last; i !== p_first; i = (i + 1) % this.particles.length) {
                this.particles[i].render(ctx, this.is_p_circle);
            }
        }
        // OLD LOOP -> Kept because it produces a cool pattern
        // /* pulse loop */
        // for (let particle of this.particles) {
        //     if (particle.alive) {
        //         particle.render(ctx);
        //     }
        // }
    }
}
