/*
 * Emitter class that controls
 * all particles assigned to it
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

class Emitter {
    constructor(max_particle_count) {
        this.max_particle_count = max_particle_count;
        this.render_new_first = false;

        /* Particle Spawning */
        this.particle_spawn_rate = 1;
        this.spawn_time = 0.0;
        this.spawn_amount = 1;

        /* Particle "globals" */
        this.particle_start_colour = [];
        this.particle_end_colour = [];
        this.particle_decay_rate = 40.0;

        this.particles = [];
        this.set_p_size(this.max_particle_count);
        this.p_next = 0;
        this.p_last = 0;
    }

    set_p_size(size) {
        if (size === undefined || size < 1) {
            size = 1;
        }
        this.max_particle_count = Math.floor(size);
        this.particles = [];
        for (let i = 0; i < this.max_particle_count; i++) {
            this.particles[i] = new Particle();
        }
        this.p_next = 0;
        this.p_last = 0;
    }

    enable_particle() {
        /* Move to mouse pos */
        this.particles[this.p_next].enable([mouse_pos[0], mouse_pos[1]]);
        this.p_next = (this.p_next + 1) % this.max_particle_count;
    }

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
        if (this.spawn_time > this.particle_spawn_rate) {
            for (let i = 0; i < this.spawn_amount; i++) {
                this.enable_particle();
            }
            this.spawn_time = 0.0;
        }

        /* Update all particles */
        for (let particle of this.particles) {
            if (particle.alive) {
                particle.update(delta_time, this.particle_start_colour, this.particle_end_colour, this.particle_decay_rate);
                if (!particle.alive) {
                    this.p_last = (this.p_last + 1) % this.particles.length;
                }
            }
        }
    }

    render(ctx) {
        const p_first = this.loop_back(this.p_next)
        if (this.render_new_first) {
            /* Render newest first */
            for (let i = p_first; i !== this.p_last; i = this.loop_back(i)) {
                this.particles[i].render(ctx);
            }
        }
        else {
            /* Render oldest first */
            for (let i = this.p_last; i !== p_first; i = (i + 1) % this.particles.length) {
                this.particles[i].render(ctx);
            }
        }
        /* pulse loop */
        /*
        for (let particle of this.particles) {
            if (particle.alive) {
                particle.render(ctx);
            }
        }
         */
    }
}
