// import Link from 'next/link';
// import Image from 'next/image';
import exp from 'constants';
import { useContext } from 'react';
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
  // console.log(productsCtx);

  const mouseEnterHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
    // productsCtx.getCardID(id);
  };
  const mouseLeaveHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
  };
  // const activeCardClass = [styles.card__active, styles.card].join(' ');
  const clickHandler = (e: any) => {
    productsCtx.getCardID(id);
  };
  const regularCardClass = [styles.card].join(' ');
  const expandedCardClass = [styles.card__active, styles.card].join(' ');
  const collapsedCardClass = [styles.card__collapsed, styles.card].join(' ');
  const cardClass = collapsed ? collapsedCardClass : regularCardClass;
  // cardClass = collapsed ? collapsedCardClass : regularCardClass;

  return (
    <div className={cardClass} id={id}>
      <div className={styles.card_content}>
        <div className={styles.card_info_wrapper}>
          <div className={styles.card_info}>
            {/* <img className={styles.card_image} src={image} alt="" /> */}
            <Scene threeScene={threeScene} />
            <div className={styles.card_info_title}>
              <h3>{title}</h3>
              <h4>{description}</h4>
            </div>
            {/* <ProductFeaturesList features={features} /> */}
            <CTAProduct message={ctaMessage} clickHandler={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}
