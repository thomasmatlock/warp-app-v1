import styles from './Container.module.scss';
export default function ContainerTrust(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';

    return (
        <div
            className={styles.container_trust}
            style={
                {
                    // border: borderStyling,
                }
            }
        >
            {props.children}
        </div>
    );
}
