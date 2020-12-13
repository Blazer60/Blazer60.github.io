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
        this.particle_decay_rate = 30.0;
        this.particles = [];
    }

    create_particle() {
        /* Move to mouse pos */
        this.particles.push(new Particle([mouse_pos[0], mouse_pos[1]]));
    }

    update(delta_time) {
        /* check if you can spawn a new particle */
        this.spawn_time += delta_time;
        if (this.spawn_time > this.particle_spawn_rate && this.particles.length < this.max_particle_count) {
            this.create_particle();
            this.spawn_time = 0.0;
        }

        /* update particles */
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(delta_time, this.particle_start_colour, this.particle_end_colour, this.particle_decay_rate);
            if (!this.particles[i].alive) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        for (let particle of this.particles) {
            particle.render(ctx);
        }
    }
}
