import styles from './ProductTitle.module.scss';

export default function ProductTitle(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded
    ? styles.card_info_title__title__expanded
    : styles.card_info_title__title;
  return <h3 className={componentStyle}>{title}</h3>;
}
