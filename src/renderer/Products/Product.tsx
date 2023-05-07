// import Link from 'next/link';
// import Image from 'next/image';
import exp from 'constants';
import { useContext } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import ProductsContext from '../../store/productsContext';
import ProductFeaturesList from './ProductFeaturesList';

import styles from './Products.module.scss';
// import Scene from '../Models/Scene';

export default function Product(props: any) {
  // console.log(props);

  const { id, image, title, description, ctaMessage, expanded } = props;
  const productsCtx = useContext(ProductsContext);
  // console.log(productsCtx);

  const mouseEnterHandler = (e: any) => {
    productsCtx.toggleUserInteracting();
    // productsCtx.getCardID(id);
  };
  const mouseLeaveHandler = (e: any) => {
    productsCtx.toggleUserInteracting();
  };
  // const activeCardClass = [styles.card__active, styles.card].join(' ');
  const clickHandler = (e: any) => {
    productsCtx.getCardID(id);
  };
  const regularCardClass = [styles.card].join(' ');
  const expandedCardClass = [styles.card__expanded, styles.card].join(' ');
  const collapsedCardClass = [styles.card_collapsed, styles.card].join(' ');
  let cardClass = expanded ? expandedCardClass : regularCardClass;
  // cardClass = !expanded && productsCtx.userInteracting ? collapsedCardClass : cardClass;

  return (
    //                         {overviewDisplayCtx.audioMode && <a className={browserBarBtnClass1}>Download Audio MP3</a>}

    <div className={styles.card} id={id}>
      <div className={styles.card_content}>
        <div className={styles.card_info_wrapper}>
          <div className={styles.card_info}>
            <img className={styles.card_image} src={image} alt="" />
            <div className={styles.card_info_title}>
              <h3>{title}</h3>
              <h4>{description}</h4>
            </div>
            {/* <ProductFeaturesList /> */}
            <CTAProduct message={ctaMessage} clickHandler={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}