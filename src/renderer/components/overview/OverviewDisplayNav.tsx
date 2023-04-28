import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import styles from './Overview.module.scss';
import OverviewDisplayContextProvider from '../../store/overviewDisplayDownloadsDataContext';
import ThemeContext from '../../store/themeContext';
import logoIcon1 from '../../public/logo/logo_blackhole.svg';
import logoText from '../../public/logo/logo_text.svg';
import audioIcon from '../../public/Nav/audio.svg';
import videoIcon from '../../public/Nav/video.svg';
import InstagramIcon from '../../public/Nav/warpstagram.svg';
import { UAParser } from 'ua-parser-js';
import appleIcon from '../../public/3rdparty/flaticon/apple.svg';
import windowsIcon from '../../public/3rdparty/flaticon/windows.svg';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    // console.log(overviewDisplayCtx);
    var parser = new UAParser();
    const os = parser.getOS();

    const [isWindows, setIsWindows] = useState(false);
    const [isMac, setIsMac] = useState(false);
    const [osName, setOsName] = useState(os.name?.toLowerCase());

    useEffect(() => {
        if (osName?.includes('win')) {
            setIsWindows(true);
        }
        if (osName?.includes('mac')) {
            setIsMac(true);
        }
    }, [osName]);
    // console.log(isWindows);

    const themeCtx = useContext(ThemeContext);

    let appVersion = '2.1.3';
    return (
        <>
            <div
                // onMouseEnter={mouseEnterHandler}
                // onMouseLeave={mouseLeaveHandler}
                className={styles.navMain}
                style={
                    themeCtx.isDarkTheme
                        ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
                        : {
                              backgroundColor: themeCtx.nav.light.backgroundColor,
                          }
                }
            >
                <div className={styles.logoContainer}>
                    <a className={styles.navLogo}>
                        <Image
                            className={styles.navLogoImg}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(0%)' }
                                    : {
                                          filter: 'invert(100%)',
                                      }
                            }
                            alt="icon"
                            src={logoIcon1}
                            // layout="fill"
                        />
                        <Image
                            className={styles.navLogoText}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(0%)' }
                                    : {
                                          filter: 'invert(100%)',
                                      }
                            }
                            alt="icon"
                            src={logoText}
                        />
                    </a>
                </div>
                <div className={styles.buttonContainer}>
                    <div
                        // onClick={navCtx.audioModeHandler}
                        onMouseEnter={overviewDisplayCtx.audioModeHandler}
                        // onClick={overviewDisplayCtx.audioModeHandler}
                        id={styles.navMainBtnAudio}
                        // className={navCtx.audioMode ? 'navMainBtnActive' : 'navMainBtn'}
                        className={overviewDisplayCtx.audioMode ? styles.navMainBtnActive : styles.navMainBtn}
                    >
                        <Image
                            // className={navCtx.audioMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
                            className={overviewDisplayCtx.audioMode ? styles.navMainBtn__icon : styles.navMainBtn__icon}
                            style={themeCtx.isDarkTheme ? { filter: 'invert(100%)' } : { filter: 'invert(0%)' }}
                            src={audioIcon}
                            alt="icon"
                            onMouseEnter={overviewDisplayCtx.audioModeHandler}
                        />
                        <p onMouseEnter={overviewDisplayCtx.audioModeHandler}>Audio</p>
                    </div>
                    <div
                        // onClick={navCtx.videoModeHandler}

                        onMouseEnter={overviewDisplayCtx.videoModeHandler}
                        // onClick={overviewDisplayCtx.videoModeHandler}
                        id={styles.navMainBtnVideo}
                        className={overviewDisplayCtx.videoMode ? styles.navMainBtnActive : styles.navMainBtn}
                    >
                        <Image
                            className={overviewDisplayCtx.videoMode ? styles.navMainBtn__icon : styles.navMainBtn__icon}
                            src={videoIcon}
                            alt="icon"
                            onMouseEnter={overviewDisplayCtx.videoModeHandler}
                        />
                        <p onMouseEnter={overviewDisplayCtx.videoModeHandler}>Video</p>
                        {/* Video */}
                    </div>
                    <div
                        onMouseEnter={overviewDisplayCtx.warpstagramModeHandler}
                        // onClick={overviewDisplayCtx.warpstagramModeHandler}
                        id={styles.navMainBtnWarpstagram}
                        // className={overviewDisplayCtx.warpstagramMode ? 'navMainBtnActive' : 'navMainBtn'}
                        className={overviewDisplayCtx.warpstagramMode ? styles.navMainBtnActive : styles.navMainBtn}
                    >
                        <Image
                            // className={navCtx.warpstagramMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
                            className={
                                overviewDisplayCtx.warpstagramMode ? styles.navMainBtn__icon : styles.navMainBtn__icon
                            }
                            src={InstagramIcon}
                            alt="icon"
                            onMouseEnter={overviewDisplayCtx.warpstagramModeHandler}
                        />
                        <p onMouseEnter={overviewDisplayCtx.warpstagramModeHandler}>Warpstagram</p>
                    </div>
                </div>
                <div className={styles.logoContainer}>
                    <a className={styles.navLogo}>
                        {isWindows && <Image className={styles.platformIcon} src={windowsIcon} alt="icon" />}
                        {isMac && <Image className={styles.platformIcon} src={appleIcon} alt="icon" />}
                        <p
                            className={styles.navVersion}
                            style={
                                themeCtx.isDarkTheme
                                    ? { color: themeCtx.nav.dark.color }
                                    : {
                                          color: themeCtx.nav.light.color,
                                      }
                            }
                        >
                            {`${appVersion}`}
                        </p>
                    </a>
                </div>
            </div>
        </>
    );
}
