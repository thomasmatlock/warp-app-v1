import styles from './ProductCheckoutTitle.module.scss';

export default function ProductCheckoutTitle(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.title_expanded : styles.title;
  return <h3 className={componentStyle}>{title}</h3>;
}