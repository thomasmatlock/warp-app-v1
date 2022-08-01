import { Fragment } from 'react';
import './Browser.scss';
import youtubePlaceholder from '../../../assets/Content/Browser/youtubeDark1.png';

const Browser = () => {
  let browserWindowDimensions = { x: 0, y: 0, width: 0, height: 0 };
  window.electron.ipcRenderer.on('resize', (arg) => {
    // eslint-disable-next-line no-console
    // console.log('resize');
    browserWindowDimensions = document
      .getElementById('contentPanel__browser')
      .getBoundingClientRect();
    // console.log(browserWindowDimensions.width);

    window.electron.ipcRenderer.sendMessage(
      'browserWindowWidth',
      browserWindowDimensions.width
    );
    window.electron.ipcRenderer.sendMessage(
      'browserWindowHeight',
      browserWindowDimensions.height
    );
  });
  window.electron.ipcRenderer.on('resized', (arg) => {
    // eslint-disable-next-line no-console
    // console.log('resize');
    browserWindowDimensions = document
      .getElementById('contentPanel__browser')
      .getBoundingClientRect();
    // console.log(browserWindowDimensions.width);

    window.electron.ipcRenderer.sendMessage(
      'browserWindowWidth',
      browserWindowDimensions.width
    );
    window.electron.ipcRenderer.sendMessage(
      'browserWindowHeight',
      browserWindowDimensions.height
    );
  });
  window.electron.ipcRenderer.on('will-resize', (arg) => {
    // eslint-disable-next-line no-console
    // console.log('resize');
    browserWindowDimensions = document
      .getElementById('contentPanel__browser')
      .getBoundingClientRect();
    // console.log(browserWindowDimensions.width);

    window.electron.ipcRenderer.sendMessage(
      'browserWindowWidth',
      browserWindowDimensions.width
    );
    window.electron.ipcRenderer.sendMessage(
      'browserWindowHeight',
      browserWindowDimensions.height
    );
  });
  // let browserCoords = document
  //   .getElementById('contentPanel__browser')
  //   .getBoundingClientRect();
  // console.log(browserCoords.x);

  // // window.electron.ipcRenderer.sendMessage(
  // //   'browserCoords',
  // //   document.getElementById('contentPanel__browser').getBoundingClientRect()
  // // );

  return (
    <Fragment>
      <div id="contentPanel__browser" className="contentPanel__browser">
        {/* <img src={youtubePlaceholder} alt="" /> */}
      </div>
    </Fragment>
  );
};
export default Browser;
