import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import appleIcon from '../public/3rdparty/flaticon/apple.svg';
// import bookmarkIcon from '../public/cta/bookmark.svg';
import bookmarkIcon from '/public/cta/telegram.png';
// import copyIcon from '../public/cta/copy.svg';
import copyIcon from '/public/cta/copy.png';
import { UAParser } from 'ua-parser-js';
import AppContextProvider from '../../store/appContext';

import styles from './CTA.module.scss';
import stylesMobile from './CTAMobile.module.scss';
import mirroredStyles from '/styles/components/mirrored.module.scss';
import * as deviceDetect from 'react-device-detect';

export default function CTA(props: any) {
    const [isHero, setIsHero] = useState(props.section === 'hero' ? true : false);
    // console.log(props);
    const appCtx = useContext(AppContextProvider);
    var parser = new UAParser();
    // console.log(parser);
    const cpu = parser.getCPU().architecture;
    const os = parser.getOS();
    // console.log(os);

    const [osName, setOsName] = useState(os.name?.toLowerCase());
    const [isWindows, setIsWindows] = useState(false);
    const [isMac, setIsMac] = useState(false);
    // console.log(typeof isMobile);

    // const message = `Download Warp ${warpVersion} for ${osName?.includes('win') ? 'Windows' : 'Mac'}`;
    useEffect(() => {
        if (osName?.includes('win')) {
            setIsWindows(true);
        }
        if (osName?.includes('mac')) {
            setIsMac(true);
        }
    }, [osName]);
    let ctaTitleMessage = `Warp is only available for PC and Mac.`;
    let ctaSubTitleMessage = `Save it to download later.`;

    const iconClass = [styles.cta_platform_icon].join(' ');
    const buttonClasses = [styles.nav__cta__btn, styles.glow__dark__cta].join(' ');
    const buttonClassAlt = [styles.nav__cta__btn__alt, styles.glow__light__cta].join(' ');
    const mirroredClass =
        props.message === 'overlap2'
            ? [styles.nav__cta, styles.cta_overlap2, mirroredStyles.mirrored].join(' ')
            : styles.nav__cta;
    const telegramLink = 'https://t.me/share/url?url=https://www.warpdownload.com/';
    const [textToCopy, setTextToCopy] = useState('https://warpdownload.com');
    const [copyText, setCopyText] = useState('Copy link');
    const [copiedText, setCopiedText] = useState('Copied!');
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [titleText, setTitleText] = useState(
        'Warp is only available for PC and Mac. <br /> Save it to download later.'
    );
    const mobileCTA = (
        <div className={stylesMobile.cta_mobile}>
            {/* <h3 className={stylesMobile.cta_mobile__title}>{ctaTitleMessage}</h3> */}
            {/* {!isTextCopied && ( */}
            <h3 className={stylesMobile.cta_mobile__title}>
                Warp is only available for PC and Mac. <br /> Save it to download later.
            </h3>

            {/* <h4 className={stylesMobile.cta_mobile__subtitle}>{ctaSubTitleMessage}</h4> */}
            <div className={stylesMobile.cta_mobile__container}>
                <Link href={telegramLink} className={stylesMobile.cta_mobile__panel}>
                    <Image src={bookmarkIcon} alt="bookmark" className={stylesMobile.cta_mobile__icon}></Image>
                    <p className={stylesMobile.cta_mobile__instruction}>Save to Telegram</p>
                </Link>
                <div
                    className={stylesMobile.cta_mobile__panel}
                    onClick={() => {
                        navigator.clipboard.writeText(textToCopy);
                        setCopyText(copiedText);
                        setIsTextCopied(true);
                    }}
                >
                    <Image src={copyIcon} alt="copy" className={stylesMobile.cta_mobile__icon}></Image>
                    <p className={stylesMobile.cta_mobile__instruction}>{copyText}</p>
                </div>
            </div>
        </div>
    );

    return <>{mobileCTA}</>;
}
