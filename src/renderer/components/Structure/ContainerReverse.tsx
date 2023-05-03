import styles from './Container.module.scss';
export default function ContainerReverse(props: any) {
    // console.log(props.direction);

    return (
        <div className={styles.container_reverse} style={{}}>
            {props.children}
        </div>
    );
}
