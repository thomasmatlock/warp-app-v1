import styles from './Container.module.scss';
export default function ContainerOverlap(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';

    return (
        <div
            className={styles.container_overlap}
            style={{
                border: borderStyling,
            }}
        >
            {props.children}
        </div>
    );
}
