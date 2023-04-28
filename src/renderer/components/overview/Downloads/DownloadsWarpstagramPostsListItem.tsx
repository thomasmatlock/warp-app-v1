import Link from 'next/link';
import Image from 'next/image';
import styles from './OverviewWarpstagram.module.scss';

export default function Warpstagram(props: any) {
    return <Image src={props.src} alt="null" className={styles.content__panel__warpstagram__account__posts__item} />;
}
// export default Warpstagram;
