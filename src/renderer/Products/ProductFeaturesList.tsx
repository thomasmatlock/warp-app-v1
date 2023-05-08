import styles from './ProductFeature.module.scss';
import ProductFeatureItem from './ProductFeatureItem';

type ProductFeaturesListProps = {
  features: [];
  expanded: boolean;
};
export default function ProductFeaturesList(props: ProductFeaturesListProps) {
  const { features, expanded } = props;
  // console.log(expanded);

  return (
    <ul className={styles.product_description__list}>
      {features.map((item) => (
        <ProductFeatureItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          expanded={expanded}
        />
      ))}
    </ul>
  );
}
