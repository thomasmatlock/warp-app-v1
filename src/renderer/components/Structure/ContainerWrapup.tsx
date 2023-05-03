import styles from './Container.module.scss';
export default function ContainerWrapup(props: any) {
    const borderStyling = process.env.NODE_ENV === 'development' ? '1px dotted red' : 'none';

    // console.log(props.direction);

    return (
        <div
            className={styles.container_wrapup}
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
