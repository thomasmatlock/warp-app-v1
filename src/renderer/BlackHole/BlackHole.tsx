import React, { useRef, useEffect } from 'react';
import Sketch from './sketch.min.js';
// const Canvas = (props) => {
//   const canvasRef = useRef(null);
//   const canvas = canvasRef.current;
//   const context = canvas.getContext('2d');

//   return <canvas ref={canvasRef} {...props} />;
// };
const Canvas = (props) => {
  const canvasRef = useRef(null);
  ///////////////////////////////////////////////////////
  let orbsColor = '0%';
  let lightColor = '15%'; // 0 for black, 90 for
  ///////////////////////////////////////////////////////
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // canvas.style.position = 'relative';
    // canvas.style.position = 'absolute';
    // canvas.style.top = '0';
    let frameCount = 0;
    let animationFrameId: number;
    // console.log('canvas', canvas);
    console.log(context);
    ///////////////////////////////////////////////////////
    var sketch = Sketch.create(),
      center = {
        x: sketch.width / 2, // this is for width of portal
        y: sketch.height / 2, // this is for height of portal
        // x: -300,
        // y: -300,
      },
      orbs = [],
      dt = 10,
      countRandom = Math.floor(Math.random() * (75 - 25) + 25);
    scaleRandom = Math.floor(Math.random() * (1 - 1) + 1);
    // speedRandom = Math.floor(Math.random() * (300 - 20) + 20);
    speedRandom = Math.floor(Math.random() * (20 - 20) + 20);
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
      clear: function () {
        sketch.clearRect(0, 0, sketch.width, sketch.height), (orbs.length = 0);
      },
    };
    sketch = canvas.getContext('2d');

    sketch.canvas.style.position = 'absolute';
    // sketch.canvas.style.position = 'fixed';
    // sketch.canvas.style.top = '0';
    sketch.canvas.style.right = '0';
    sketch.canvas.style.width = '50%';
    sketch.canvas.style.border = '1px solid #000';
    sketch.canvas.style.zIndex = 2;
    console.log(sketch);
    var Orb = function (x, y) {
      var dx = x / opt.scale - center.x / opt.scale,
        dy = y / opt.scale - center.y / opt.scale;
      this.angle = atan2(dy, dx);
      this.lastAngle = this.angle;
      this.radius = sqrt(dx * dx + dy * dy);
      this.size = this.radius / 300 + 1;
      this.speed = (random(1, 10) / 315000) * this.radius + 0.015;
    };

    Orb.prototype.update = function () {
      this.lastAngle = this.angle;
      this.angle += this.speed * (opt.speed / 50) * dt;
      this.x = this.radius * cos(this.angle);
      this.y = this.radius * sin(this.angle);
    };
    Orb.prototype.render = function () {
      if (opt.toggleOrbitals) {
        var radius =
          opt.jitterRadius === 0
            ? this.radius
            : this.radius + random(-opt.jitterRadius, opt.jitterRadius);
        radius = opt.jitterRadius != 0 && radius < 0 ? 0.001 : radius;
        sketch.strokeStyle = `hsla( ${
          (this.angle + 90) / (PI / 180)
        }, 100%, ${orbsColor}, ${opt.orbitalAlpha / 100} )`;
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
        sketch.lineWidth = 0.2;
        sketch.strokeStyle = `hsla( ${
          (this.angle + 90) / (PI / 180)
        }, 100%, ${lightColor}, ${opt.lightAlpha / 200} )`;
        sketch.beginPath();
        sketch.moveTo(0, 0);
        sketch.lineTo(this.x, this.y);
        sketch.stroke();
      }
    };
    var createOrb = function (config) {
      var x = config && config.x ? config.x : sketch.mouse.x,
        y = config && config.y ? config.y : sketch.mouse.y;
      orbs.push(new Orb(x, y));
    };

    var turnOnMove = function () {
      sketch.mousemove = createOrb;
    };
    var turnOffMove = function () {
      sketch.mousemove = null;
    };

    sketch.mousedown = function () {
      createOrb();
      turnOnMove();
    };
    sketch.mouseup = turnOffMove;

    sketch.resize = function () {
      center.x = sketch.width / 2;
      center.y = sketch.height / 2;
      sketch.lineCap = 'round';
    };

    sketch.setup = function () {
      while (opt.count--) {
        createOrb({
          x: random(sketch.width / 2 - 300, sketch.width / 2 + 300),
          y: random(sketch.height / 2 - 300, sketch.height / 2 + 300),
        });
      }
    };

    sketch.clear = function () {
      sketch.globalCompositeOperation = 'destination-out';
      sketch.fillStyle = 'rgba( 0, 0, 0 , ' + opt.clearAlpha / 100 + ' )';
      sketch.fillRect(0, 0, sketch.width, sketch.height);
      sketch.globalCompositeOperation = 'lighter';
    };

    sketch.update = function () {
      dt = sketch.dt < 0.1 ? 0.1 : sketch.dt / 16;
      dt = dt > 5 ? 5 : dt;
      var i = orbs.length;
      opt.total = i;
      while (i--) {
        orbs[i].update();
      }
    };
    // center.x = center.x + 450;
    let initialSpeed = opt.speed;
    let maxSpeedReached = false;
    let speedThreshold = 250; // WEBSITE THRESHOLD
    // let speedThreshold = 2500; // APP THRESHOLD
    sketch.draw = function () {
      sketch.save();

      if (opt.speed < speedThreshold && !maxSpeedReached) {
        // if (opt.speed < speedThreshold) {
        opt.speed = opt.speed + 0.5;
        // console.log(opt.speed);
        opt.speed = opt.speed + 20;
        if (opt.speed > speedThreshold - 20) {
          // opt.speed = opt.speed + 20;
          maxSpeedReached = true;
        }
      }
      if (maxSpeedReached && opt.speed > initialSpeed) {
        // opt.speed = opt.speed - 10; // UNCOMMENT THIS TO MAKE THE SPEED DECREASE
      }
      sketch.translate(center.x + 5, center.y - 80); // only X calculated, Y is literal
      sketch.scale(opt.scale / 2.75, opt.scale / 2.75); // size of spinners container
      sketch.scale(1.33, 1.33);
      var i = orbs.length;
      while (i--) {
        orbs[i].render();
      }

      turnOnMove();
      sketch.restore();
    };
    ///////////////////////////////////////////////////////

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
