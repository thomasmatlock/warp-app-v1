import styles from './VerticalCards.module.scss';
import Image from 'next/image';
import astronautIcon from '../../../public/space/astronauts/png/Asset 8 whitened.webp';

import VerticalCard from './VerticalCard';

export default function CardsVertical(props: any) {
    return (
        <ul className={styles.vertical_cards}>
            {/* <Image className={styles.astronaut} src={astronautIcon} alt="" loading="lazy" /> */}
            {props.items.map((item) => (
                <VerticalCard
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                />
            ))}
        </ul>
    );
}
