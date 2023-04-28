import * as deviceDetect from 'react-device-detect';
import { useState } from 'react';

import TextMorphStyles from '../components/Headings/TextMorph.module.scss';
import featureStyles from '../pages/sections/features/FeatureCombined.module.scss';

export default function HoverTextController(props: any) {
    let elts;
    const [isMobile, setIsMobile] = useState(false);

    setTimeout(() => {
        if (deviceDetect.isAndroid) {
            setIsMobile(true);
        }
        if (deviceDetect.isIOS) {
            setIsMobile(true);
        }
    }, 100);
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            elts = {
                Suffix1: document.getElementById(TextMorphStyles.Suffix1),
                Suffix2: document.getElementById(TextMorphStyles.Suffix2),
                Prefix1: document.getElementById(TextMorphStyles.Prefix1),
                Prefix2: document.getElementById(TextMorphStyles.Prefix2),
            };

            let mouseX, mouseY;
            let traX, traY;
            if (!isMobile) {
                window.document.onmousemove = function (e) {
                    mouseX = e.pageX;
                    mouseY = e.pageY;
                    traX = (1 * mouseX) / 10;
                    traY = (1 * mouseY) / 100;
                    const featureTitle = document.getElementById(featureStyles.feature_audio_title_colored__desktop);
                    if (featureTitle) featureTitle.style.backgroundPosition = traX + '%' + traY + '%';
                    const featureTitle2 = document.getElementById(featureStyles.feature_video_title_colored__desktop);
                    if (featureTitle2) featureTitle2.style.backgroundPosition = traX / 5 + '%' + traY + '%';
                    const featureTitle3 = document.getElementById(
                        featureStyles.feature_warpstagram_title_colored__desktop
                    );
                    if (featureTitle3) featureTitle3.style.backgroundPosition = traX / 1.5 + '%' + traY + '%';
                    const Suffix1 = document.getElementById(TextMorphStyles.Suffix1);
                    if (Suffix1) Suffix1.style.backgroundPosition = traX + '%' + traY + '%';
                    const Suffix2 = document.getElementById(TextMorphStyles.Suffix2);
                    if (Suffix2) Suffix2.style.backgroundPosition = traX + '%' + traY + '%';
                    // const Prefix1 = document.getElementById(TextMorphStyles.Prefix1);
                    // if (Prefix1) Prefix1.style.backgroundPosition = traX + '%' + traY + '%';
                    // const Prefix2 = document.getElementById(TextMorphStyles.Prefix2);
                    // if (Prefix2) Prefix2.style.backgroundPosition = traX + '%' + traY + '%';
                };
            }
        }, 250);
    }

    return <div></div>;
}
