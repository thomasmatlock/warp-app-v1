import styles from './ProductFeature.module.scss';

type ProductFeaturesItemProps = {
  title: string;
  description: string;
  image: string;
};

export default function ProductFeaturesItem(props: ProductFeaturesItemProps) {
  const { title, description, image } = props;
  return (
    <li className={styles.product_description__list__item}>
      <img
        className={styles.product_description__list__item__icon}
        src={image}
        alt=""
        // style={inverted ? { filter: 'invert(1)' } : {}}
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
