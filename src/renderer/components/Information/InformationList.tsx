import Link from 'next/link';
import Image from 'next/image';

import styles from './InformationList.module.scss';
import InformationListItem from './InformationListItem';
export default function Information(props: any) {
    // return <p className={styles.information}>{props.message} </p>;
    return (
        <ul className={styles.information_list}>
            {props.items.map((item) => (
                <InformationListItem
                    key={item.message}
                    message={item.message}
                    // description={item.description}
                    // icon={item.icon}
                />
            ))}
        </ul>
    );
}
