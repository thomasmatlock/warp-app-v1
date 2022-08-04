import { Fragment, useState } from 'react';
// import fs from './/node_modules/fs';
// import { desktopCapturer } from 'electron';
import './Browser.scss';
// import settingsIcon from '../../../assets/Search/settings_white.svg';
import youtubePlaceholder from '../../../assets/Content/Browser/youtubeDark1.png';
import screenshotPlaceholder from '../../../assets/screenshot.png';

const Browser = () => {
  const [usesWhiteBackground, setUsesWhiteBackground] = useState(false);
  let screenshot: any;
  let browserWindowDimensions = { x: 0, y: 0, width: 0, height: 0 };
  window.electron.ipcRenderer.on('request-browserDimensions', (arg) => {
    browserWindowDimensions = document
      .getElementById('contentPanel__browser__screenshot')
      .getBoundingClientRect();
    // window.electron.ipcRenderer.sendMessage('browserWindowDimensions', [
    //   browserWindowDimensions.x,
    //   browserWindowDimensions.y,
    //   browserWindowDimensions.width,
    //   browserWindowDimensions.height,
    // ]);
    window.electron.ipcRenderer.sendMessage('browserWindowDimensions', {
      x: browserWindowDimensions.x,
      y: browserWindowDimensions.y,
      width: browserWindowDimensions.width,
      height: browserWindowDimensions.height,
      // browserWindowDimensions.x,
      // browserWindowDimensions.y,
      // browserWindowDimensions.width,
      // browserWindowDimensions.height,
    });
  });

  window.electron.ipcRenderer.on('SET_SOURCE', (arg) => {
    document.getElementById('contentPanel__browser__screenshot').src = arg;
  });
  window.electron.ipcRenderer.on('useWhiteBackground', (arg) => {
    setUsesWhiteBackground(true);
  });
  window.electron.ipcRenderer.on('stopUsingWhiteBackground', (arg) => {
    setUsesWhiteBackground(false);
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
        {!usesWhiteBackground && (
          <img
            // onMouseEnter={mouseEnterHandler}
            // onMouseLeave={mouseLeaveHandler}
            id="contentPanel__browser__screenshot"
            src={screenshotPlaceholder}
            // className={usesWhiteBackground ? 'navMainBtnActive' : 'navMainBtn'}
          />
        )}
        {/* <div className="contentPanel__browser__white_background"></div> */}
      </div>
    </Fragment>
  );
};
export default Browser;
