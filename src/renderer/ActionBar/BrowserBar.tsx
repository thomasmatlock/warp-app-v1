import { Fragment, useState } from 'react';
import './BrowserBar.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
import Modal from '../Modal/Modal';
// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let audioMode = props.audioMode;
  let videoMode = props.videoMode;
  //  const [audioMode, setAudioMode] = useState(true);
  //     const [videoMode, setVideoMode] = useState(false);
  //     const [warpstagramMode, setWarpstagramMode] = useState(false);

  //     window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
  //         // console.log(arg);
  //         setAudioMode(true);
  //         setVideoMode(false);
  //         setWarpstagramMode(false);
  //     });
  //     window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
  //         setVideoMode(true);
  //         setAudioMode(false);
  //         setWarpstagramMode(false);
  //     });
  //         setWarpstagramMode(true);
  //         setAudioMode(false);
  //         setVideoMode(false);
  //     });

  const downloadAudioHandler = () => {
    // window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadAudio',
      [`Download Audio`]
    );
  };

  const downloadVideoHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadVideo',
      [`Download Video`]
    );
  };
  const modalHandler = () => {
    setIsModalOpen(true);
    console.log('modalHandler');
  };
  return (
    <Fragment>
      <div className="browserBar">
        <div className="browserBarDownloadSource ">
          <li className="browserBarDownloadSource__item ">
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">
              <img
                src={browserBarDownloadSourceIcon1}
                className="browserBarDownloadSource__item__icon"
              />

              <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">
                Youtube
              </div>
            </div>
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
              <img
                src={browserBarDownloadSourceIcon2}
                className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"
              />
            </div>
          </li>{' '}
          <li className="browserBarDownloadSource__item ">
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">
              <img
                src={browserBarDownloadSourceIcon1}
                className="browserBarDownloadSource__item__icon"
              />

              <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">
                Youtube
              </div>
            </div>
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
              <img
                src={browserBarDownloadSourceIcon2}
                className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"
              />
            </div>
          </li>
        </div>
        {/* {audioMode && (
          <a
            onClick={downloadAudioHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__audio"
          >
            Download Audio MP3
          </a>
        )}
        {videoMode && (
          <a
            onClick={downloadVideoHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__video"
          >
            Download Video MP4
          </a>
        )} */}
        <a className="browserBarDownloadBtn" onClick={modalHandler}>
          test
        </a>
        {isModalOpen && <Modal />}
      </div>
    </Fragment>
  );
};
export default BrowserBar;
