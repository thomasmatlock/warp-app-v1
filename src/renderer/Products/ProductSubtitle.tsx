import styles from './ProductSubtitle.module.scss';

export default function ProductSubtitle(props: any) {
  const { description, expanded } = props;

  const componentStyle = expanded ? styles.subtitle : styles.subtitle;
  return <h3 className={componentStyle}>{description}</h3>;
}
