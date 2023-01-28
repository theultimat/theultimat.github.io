"use strict";

const NUM_STARS = 0.000313541054281795;
const MAX_NUM_FAST_STARS = 3;

const STAR_MIN_SIZE = 1;
const STAR_MAX_SIZE = 4;

const STAR_MIN_SPEED = 0.001;
const STAR_MAX_SPEED = 0.01;

const STAR_FAST_MIN_SPEED = 0.25;
const STAR_FAST_MAX_SPEED = 0.4;

const STAR_FAST_CHANCE = 0.5;

const STAR_DIRECTION = [-0.894427, 0.447214];

const PARTICLE_MAX_LIFE = 300;

let stars = []
let particles = [];
let numFastStars = 0;

let canvas = null;
let context = null;
let lastDrawTime = null;
let simulate = true;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createStar(minX, maxX, minY, maxY, enableFast) {
    const star = {
        position: [ rand(minX, maxX), rand(minY, maxY) ],
        size: rand(STAR_MIN_SIZE, STAR_MAX_SIZE),
        colour: [
            rand(180, 255),
            rand(180, 255),
            rand(180, 255)
        ],
        speed: rand(STAR_MIN_SPEED, STAR_MAX_SPEED),
        fast: false
    };

    if (enableFast && numFastStars < MAX_NUM_FAST_STARS) {
        star.fast = rand(0, 1) < STAR_FAST_CHANCE;

        if (star.fast) {
            star.speed = rand(STAR_FAST_MIN_SPEED, STAR_FAST_MAX_SPEED);
            numFastStars++;
        }
    }

    return star;
}

function updateParticles(dt) {
    const next = [];

    particles.forEach(particle => {
        particle.life -= dt;

        if (particle.life > 0) {
            next.push(particle);
        }
    });

    particles = next;
}

function updateStars(dt) {
    const next = [];

    stars.forEach(star => {
        star.position[0] += STAR_DIRECTION[0] * star.speed * dt;
        star.position[1] += STAR_DIRECTION[1] * star.speed * dt;

        if (star.position[0] < 0 || star.position[0] > canvas.width || star.position[1] < 0 || star.position[1] > canvas.height) {
            if (star.fast) {
                numFastStars--;
            }

            return;
        }

        if (star.fast) {
            particles.push({
                position: star.position.slice(),
                colour: star.colour,
                size: star.size,
                life: PARTICLE_MAX_LIFE
            });
        }

        next.push(star);
    });

    const numStars = NUM_STARS * canvas.width * canvas.height;
    while (next.length < numStars) {
        if (rand(0, 1) > 0.5) {
            next.push(createStar(0, canvas.width, 0, 0, true));
        } else {
            next.push(createStar(canvas.width, canvas.width, 0, canvas.height, true));
        }
    }

    stars = next;
}

function drawStars() {
    stars.forEach(star => {
        const x = star.position[0] - star.size * 0.5;
        const y = star.position[1] - star.size * 0.5;

        context.beginPath();
        context.fillStyle = `rgb(${star.colour[0]}, ${star.colour[1]}, ${star.colour[2]})`;
        context.rect(x, y, star.size, star.size);
        context.fill();
    });
}

function drawParticles() {
    particles.forEach(particle => {
        const x = particle.position[0] - particle.size * 0.5;
        const y = particle.position[1] - particle.size * 0.5;
        const a = particle.life / PARTICLE_MAX_LIFE;

        context.beginPath();
        context.fillStyle = `rgba(${particle.colour[0]}, ${particle.colour[1]}, ${particle.colour[2]}, ${a})`;
        context.rect(x, y, particle.size, particle.size);
        context.fill();
    });
}

function updateAndDraw(time) {
    if (!lastDrawTime) {
        lastDrawTime = time;
        window.requestAnimationFrame(updateAndDraw);
        return;
    }

    const dt = time - lastDrawTime;
    lastDrawTime = time;

    updateParticles(dt);
    updateStars(dt);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawParticles();
    drawStars();

    if (simulate) {
        window.requestAnimationFrame(updateAndDraw);
    }
}

function addMissingStars() {
    const numStars = NUM_STARS * canvas.width * canvas.height;
    while (stars.length < numStars) {
        stars.push(createStar(0, canvas.width, 0, canvas.height, false));
    }
}

window.addEventListener("load", () => {
    canvas = document.getElementById("main");
    context = canvas.getContext("2d");

    let firstResize = true;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        addMissingStars();
    }

    window.addEventListener("resize", resize);

    resize();

    window.requestAnimationFrame(updateAndDraw);

    document.querySelectorAll("a[href^=\"#\"]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    function updateSimulateFlag() {
        const rect = canvas.getBoundingClientRect();
        const viewHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight
        );

        const visible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

        if (visible && !simulate) {
            lastDrawTime = null;
            window.requestAnimationFrame(updateAndDraw);
        }

        simulate = visible;
    }

    window.addEventListener("scroll", updateSimulateFlag);
    window.addEventListener("focus", updateSimulateFlag);

    updateSimulateFlag();
});
