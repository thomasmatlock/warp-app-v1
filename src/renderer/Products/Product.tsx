// import Link from 'next/link';
// import Image from 'next/image';
import exp from 'constants';
import { useContext, useState } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import ProductsContext from '../../store/productsContext';
import ProductFeaturesList from './ProductFeaturesList';

import styles from './Products.module.scss';
import Scene from '../Models/Scene';

export default function Product(props: any) {
  // window.electron.ipcRenderer.on('global', (arg) => {
  //   console.log(arg);
  // });
  // console.log(props);

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
  // console.log(expanded);

  const productsCtx = useContext(ProductsContext);
  console.log(
    productsCtx.audioCardExpanded,
    productsCtx.videoCardExpanded,
    productsCtx.bundleCardExpanded
  );

  const mouseEnterHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
    // productsCtx.getCardID(id);
  };
  const mouseLeaveHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
  };
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
            <div className={styles.card_info_title}>
              <h3 className={cardTitleStyle}>{title}</h3>
              <h4 className={styles.card_info_title__subtitle}>
                {description}
              </h4>
            </div>
            <ProductFeaturesList features={features} expanded={expanded} />
            <CTAProduct
              message={ctaMessage}
              clickHandler={clickHandler}
              expanded={expanded}
            />{' '}
          </div>
        </div>
      </div>
      {expanded && <div className={styles.card_checkout}>checkout</div>}
    </div>
  );
}
