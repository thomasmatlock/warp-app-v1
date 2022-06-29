const Sketch = require('./sketch/sketch.min.js');
const theme = require('./theme.js');

let orbsColor = theme.style === 'dark' ? '100% ' : '0%';
let lightColor = theme.style === 'dark' ? '92% ' : '12%';
// lightColor = '0%';
// console.log(typeof lightColor);
// console.log(theme);
// let lightColor = '90%'; // 0 for black, 90 for 
var sketch = Sketch.create(),
    center = {
        x: (sketch.width / 2),
        y: sketch.height / 2
            // x: 30,
            // y: 30
    },
    orbs = [],
    dt = 10,
    countRandom = Math.floor(Math.random() * (150 - 5) + 5);
scaleRandom = Math.floor(Math.random() * (1 - 1) + 1);
speedRandom = Math.floor(Math.random() * (200 - 20) + 20);
jitterRadiusRandom = Math.floor(Math.random() * (1 - 1) + 1);
lightAlphaRandom = Math.floor(Math.random() * (20 - 10) + 10);
opt = {
    total: 0,
    count: countRandom,
    spacing: 2,
    speed: speedRandom,
    scale: scaleRandom,
    jitterRadius: 0,
    // jitterHue: 0,
    clearAlpha: 10,
    toggleOrbitals: true,
    orbitalAlpha: 1000,
    toggleLight: true,
    lightAlpha: lightAlphaRandom, // change this to 0 to turn off center light
    clear: function() {
        sketch.clearRect(0, 0, sketch.width, sketch.height), (orbs.length = 0);
    }
};
console.log(sketch);

var Orb = function(x, y) {
    var dx = x / opt.scale - center.x / opt.scale,
        dy = y / opt.scale - center.y / opt.scale;
    this.angle = atan2(dy, dx);
    this.lastAngle = this.angle;
    this.radius = sqrt(dx * dx + dy * dy);
    this.size = this.radius / 300 + 1;
    this.speed = (random(1, 10) / 300000) * this.radius + 0.015;
};

Orb.prototype.update = function() {
    this.lastAngle = this.angle;
    this.angle += this.speed * (opt.speed / 50) * dt;
    this.x = this.radius * cos(this.angle);
    this.y = this.radius * sin(this.angle);
};

Orb.prototype.render = function() {
    if (opt.toggleOrbitals) {
        var radius =
            opt.jitterRadius === 0 ?
            this.radius :
            this.radius + random(-opt.jitterRadius, opt.jitterRadius);
        radius = opt.jitterRadius != 0 && radius < 0 ? 0.001 : radius;
        sketch.strokeStyle = `hsla( ${((this.angle + 90) / (PI / 180))}, 100%, ${orbsColor}, ${opt.orbitalAlpha / 100} )`;
        sketch.lineWidth = this.size;
        // sketch.lineWidth = 100;
        sketch.beginPath();
        if (opt.speed >= 0) {
            sketch.arc(0, 0, radius, this.lastAngle, this.angle + 0.001, false);
        } else {
            sketch.arc(0, 0, radius, this.angle, this.lastAngle + 0.001, false);
        }
        sketch.stroke();
        sketch.closePath();
    }
    // change the lightAlpha / 1000 to 100 to return to original
    if (opt.toggleLight) {
        sketch.lineWidth = 0.5;
        // sketch.strokeStyle =
        //     "hsla( " +
        //     ((this.angle + 90) / (PI / 180)) +
        //     ", 100%, 10%, " +
        //     opt.lightAlpha / 200 +
        //     " )";
        sketch.strokeStyle = `hsla( ${((this.angle + 90) / (PI / 180))}, 100%, ${lightColor}, ${opt.lightAlpha / 200} )`;
        sketch.beginPath();
        sketch.moveTo(0, 0);
        sketch.lineTo(this.x, this.y);
        sketch.stroke();
    }
};

var createOrb = function(config) {
    var x = config && config.x ? config.x : sketch.mouse.x,
        y = config && config.y ? config.y : sketch.mouse.y;
    orbs.push(new Orb(x, y));
};

var turnOnMove = function() {
    // sketch.mousemove = createOrb;
    // if (opt.speed < 200) {

    //     opt.speed = opt.speed + 1;
    // }

};

var turnOffMove = function() {
    sketch.mousemove = null;
};

sketch.mousedown = function() {

    createOrb();
    turnOnMove();
};

sketch.mouseup = turnOffMove;

sketch.resize = function() {
    center.x = sketch.width / 2;
    center.y = sketch.height / 2;
    // center.y = sketch.height / 2;
    sketch.lineCap = "butt";
};

sketch.setup = function() {
    while (opt.count--) {
        createOrb({
            x: random(sketch.width / 2 - 300, sketch.width / 2 + 300),
            y: random(sketch.height / 2 - 300, sketch.height / 2 + 300)
        });
    }
};

sketch.clear = function() {
    sketch.globalCompositeOperation = "destination-out";
    sketch.fillStyle = "rgba( 0, 0, 0 , " + opt.clearAlpha / 100 + " )";
    sketch.fillRect(0, 0, sketch.width, sketch.height);
    sketch.globalCompositeOperation = "lighter";
};

sketch.update = function() {
    dt = sketch.dt < 0.1 ? 0.1 : sketch.dt / 16;
    dt = dt > 5 ? 5 : dt;
    var i = orbs.length;
    opt.total = i;
    while (i--) {
        orbs[i].update();
    }
};

sketch.draw = function() {
    sketch.save();
    sketch.translate(center.x + 200, center.y - 5);
    // sketch.scale(opt.scale / 2.75, opt.scale / 2.75);
    sketch.scale(opt.scale / 2.5, opt.scale / 2.5);
    // sketch.scale(0.33, 0.33);
    var i = orbs.length;
    while (i--) {
        orbs[i].render();

    }

    turnOnMove();
    sketch.restore();
};


document.onselectstart = function() {
    return false;
};

// orbiters

const ctx = sketch.canvas.getContext('2d');
// console.log(ctx);
const getRandomFloat = (min, max) => (max - min) * Math.random() + min;
const getRandomInt = (min, max) => Math.floor(getRandomFloat(min, max + 1));

// viewport class
class Viewport {
    constructor() {
        this.update();
    }

    update() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.center = {
            x: this.width / 1.42,
            y: this.height / 2.05,
        };
        sketch.canvas.width = this.width;
        sketch.canvas.height = this.height;
    }
}

const vw = new Viewport();

const maxAmp = 225;
const minAmp = 150; // default
// const minAmp = 1; // testing
// const numParticles = 200; // default
const numParticles = Math.floor(Math.random() * (250 - 150) + 150); // default

class Tracks {
    constructor() {
        const numTracks = 25;
        this.tracks = [];

        for (let i = 0; i < numTracks; ++i) {
            const ratio = i / numTracks;

            this.tracks.push({ amp: (maxAmp - minAmp) * ratio + minAmp });
        }
    }
}

const { tracks } = new Tracks();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        // constants
        let randomAmpSpeed = Math.floor(Math.random() * (2 - 1) + 1);
        this.baseAmp = tracks[getRandomInt(0, tracks.length - 1)].amp;
        this.rotSpeed = getRandomFloat(0.01, 0.0115);
        // this.ampSpeed = 1; // particle speed default
        this.ampSpeed = randomAmpSpeed; // particle speed
        // this.baseRad = 1.5; // particle size default
        this.baseRad = 2; // particle size
        // this.baseRad = 2.5; // particle size
        this.grownAge = 10;

        this.age = 0;
        this.amp = this.baseAmp;
        this.rad = this.baseRad;
        this.angle = getRandomFloat(0, Math.PI * 2);
        this.pos = {
            x: 0,
            y: 0,
        };
    }

    updateRadius() {
        let ratio = (this.amp / this.baseAmp) * 2.5 - 1.5;
        this.rad = ratio * this.baseRad;
    }

    updatePosition() {
        this.angle += this.rotSpeed; // AMAZING, remove this to have zero spin, just inward lightspeed effect
        this.pos.x = vw.center.x + this.amp * Math.cos(this.angle) * 1.2;
        this.pos.y = vw.center.y + this.amp * Math.pow(Math.sin(this.angle), 3) * 0.8;
    }

    draw() {
        const { pos } = this;
        const ageAttack = this.age / this.grownAge;
        const rad = this.rad * ageAttack;
        const alpha = ageAttack;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, 1`;
        ctx.fill();
    }

    update() {
        if (this.age < this.grownAge) {
            this.age++;
        }

        this.amp -= this.ampSpeed;
        this.updateRadius();

        if (this.rad > 0) {
            this.updatePosition();
            this.draw();
        } else {
            this.init();
        }
    }
}

class Emitter {
    constructor() {
        this.particles = [...Array(numParticles).keys()].map(() => new Particle());
    }

    update() {
        this.particles.forEach((particle) => particle.update());
    }
}

const emitter = new Emitter();

// init canvas color with scene overlap
initCanvasColor = () => {
    ctx.fillStyle = `rgba(255, 255, 255, 1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// canvas renderer
const render = () => {
    // alpha value affects trail length
    ctx.fillStyle = `rgba(255, 255, 255, 0.15)`; // smaller the alpha value, longer the trails last
    // ctx.fillStyle = 'rgba( 0, 0, 0 , ' + 10 / 100 + ' )';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    emitter.update();

    requestAnimationFrame(render);
};

// initCanvasColor();
render();

window.addEventListener('resize', () => vw.update());