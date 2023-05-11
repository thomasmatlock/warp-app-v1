import styles from './ProductCheckoutTitle.module.scss';

export default function ProductCheckoutSubtitle(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.subtitle : styles.subtitle;
  return <h4 className={componentStyle}>{title}</h4>;
}
