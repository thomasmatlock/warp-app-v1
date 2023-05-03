import Image from 'next/image';
import { useContext } from 'react';
import styles from './HorizontalCards.module.scss';

export default function CardHorizontal(props: any) {
    // console.log(props);

    const mouseEnterHandler = (e: any) => {
        props.getCardID(props.id);
    };

    const cardStyling = {
        backgroundColor: props.theme === 'light' ? '#eee' : '#1a1a1a',
    };
    const activeCardClass = [
        // styles.horizontal_card,
        // styles.horizontal_card__active,
        cardStyling,
        props.id === props.activeCard ? styles.horizontal_card__active : styles.horizontal_card,
    ].join(' ');

    return (
        <div onMouseEnter={mouseEnterHandler} id={props.id} className={activeCardClass} style={cardStyling}>
            <div
                className={styles.horizontal_card_header}
                style={{
                    backgroundColor: props.theme === 'light' ? '#fff' : '#252525',
                }}
                // style={cardStyling}
            >
                <Image
                    src={props.icon}
                    alt=""
                    className={styles.horizontal_card_header__icon}
                    // layout="responsive"
                    loading="lazy"
                />
                <h4
                    className={styles.title}
                    style={{
                        color: props.theme === 'light' ? '#000' : '#fff',
                    }}
                >
                    {props.title}
                </h4>
            </div>
            <div
                className={styles.horizontal_card_description}
                style={{
                    color: props.theme === 'light' ? '#000' : '#fff',
                }}
            >
                <p
                    style={{
                        color: props.theme === 'light' ? '#000' : '#fff',
                    }}
                >
                    {props.description}
                </p>
            </div>
        </div>
    );
}
