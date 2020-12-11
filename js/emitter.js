/*
 * Emitter class that controls
 * all particles assigned to it
 * Created On: 11/12/2020
 * @author: Ryan Purse
 */

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    let pos = [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ]
    console.log(pos[0] + ", " + pos[1]);
    return pos;
}

class Emitter {
    constructor(max_particle_count) {
        this.max_particle_count = max_particle_count;
        this.particle_spawn_rate = 0.1;
        this.spawn_time = 0.0;
        this.particles = [];
    }

    create_particle() {
        /* Move to mouse pos */
        this.particles.push(new Particle([0, 0]));
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
            this.particles[i].update(delta_time);
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
