import styles from './ProductSubtitle.module.scss';

export default function ProductSubtitle(props: any) {
  const { description, expanded } = props;

  const componentStyle = expanded
    ? styles.card_info_title__subtitle
    : styles.card_info_title__subtitle;
  return <h3 className={componentStyle}>{description}</h3>;
}
