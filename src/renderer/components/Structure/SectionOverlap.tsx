import styles from './Section.module.scss';
export default function SectionOverlap(props: any) {
    return (
        <div
            className={styles.section_overlap}
            style={{
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
            }}
        >
            {props.children}
        </div>
    );
}
