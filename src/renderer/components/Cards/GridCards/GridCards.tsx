import styles from './GridCards.module.scss';

import 'font-awesome/css/font-awesome.min.css';
import HoverCardsListItem from './GridCard';
import { useContext } from 'react';
import HoverCardsContext from '../../../store/gridCardsContext';

export default function GridCards(props: any) {
    const cardsCtx = useContext(HoverCardsContext);
    // console.log(cardsCtx.cardsData);
    const items = cardsCtx.cardsData;
    // set active class
    const mouseEnterHandler = (e: any) => {
        // cardsCtx.toggleUserInteracting();
    };
    const mouseLeaveHandler = (e: any) => {
        // cardsCtx.toggleUserInteracting();
    };

    if (typeof window !== 'undefined') {
        // window.addEventListener('blur', function () {
        //     console.log('blur');
        // });
        // window.addEventListener('focus', function () {
        //     console.log('focus');
        // });
        // console.log(window.outerWidth, `x`, window.innerWidth, window.outerHeight, window.innerHeight);
        // console.log(`window.devicePixelRatio`, window.devicePixelRatio); // hmm is this same for windows?
        // console.log(`${window.outerHeight}x${window.outerWidth}, ${window.innerHeight}x${window.innerWidth}`);

        // const script = document.createElement('script');
        // script.src = 'https://kit.fontawesome.com/944eb371a4.js';
        // document.body.appendChild(script);
        setTimeout(() => {
            // const cards = document.getElementsByClassName(styles.hoverCards);
            const cards = document.getElementById(styles.hoverCards);
            const cardsArray = document.getElementsByClassName(styles.card);
            cards.onmousemove = (e) => {
                // card1.style.backgroundImage = `url('${background.src}')`;
                for (const card of cardsArray as any) {
                    const rect = card.getBoundingClientRect(),
                        x = e.clientX - rect.left,
                        y = e.clientY - rect.top;
                    // card.style. = cardBackgroundStyle;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }
            };
        }, 500);
    }
    return (
        <ul
            id={styles.hoverCards}
            className={styles.hoverCards}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            {/* {props.items.map((item) => ( */}
            {items.map((item) => (
                <HoverCardsListItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    iconString={item.iconString}
                    description={item.description}
                    // getCardID={item.getCardID}
                />
            ))}
        </ul>
    );
}
