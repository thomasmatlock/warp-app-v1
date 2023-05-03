import styles from '../../styles/components/headings.module.scss';

export default function HeadingH2(props: any) {
    return <h2 className={styles.heading_h2}>{props.message}</h2>;
}
