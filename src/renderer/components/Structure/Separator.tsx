import styles from './Separator.module.scss';
export default function Separator(props: any) {
    // console.log(props);

    return (
        <div
            className={styles.separator}
            style={{
                // alignItems: props.alignItems,
                // justifyContent: props.justifyContent,
                maxWidth: props.maxWidth,
            }}
        >
            {props.children}
        </div>
    );
}
