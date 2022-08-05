import { Fragment } from 'react';
import './Browser.scss';
import screenshotPlaceholder from '../../../assets/screenshot.png';

const Browser = () => {
  let screenshot: any;
  let browserWindowDimensions = { x: 0, y: 0, width: 0, height: 0 };
  window.electron.ipcRenderer.on('request-browserDimensions', (arg) => {
    browserWindowDimensions = document
      .getElementById('contentPanel__browser__screenshot')
      .getBoundingClientRect();
    window.electron.ipcRenderer.sendMessage('browserWindowDimensions', {
      x: browserWindowDimensions.x,
      y: browserWindowDimensions.y,
      width: browserWindowDimensions.width,
      height: browserWindowDimensions.height,
    });
  });

  window.electron.ipcRenderer.on('SET_SOURCE', (arg) => {
    document.getElementById('contentPanel__browser__screenshot').src = arg;
  });

  // const mouseEnterHandler = () => {
  //   // console.log('mouse enter');
  //   window.electron.ipcRenderer.sendMessage('browserHovered');
  // };
  // const mouseLeaveHandler = () => {
  //   window.electron.ipcRenderer.sendMessage('browserNotHovered');
  //   // console.log('mouse leave');
  // };
  return (
    <Fragment>
      <div id="contentPanel__browser" className="contentPanel__browser">
        <img
          // onMouseEnter={mouseEnterHandler}
          // onMouseLeave={mouseLeaveHandler}
          id="contentPanel__browser__screenshot"
          src={screenshotPlaceholder}
        />
      </div>
    </Fragment>
  );
};
export default Browser;
