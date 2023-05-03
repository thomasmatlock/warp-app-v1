import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import appleIcon from '/public/3rdparty/flaticon/apple.svg';
import windowsIcon from '/public/3rdparty/flaticon/windows.svg';
import { UAParser } from 'ua-parser-js';
import AppContextProvider from '../../store/appContext';

import styles from './CTA.module.scss';
import stylesMobile from './CTAMobile.module.scss';
import mirroredStyles from '/styles/components/mirrored.module.scss';
export default function CTA(props: any) {
    const [isHero, setIsHero] = useState(props.section === 'hero' ? true : false);
    // console.log(props);
    let warpVersion = '2.1.3';
    warpVersion = '';
    const appCtx = useContext(AppContextProvider);
    var parser = new UAParser();
    // console.log(parser);
    const cpu = parser.getCPU().architecture;
    const os = parser.getOS();
    // console.log(os);

    const [osName, setOsName] = useState(os.name?.toLowerCase());
    const [isWindows, setIsWindows] = useState(false);
    const [isMac, setIsMac] = useState(false);
    const [isMobile, setIsMobile] = useState(props.mobile);
    // console.log(typeof isMobile);

    const message = `Download Warp ${warpVersion} for ${osName?.includes('win') ? 'Windows' : 'Mac'}`;
    useEffect(() => {
        if (osName?.includes('win')) {
            setIsWindows(true);
        }
        if (osName?.includes('mac')) {
            setIsMac(true);
        }
    }, [osName]);
    //   style={{
    //             backgroundImage: isHero
    //                 ? 'linear-gradient(90deg, #19a9fc, #5351fc)'
    //                 : ' linear-gradient(to left, #da2c4d 0%, #f8ab37 100%)',
    //         }}
    const iconClass = [styles.cta_platform_icon].join(' ');
    const buttonClasses = [styles.nav__cta__btn, styles.glow__dark__cta].join(' ');
    const buttonClassAlt = [styles.nav__cta__btn__alt, styles.glow__light__cta].join(' ');
    const mirroredClass =
        props.message === 'overlap2'
            ? [styles.nav__cta, styles.cta_overlap2, mirroredStyles.mirrored].join(' ')
            : styles.nav__cta;
    const desktopCTA = (
        <div className={mirroredClass}>
            <Link
                id={styles.user_download__header}
                href={isMac ? appCtx.macArm64DMG : appCtx.windowsExeURL}
                className={isHero ? buttonClassAlt : buttonClasses}
            >
                {isWindows && <Image className={iconClass} src={windowsIcon} alt="" />}
                {isMac && <Image className={iconClass} src={appleIcon} alt="" />}
                {isWindows && props.message === '' && (
                    <p className={styles.cta_platform_text}>Download Warp for Windows</p>
                )}
                {isMac && props.message === '' && <p className={styles.cta_platform_text}>{message}</p>}
                {isWindows && props.message === 'overlap2' && (
                    <p className={styles.cta_platform_text}>Install Warp for Windows now</p>
                )}
                {isMac && props.message === 'overlap2' && (
                    <p className={styles.cta_platform_text}>Install Warp for Mac now</p>
                )}
            </Link>
        </div>
    );
    const mobileCTA = (
        <div className={stylesMobile.cta_mobile}>
            <h1>hello</h1>
        </div>
    );

    return <>{desktopCTA}</>;
}
