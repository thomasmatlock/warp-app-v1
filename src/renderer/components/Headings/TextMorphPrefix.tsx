import Link from 'next/link';
import Image from 'next/image';
// import styles from '../../styles/wrapup/wrapup_combined.module.scss';
import styles from './TextMorph.module.scss';
// import textBgd from '../../public/backgrounds/warpstagram_titleText.png';
// import textBgd from '../../public/backgrounds/nebula_purple2.webp';
import textBgd from '../../public/backgrounds/warpstagram_titleText.webp';

const textStyling = {
    backgroundImage: `url('${textBgd.src}')`,
    backgroundSize: 'cover',
};
export default function TextMorphTitle2() {
    let elts;

    const texts2 = ['Work flows', 'Downloads', 'Content creation', 'Searches', 'Audio files', 'Video files'];

    // Controls the speed of morphing
    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts2.length - 1;
    let time = new Date().getTime();
    let morph = 0;
    let cooldown = cooldownTime;

    function doMorph() {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;
        let fraction2 = morph / morphTime;

        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }
        if (fraction2 > 1) {
            cooldown = cooldownTime;
            fraction2 = 1;
        }
        // console.log(fraction2);

        // setMorph(fraction);
        setMorph2(fraction2);
    }

    function setMorph2(fraction) {
        elts.Prefix2.style.filter = `blur(${Math.min(8 / fraction - 8, 500)}px)`;
        elts.Prefix2.style.opacity = `${Math.pow(fraction, 0.4) * 500}%`;

        fraction = 1 - fraction;
        elts.Prefix1.style.filter = `blur(${Math.min(8 / fraction - 8, 500)}px)`;
        elts.Prefix1.style.opacity = `${Math.pow(fraction, 0.4) * 500}%`;

        elts.Prefix1.textContent = texts2[textIndex % texts2.length];
        elts.Prefix2.textContent = texts2[(textIndex + 1) % texts2.length];
    }

    function doCooldown() {
        morph = 0;

        elts.Prefix2.style.filter = '';
        elts.Prefix2.style.opacity = '100%';

        elts.Prefix1.style.filter = '';
        elts.Prefix1.style.opacity = '0%';
    }

    // Animation loop, which is called every frame.
    const animate = () => {
        requestAnimationFrame(animate);

        let newTime = new Date().getTime();

        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }

            doMorph();
        } else {
            doCooldown();
        }
    };

    // Start the animation.
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            elts = {
                Prefix1: document.getElementById(styles.Prefix1),
                Prefix2: document.getElementById(styles.Prefix2),
            };
            animate();
        }, 250);
    }

    return (
        // <h1 className={h1Class}>
        <h1 id={styles.MorphPrefix}>
            <div id={styles.prefix_morphing_text}>
                <span id={styles.Prefix1} style={textStyling}></span>
                <span id={styles.Prefix2} style={textStyling}></span>
            </div>

            <svg id={styles.filters2}>
                <defs>
                    <filter id={styles.threshold2}>
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>
            <span id={styles.prefix_static}>at warp speeds.</span>
        </h1>
    );
}
