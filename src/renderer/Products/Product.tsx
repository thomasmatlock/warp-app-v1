// import Link from 'next/link';
// import Image from 'next/image';
import { useContext } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import ProductsContext from '../../store/productsContext';
import ProductFeaturesList from './ProductFeaturesList';

import styles from './Products.module.scss';
// import Scene from '../Models/Scene';

export default function Product(props: any) {
  const { id, image, title, description, ctaMessage } = props;
  const productsCtx = useContext(ProductsContext);
  // console.log(productsCtx);

  const mouseEnterHandler = (e: any) => {
    productsCtx.toggleUserInteracting();
    productsCtx.getCardID(id);
  };
  const mouseLeaveHandler = (e: any) => {
    productsCtx.toggleUserInteracting();
  };
  const activeCardClass = [styles.card__active, styles.card].join(' ');
  const clickHandler = (e: any) => {
    console.log('click');
  };

  return (
    //                         {overviewDisplayCtx.audioMode && <a className={browserBarBtnClass1}>Download Audio MP3</a>}

    <div
      className={styles.card}
      id={id}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
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
