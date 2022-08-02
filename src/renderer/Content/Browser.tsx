import { Fragment } from 'react';
// import fs from './/node_modules/fs';
// import { desktopCapturer } from 'electron';
import './Browser.scss';
// import settingsIcon from '../../../assets/Search/settings_white.svg';
import youtubePlaceholder from '../../../assets/Content/Browser/youtubeDark1.png';
import screenshotPlaceholder from '../../../assets/screenshot.png';

const Browser = () => {
  let screenshot: any;
  let browserWindowDimensions = { x: 0, y: 0, width: 0, height: 0 };
  // window.electron.ipcRenderer.on('resize', (arg) => {
  //   // eslint-disable-next-line no-console
  //   // console.log('resize');
  //   browserWindowDimensions = document
  //     .getElementById('contentPanel__browser')
  //     .getBoundingClientRect();
  //   // console.log(browserWindowDimensions.width);

  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowWidth',
  //     browserWindowDimensions.width
  //   );
  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowHeight',
  //     browserWindowDimensions.height
  //   );
  // });
  // window.electron.ipcRenderer.on('resized', (arg) => {
  //   // eslint-disable-next-line no-console
  //   // console.log('resize');
  //   browserWindowDimensions = document
  //     .getElementById('contentPanel__browser')
  //     .getBoundingClientRect();
  //   // console.log(browserWindowDimensions.width);

  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowWidth',
  //     browserWindowDimensions.width
  //   );
  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowHeight',
  //     browserWindowDimensions.height
  //   );
  // });
  // window.electron.ipcRenderer.on('will-resize', (arg) => {
  //   // eslint-disable-next-line no-console
  //   // console.log('resize');
  //   browserWindowDimensions = document
  //     .getElementById('contentPanel__browser')
  //     .getBoundingClientRect();
  //   // console.log(browserWindowDimensions.width);

  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowWidth',
  //     browserWindowDimensions.width
  //   );
  //   window.electron.ipcRenderer.sendMessage(
  //     'browserWindowHeight',
  //     browserWindowDimensions.height
  //   );
  // });

  window.electron.ipcRenderer.on('SET_SOURCE', (arg) => {
    // eslint-disable-next-line no-console
    // console.log(arg);

    // console.log(arg.thumbnail.getSize());
    document.getElementById('contentPanel__browser__screenshot').src = arg;
  });

  const screenshotter = () => {
    // console.log(desktopCapturer);

    // console.log('screenshotting');
    window.electron.ipcRenderer.sendMessage('screenshotting');
  };
  return (
    <Fragment>
      <div id="contentPanel__browser" className="contentPanel__browser">
        <img
          id="contentPanel__browser__screenshot"
          src={screenshotPlaceholder}
        />
        {/* <button onClick={screenshotter} id="screenshot">
          screenshot
        </button> */}
      </div>
    </Fragment>
  );
};
export default Browser;
