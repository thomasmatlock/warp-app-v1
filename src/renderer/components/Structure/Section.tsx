import styles from './Section.module.scss';
export default function Section(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';
    return (
        <div
            className={styles.section}
            style={{
                zIndex: props.zIndex,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
                // border: borderStyling,
            }}
        >
            {props.children}
        </div>
    );
}
