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
import ProductContent from './ProductContent';

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

  const productsCtx = useContext(ProductsContext);
  const ctaBackMessage = 'Back';

  // const activeCardClass = [styles.card__active, styles.card].join(' ');
  const regularCardClass = [styles.card].join(' ');
  const activeCardClass = [styles.card__active, styles.card].join(' ');
  const collapsedCardClass = [styles.card__collapsed, styles.card].join(' ');
  let cardClass = regularCardClass;
  cardClass = collapsed ? collapsedCardClass : regularCardClass;
  // let displayStyle = collapsed ? { display: 'flex' } : { display: 'flex' };

  return (
    <div className={expanded ? activeCardClass : cardClass} id={id}>
      <ProductContent
        id={id}
        features={features}
        expanded={expanded}
        threeScene={threeScene}
        title={title}
        description={description}
        image={image}
        ctaMessage={ctaMessage}
        ctaBackMessage={ctaBackMessage}
        price={price}
      />
      {/* <ProductCheckout expanded={expanded} /> */}
    </div>
  );
}
