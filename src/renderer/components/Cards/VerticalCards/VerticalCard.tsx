import Image from 'next/image';
import { useContext } from 'react';
import styles from './VerticalCards.module.scss';
import VerticalCardsContext from '../../../store/verticalCardsContext';
import astronautIcon from '../../../public/space/astronauts/png/Asset 8 whitened.webp';

export default function VerticalCard(props: any) {
    // console.log('VerticalCard props: ', props);

    const cardsCtx = useContext(VerticalCardsContext);
    const mouseEnterHandler = (e: any) => {
        cardsCtx.getCardID(props.id);
    };

    const cardTitleClasses = [
        styles.vertical_cards__card__header__item,
        styles.vertical_cards__card__header__title,
    ].join(' ');
    const cardTitleIconClasses = [
        styles.vertical_cards__card__header__item,
        styles.vertical_cards__card__header__icon,
    ].join(' ');
    const cardClass = [
        props.id === cardsCtx.activeCard ? styles.vertical_cards__card__active : '',
        styles.vertical_cards__card,
    ].join(' ');
    // console.log(props.id, cardsCtx.activeCard);

    return (
        <div
            onMouseEnter={mouseEnterHandler}
            id={props.id}
            className={
                props.id === cardsCtx.activeCard ? styles.vertical_cards__card__active : styles.vertical_cards__card
            }
        >
            <div className={styles.vertical_cards__card__astronaut__container}>
                {props.id === 'wrapup_1' && (
                    <Image
                        className={styles.astronaut}
                        src={astronautIcon}
                        alt=""
                        loading="lazy"
                        //     filter: drop-shadow(-1rem 0 2rem rgba(0, 0, 0, 1));

                        style={
                            props.id === cardsCtx.activeCard
                                ? {
                                      filter: 'drop-shadow(-1rem 0 2rem rgba(0, 0, 0, 1))',
                                      transition: 'all 0.25s ease',
                                  }
                                : {
                                      transition: 'all 0.25s ease',
                                      filter: 'drop-shadow(-1rem 0 2rem rgba(0, 0, 0, 0))',
                                  }
                        }
                    />
                )}
            </div>
            <div className={styles.vertical_cards__card__header}>
                {props.icon && (
                    <Image
                        loading="lazy"
                        className={cardTitleIconClasses}
                        src={props.icon}
                        // height="30px"
                        alt=""
                    />
                )}
                <h2 className={cardTitleClasses}>{props.title}</h2>
            </div>
            <div className={styles.vertical_cards__card__description}>
                <p className={styles.vertical_cards__card__description__text}>{props.description}</p>
            </div>
        </div>
    );
}
