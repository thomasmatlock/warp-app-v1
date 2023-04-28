import styles from './TextMorph.module.scss';
import textBgd from '../../public/backgrounds/nebula_purple2.webp';
const textStyling = {
    backgroundImage: `url('${textBgd.src}')`,
};
export default function TextMorphTitle2() {
    let elts;

    // The strings to morph between. You can change these to anything you want!
    const texts = [
        'professionals',
        'creatives',
        'power users',
        'filmmakers',
        'designers',
        'photographers',
        'editors',
        'content creators',
        'video editors',
        'streamers',
        'social media managers',
        'influencers',
        'busy people',
        'creators',
    ];

    // Controls the speed of morphing
    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
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

        setMorph(fraction);
    }

    // A lot of the magic happens here, this is what applies the blur filter to the text.
    function setMorph(fraction) {
        elts.Suffix2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.Suffix2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        elts.Suffix1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.Suffix1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.Suffix1.textContent = texts[textIndex % texts.length];
        elts.Suffix2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
        morph = 0;
        elts.Suffix2.style.filter = '';
        elts.Suffix2.style.opacity = '100%';

        elts.Suffix1.style.filter = '';
        elts.Suffix1.style.opacity = '0%';
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
                Suffix1: document.getElementById(styles.Suffix1),
                Suffix2: document.getElementById(styles.Suffix2),
            };
            animate();
        }, 500);
    }

    return (
        <h1 id={styles.MorphSuffix}>
            <span id={styles.suffix_static}> All in one, dedicated downloader for </span>
            <div id={styles.suffix_morphing_text}>
                <span id={styles.Suffix1} style={textStyling}></span>
                <span id={styles.Suffix2} style={textStyling}></span>
            </div>
            <svg id={styles.filters1}>
                {/* <svg> */}
                <defs>
                    <filter id={styles.threshold1}>
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
        </h1>
    );
}
