import styles from '../../styles/components/headings.module.scss';

export default function HeadingH1(props: any) {
    return <h1 className={styles.heading_h1}>{props.message} </h1>;
}
