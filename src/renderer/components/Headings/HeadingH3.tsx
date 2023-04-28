import styles from '../../styles/components/headings.module.scss';

export default function HeadingH3(props: any) {
    return <h3 className={styles.heading_h3}>{props.message} </h3>;
}
