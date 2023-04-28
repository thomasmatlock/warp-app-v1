import styles from './Spacer.module.scss';
export default function Spacer(props: any) {
    return <div className={styles.spacer}>{props.children}</div>;
}
