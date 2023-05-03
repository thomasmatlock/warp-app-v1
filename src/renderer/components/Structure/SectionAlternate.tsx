import styles from './Section.module.scss';
export default function SectionAlternate(props: any) {
    return <div className={styles.section_alternate}>{props.children}</div>;
}
