/*
 * Holds misc. functions that the particle emitter needs to use
 * Required Modules: main.js, emitter.js, particle.js
 * Created On: 13/12/2020
 * @author: Ryan Purse
 */


function get_random_number(min, max) {
    return Math.random() * (max - min) + min;
}


function normalise(x, min, max) {
    /* returns a number between 0-1 based on x */
    return (x - min) / (max - min);
}


function rgba_lerp(from, to, time) {
    let colour = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        colour[i] = Math.round(lerp(from[i], to[i], time));
    }
    return colour;
}


function lerp(from, to, time) {
    return from + time * (to - from);
}


function hex_to_rgba(hex) {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        0.5
    ]
}


function update_delta_time() {
    const time = Date.now() / 1000;
    const delta_time = time - last_delta;
    last_delta = time;
    return delta_time;
}


function get_mouse_pos(event) {
    mouse_pos = [canvas.width / 2, canvas.height / 2]
    if (spawn_at_center) {
        mouse_pos = [
            event.clientX,
            event.clientY
        ]
    }
}


function resize_canvas() {
    canvas.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log("Resized Canvas");
}


/*
 * Set all listeners from the user form so that
 * they can interact with the particle emitter
 */
function set_event_listeners() {
    document.onmousemove = get_mouse_pos;


    /* Set defaults from form */
    starting_colour_element.addEventListener("change", function () {
        emitter.p_start_colour = hex_to_rgba(starting_colour_element.value);
    });
    emitter.p_start_colour = hex_to_rgba(starting_colour_element.value);

    final_colour_element.addEventListener("change", function () {
        emitter.p_end_colour = hex_to_rgba(final_colour_element.value);
    });
    emitter.p_end_colour = hex_to_rgba(final_colour_element.value);

    decay_element.addEventListener("change", function () {
        emitter.p_decay_rate = decay_element.value;
    });
    emitter.p_decay_rate = decay_element.value;

    spawn_element.addEventListener("change", function () {
        emitter.p_spawn_rate = 1 / spawn_element.value;
    });
    emitter.p_spawn_rate = 1 / spawn_element.value;

    gravity_element.addEventListener("change", function () {
        min_gravity = gravity_element.value * 0.8;
        max_gravity = gravity_element.value * 1.2;
    });
    min_gravity = gravity_element.value * 0.8;
    max_gravity = gravity_element.value * 1.2;

    cross_wind_element.addEventListener("change", function () {
        min_cross_wind = cross_wind_element.value * 0.8;
        max_cross_wind = cross_wind_element.value * 1.2;
    });
    min_cross_wind = cross_wind_element.value * 0.8;
    max_cross_wind = cross_wind_element.value * 1.2;

    particle_cap_element.addEventListener("change", function () {
        emitter.set_p_size(particle_cap_element.value);
    });
    emitter.set_p_size(particle_cap_element.value);

    spawn_amount_element.addEventListener("change", function () {
        emitter.spawn_amount = spawn_amount_element.value > 0 ? Math.floor(spawn_amount_element.value) : 1;
    });
    emitter.spawn_amount = spawn_amount_element.value > 0 ? Math.floor(spawn_amount_element.value) : 1;

    center_element.addEventListener("change", function () {
        spawn_at_center = !spawn_at_center;
    });

    reverse_render_element.addEventListener("change", function () {
        emitter.render_new_first = !emitter.render_new_first;
    });

    render_circles_element.addEventListener("change", function () {
        emitter.is_p_circle = !emitter.is_p_circle;
    });


    window.addEventListener("resize", resize_canvas, false);
    resize_canvas();
}
