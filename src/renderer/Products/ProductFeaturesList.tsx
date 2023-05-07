import styles from './ProductFeature.module.scss';
import ProductFeatureItem from './ProductFeatureItem';

export default function ProductFeaturesList(props) {
  const { features } = props;
  console.log(features);

  // return (
  //   <ul className={styles.product_description__list}>
  //     <li className={styles.product_description__list__item}>
  //       {/* <img
  //         className="product_description__list__item__icon"
  //         src={racingIcon}
  //         alt=""
  //       /> */}
  //       <div className={styles.product_description__list__item__text}>
  //         <div className={styles.product_description__list__item__text__title}>
  //           {features[0].title}
  //         </div>
  //         <div
  //           className={
  //             styles.product_description__list__item__text__description
  //           }
  //         >
  //           Download audio in its original Youtube format or adjust it in your
  //           preferences to save space
  //         </div>
  //       </div>
  //     </li>
  //   </ul>
  // );
  return (
    <ul className={styles.product_description__list}>
      {features.map((item) => (
        <ProductFeatureItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
        />
      ))}
    </ul>
  );
}
