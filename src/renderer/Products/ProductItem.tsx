// import Link from 'next/link';
// import Image from 'next/image';
import exp from 'constants';
import { useContext, useState } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import CTAProductBack from 'renderer/components/CTA/CTAProductBack';
import ProductTitle from './components/ProductTitle';
import ProductSubtitle from './components/ProductSubtitle';
import ProductsContext from '../../store/productsContext';
import ProductFeaturesList from './ProductFeaturesList';

import styles from './Products.module.scss';
import Scene from '../Models/Scene';

export default function Product(props: any) {
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
  } = props;

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
    productsCtx.getCardID(id);
    // set card class
    if (expanded) {
      cardClass = activeCardClass;
    }
    if (collapsed) {
      cardClass = collapsedCardClass;
    }

    // cardClass = expanded ? activeCardClass : regularCardClass;
  };
  const goBackHandler = (e: any) => {
    productsCtx.goBackHandler();
  };

  // cardClass = collapsed ? collapsedCardClass : regularCardClass;
  const cardContentStyle = expanded
    ? styles.card_content__expanded
    : styles.card_content;
  const cardTitleStyle = expanded
    ? styles.card_info_title__title__expanded
    : styles.card_info_title__title;
  return (
    <div
      className={expanded ? activeCardClass : cardClass}
      id={id}
      // style={displayStyle}
    >
      <div className={cardContentStyle}>
        <div className={styles.card_info_wrapper}>
          <div className={styles.card_info}>
            {/* <img className={styles.card_image} src={image} alt="" /> */}
            <Scene threeScene={threeScene} expanded={expanded} />
            <ProductTitle title={title} />
            <ProductSubtitle description={description} />
            <ProductFeaturesList features={features} expanded={expanded} />
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
      </div>
      {expanded && <div className={styles.card_checkout}>checkout</div>}
    </div>
  );
}
