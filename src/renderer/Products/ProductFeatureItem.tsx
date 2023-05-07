import styles from './ProductFeature.module.scss';

export default function ProductFeaturesItem(props) {
  const { title, description, image, inverted } = props;
  return (
    <li className={styles.product_description__list__item}>
      <img
        className={styles.product_description__list__item__icon}
        src={image}
        alt=""
        style={inverted ? { filter: 'invert(1)' } : {}}
      />
      <div className={styles.product_description__list__item__text}>
        <div className={styles.product_description__list__item__text__title}>
          {title}
        </div>
        <div
          className={styles.product_description__list__item__text__description}
        >
          {/* {description} */}
        </div>
      </div>
    </li>
  );
}
