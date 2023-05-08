import styles from './ProductTitle.module.scss';

export default function ProductTitle(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.title_expanded : styles.title;
  return <h3 className={componentStyle}>{title}</h3>;
}
