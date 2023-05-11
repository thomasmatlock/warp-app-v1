// import Link from 'next/link';
// import Image from 'next/image';
import exp from 'constants';
import { useContext, useState } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import CTAProductBack from 'renderer/components/CTA/CTAProductBack';
import ProductTitle from './components/ProductTitle';
import ProductCheckout from './Checkout/ProductCheckout';
import ProductSubtitle from './components/ProductSubtitle';
import ProductsContext from '../../store/productsContext';
import ProductFeaturesList from './ProductFeaturesList';

import styles from './Products.module.scss';
import Scene from '../Models/Scene';

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  features: string[];
  ctaMessage: string;
  expanded: boolean;
  collapsed: boolean;
  threeScene: string;
  price: number;
};
export default function Product(props: Props) {
  const {
    id,
    image,
    title,
    description,
    features,
    ctaMessage,
    expanded,
    collapsed,
    threeScene,
    price,
  } = props;
  // console.log(id);

  const productsCtx = useContext(ProductsContext);
  const ctaBackMessage = 'Back';

  // const activeCardClass = [styles.card__active, styles.card].join(' ');
  const regularCardClass = [styles.card].join(' ');
  const activeCardClass = [styles.card__active, styles.card].join(' ');
  const collapsedCardClass = [styles.card__collapsed, styles.card].join(' ');
  let cardClass = regularCardClass;
  cardClass = collapsed ? collapsedCardClass : regularCardClass;
  // let displayStyle = collapsed ? { display: 'flex' } : { display: 'flex' };
  const clickHandler = (e: any) => {
    // console.log('clickHandler');

    productsCtx.getCardID(id);
    // set card class
    if (expanded) {
      cardClass = activeCardClass;
    }
    if (collapsed) {
      cardClass = collapsedCardClass;
    }
  };
  const goBackHandler = (e: any) => {
    productsCtx.goBackHandler();
  };

  // const cardContentStyle = expanded
  //   ? styles.card_content__expanded
  //   : styles.card_content;
  const cardContentStyle = expanded ? styles.card_content : styles.card_content;
  const cardWrapperStyle = expanded
    ? styles.card_info_wrapper__expanded
    : styles.card_info_wrapper;

  return (
    <div id={id} className={cardContentStyle}>
      <div className={cardWrapperStyle}>
        <div className={styles.card_info}>
          {/* <img className={styles.card_image} src={image} alt="" /> */}
          <Scene threeScene={threeScene} expanded={expanded} />
          <ProductTitle title={title} expanded />
          <ProductSubtitle description={description} expanded />
          <ProductFeaturesList features={features} expanded />
          <CTAProduct
            message={ctaMessage}
            clickHandler={clickHandler}
            expanded={expanded}
          />
          <CTAProductBack
            message={ctaBackMessage}
            clickHandler={goBackHandler}
            expanded={expanded}
          />
        </div>
      </div>
      <ProductCheckout expanded={expanded} price={price} id={id} />
    </div>
  );
}
