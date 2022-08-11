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

  ///////////////////////////////////////////////////////
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // canvas.style.position = 'relative';
    canvas.style.position = 'absolute';

    canvas.style.top = '129px';
    canvas.style.right = '0';
    canvas.style.zIndex = '1';
    canvas.style.width = '50%';
    canvas.style.boxSizing = 'border-box';
    canvas.style.height = 'calc(100% - 193px)';
    canvas.style.pointerEvents = 'none';
    canvas.style.border = '1px solid #4a4a4a';
    let frameCount = 0;
    let animationFrameId: number;
    // console.log('canvas', canvas);
    console.log(context);

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    // return () => {
    //   window.cancelAnimationFrame(animationFrameId);
    // };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
