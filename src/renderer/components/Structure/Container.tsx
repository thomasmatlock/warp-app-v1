import styles from './Container.module.scss';
export default function Container(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';

    return (
        <div
            className={styles.container}
            style={{
                alignItems: props.alignItems,
                maxWidth: props.maxWidth,
                // border: borderStyling,
                borderTop: props.borderTop,
            }}
        >
            {props.children}
        </div>
    );
}
