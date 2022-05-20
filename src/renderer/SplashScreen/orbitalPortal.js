const Sketch = require('./sketch/sketch.min.js');
const theme = require('./theme.js');

let orbsColor = theme.theme === 'dark' ? '100% ' : '0%';
// let lightColor = theme === 'dark' ? '90% ' : '0%';
// let orbsColor = '100%'; // 0 for black, 100 for white
let lightColor = '90%'; // 0 for black, 90 for white
var sketch = Sketch.create(),
    center = {
        x: (sketch.width / 2),
        y: sketch.height / 2
            // x: 30,
            // y: 30
    },
    orbs = [],
    dt = 10,
    countRandom = Math.floor(Math.random() * (100 - 5) + 5);
scaleRandom = Math.floor(Math.random() * (1 - 1) + 1);
speedRandom = Math.floor(Math.random() * (200 - 20) + 20);
jitterRadiusRandom = Math.floor(Math.random() * (1 - 1) + 1);
lightAlphaRandom = Math.floor(Math.random() * (20 - 5) + 5);
opt = {
    total: 0,
    count: countRandom,
    spacing: 2,
    speed: speedRandom,
    scale: scaleRandom,
    jitterRadius: 0,
    jitterHue: 0,
    clearAlpha: 10,
    toggleOrbitals: true,
    orbitalAlpha: 100,
    toggleLight: true,
    lightAlpha: lightAlphaRandom, // change this to 0 to turn off center light
    clear: function() {
        sketch.clearRect(0, 0, sketch.width, sketch.height), (orbs.length = 0);
    }
};

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
        sketch.strokeStyle =
            "hsla( " +
            ((this.angle + 90) / (PI / 180) + random(-opt.jitterHue, opt.jitterHue)) +
            ", 100%, " + `${orbsColor}`,
            opt.orbitalAlpha / 100 +
            " )";
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
        sketch.strokeStyle =
            "hsla( " +
            ((this.angle + 90) / (PI / 180) + random(-opt.jitterHue, opt.jitterHue)) +
            ", 100%, 90%, " +
            opt.lightAlpha / 200 +
            " )";
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
    sketch.mousemove = createOrb;
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

// gui = new dat.GUI({
//     autoPlace: false
// })
// gui.add(opt, "total").name("Total Orbitals").listen();
// gui.add(opt, "speed").min(-300).max(300).step(1).name("Speed");
// gui.add(opt, "scale").min(0.5).max(5).step(0.001).name("Scale");
// gui.add(opt, "jitterRadius").min(0).max(5).step(0.001).name("Radius Jitter");
// gui.add(opt, "jitterHue").min(0).max(90).step(1).name("Hue Jitter");
// gui.add(opt, "clearAlpha").min(0).max(100).step(1).name("Clear Alpha");
// gui.add(opt, "toggleOrbitals").name("Toggle Orbitals");
// gui.add(opt, "orbitalAlpha").min(0).max(100).step(1).name("Orbital Alpha");
// gui.add(opt, "toggleLight").name("Toggle Light");
// gui.add(opt, "lightAlpha").min(0).max(100).step(1).name("Light Alpha");

// gui.add(opt, "clear").name("Clear");
// customContainer = document.getElementById("gui");
// customContainer.appendChild(gui.domElement);

document.onselectstart = function() {
    return false;
};