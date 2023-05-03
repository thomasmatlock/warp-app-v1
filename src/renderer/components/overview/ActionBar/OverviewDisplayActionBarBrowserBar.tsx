import Link from 'next/link';
import Image from 'next/image';
import videoIcon from '../assets/video.svg';
import IconFileTypeAudio from '../assets/audio.svg';
import { useContext } from 'react';
import styles from '../Overview.module.scss';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import ThemeContext from '../../../store/themeContext';
import backIcon from '../assets/back.svg';
import forwardIcon from '../assets/forward.svg';
import reloadIcon from '../assets/reload.svg';
export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);
    const filterBarMenuLeft = [styles.filterBar__menu, styles.filterBar__menu__left].join(' ');
    const menuItem = [styles.filterBar__menu__item, styles.filterBar__menu__item__sort].join(' ');
    const browserBarDownloadBtn = [styles.browserBarDownloadBtn, styles.browserBarDownloadBtn__audio].join(' ');
    const browserBarDownloadBtnVideo = [styles.browserBarDownloadBtn, styles.browserBarDownloadBtn__video].join(' ');
    return (
        // <>
        <div className={styles.browserBar}>
            <div className={filterBarMenuLeft}>
                {/* {!actionBarCtx.isBrowserPanelCollapsed && ( */}
                <div
                    // onClick={browserGoBackHandler}
                    className={menuItem}
                >
                    <Image
                        alt="Go Back"
                        src={backIcon}
                        title="Go Back"
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                        // className={menuItem}
                    />
                </div>
                {/* )} */}
                {/* {!actionBarCtx.isBrowserPanelCollapsed && ( */}
                <div
                    // onClick={browserGoForwardHandler}
                    className={menuItem}
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                >
                    <Image
                        alt="Go Forward"
                        src={forwardIcon}
                        title="Go Forward"
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div>
                {/* )} */}
                {/* {!actionBarCtx.isBrowserPanelCollapsed && ( */}
                <div
                    // onClick={browserReloadHandler}
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                    className={menuItem}
                >
                    <Image
                        alt="Reload"
                        src={reloadIcon}
                        title="Reload"
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div>
                {/* )} */}
            </div>
            {/* {!actionBarCtx.isBrowserPanelCollapsed && <BrowserBarDownloadSource />} */}

            {overviewDisplayCtx.audioMode && (
                <div
                    // onClick={downloadAudioHandler}
                    className={
                        // downloadsCtx.downloadsAudio.length === 0
                        // ? 'browserBarDownloadBtn browserBarDownloadBtn__audio highlight'
                        // : 'browserBarDownloadBtn browserBarDownloadBtn__audio'
                        browserBarDownloadBtn
                    }
                >
                    {/* {!canDownload && <Loader />} */}
                    <Image src={IconFileTypeAudio} alt="playlistVideoIcon" loading="lazy" />
                    <p> Download Audio MP3</p>
                </div>
            )}
            {overviewDisplayCtx.videoMode && (
                <div
                    // onClick={downloadVideoHandler}
                    className={
                        // downloadsCtx.downloadsVideo.length === 0
                        // ? 'browserBarDownloadBtn browserBarDownloadBtn__video highlight'
                        // : 'browserBarDownloadBtn browserBarDownloadBtn__video'
                        browserBarDownloadBtnVideo
                    }
                >
                    {/* {!canDownload && <Loader />} */}
                    {/* {canDownload && ( */}
                    <Image
                        src={videoIcon}
                        // style={
                        //   themeCtx.isDarkTheme
                        //     ? { filter: 'grayscale(100%) invert(100%)' }
                        //     : {
                        //         filter: 'invert(100%)',
                        //       }
                        // }
                        alt="playlistVideoIcon"
                        loading="lazy"
                    />
                    {/* )} */}
                    {/* {actionBarCtx.videoExists && canDownload && */}
                    <p> Download Video MP4</p>
                </div>
            )}
        </div>
    );
}
