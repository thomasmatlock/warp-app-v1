import Link from 'next/link';
import Image from 'next/image';
import styles from './Information.module.scss';

export default function Information(props: any) {
    return <p className={styles.information}>{props.message} </p>;
}
