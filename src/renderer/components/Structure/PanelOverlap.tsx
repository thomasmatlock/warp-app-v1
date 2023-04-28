import styles from './Panel.module.scss';
export default function PanelOverlap(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';

    return (
        <div
            className={styles.panel_overlap}
            style={{
                flexDirection: props.direction,
                flex: props.flex,
                alignItems: props.alignItems,
                justifyContent: props.justifyContent,
                // border: borderStyling,
            }}
        >
            {props.children}
        </div>
    );
}
