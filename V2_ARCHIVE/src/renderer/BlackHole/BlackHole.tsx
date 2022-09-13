// import ScriptTag from 'react-script-tag';
import React from 'react';
// import './App.css';

const BlackHole = () => {
  React.useEffect(() => {
    const c = document.getElementById('myCanvas');
    const ctx = c.getContext('2d');
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }, []);

  const addPoint = () => {
    const ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.beginPath();
    ctx.arc(100, 50, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  };

  return (
    <div>
      {/* <h1>HTML5 Canvas + React.js</h1> */}
      <canvas
        id="myCanvas"
        position="absolute"
        width="1000px"
        height="500px"
        style={{ border: '1px solid #d3d3d3' }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
      {/* <button onClick={() => addPoint()}>Add Point</button> */}
    </div>
  );
};
export default BlackHole;
