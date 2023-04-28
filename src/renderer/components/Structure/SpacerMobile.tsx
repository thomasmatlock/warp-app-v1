import styles from './Spacer.module.scss';
export default function SpacerMobile(props: any) {
    return <div className={styles.spacer_mobile}>{props.children}</div>;
}
