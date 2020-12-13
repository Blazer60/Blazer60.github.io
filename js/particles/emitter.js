/*
 * Emitter class that controls
 * all particles assigned to it
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

class Emitter {
    constructor(max_particle_count) {
        this.max_particle_count = max_particle_count;

        /* Particle Spawning */
        this.particle_spawn_rate = 1;
        this.spawn_time = 0.0;

        /* Particle "globals" */
        this.particle_start_colour = [];
        this.particle_end_colour = [];
        this.particle_decay_rate = 40.0;

        this.particles = [];
        this.set_p_size(this.max_particle_count);
        this.p_next = 0;
    }

    set_p_size(size) {
        if (size === undefined) {
            size = 1;
        }
        this.max_particle_count = size;
        this.particles = [];
        for (let i = 0; i < this.max_particle_count; i++) {
            this.particles[i] = new Particle();
        }
        this.p_next = 0;
    }

    enable_particle() {
        /* Move to mouse pos */
        this.particles[this.p_next].enable([mouse_pos[0], mouse_pos[1]]);
        this.p_next = (this.p_next + 1) % this.max_particle_count;
    }

    update(delta_time) {
        /* check if you can spawn a new particle */
        this.spawn_time += delta_time;
        if (this.spawn_time > this.particle_spawn_rate) {
            this.enable_particle();
            this.spawn_time = 0.0;
        }

        /* Update all particles */
        for (let particle of this.particles) {
            if (particle.alive) {
                particle.update(delta_time, this.particle_start_colour, this.particle_end_colour, this.particle_decay_rate);
            }
        }
    }

    render(ctx) {
        for (let particle of this.particles) {
            if (particle.alive) {
                particle.render(ctx);
            }
        }
    }
}
