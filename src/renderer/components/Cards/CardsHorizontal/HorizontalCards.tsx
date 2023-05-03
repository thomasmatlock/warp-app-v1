import styles from './HorizontalCards.module.scss';

import CardHorizontal from './HorizontalCard';
import { useState, useEffect } from 'react';

export default function CardsHorizontal(props: any) {
    // console.log(props);

    // console.log(props);

    return (
        <ul className={styles.horizontal_cards}>
            {props.items.map((item) => (
                <CardHorizontal
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    theme={item.theme}
                    description={item.description}
                    icon={item.icon}
                    getCardID={props.getCardID}
                    activeCard={props.activeCard}
                />
            ))}
        </ul>
    );
}
