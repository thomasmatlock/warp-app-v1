import { useContext } from 'react';
import styles from './Products.module.scss';

import Product from './ProductItem';

import ProductsContext from '../../store/productsContext';

export default function Products(props: any) {
  const productsCtx = useContext(ProductsContext);

  const items = productsCtx.cardsData;

  if (typeof window !== 'undefined') {
    setTimeout(() => {
      // const cards = document.getElementsByClassName(styles.hoverCards);
      const cards = document.getElementById(styles.hoverCards);
      const cardsArray = document.getElementsByClassName(styles.card);
      if (cards) {
        cards.onmousemove = (e) => {
          for (const card of cardsArray as any) {
            const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
            // card.style. = cardBackgroundStyle;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          }
        };
      }
    }, 500);
  }
  return (
    <ul id={styles.hoverCards} className={styles.hoverCards}>
      {items.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          description={item.description}
          ctaMessage={item.ctaMessage}
          expanded={item.expanded}
          collapsed={item.collapsed}
          features={item.features}
          threeScene={item.threeScene}
          price={item.price}
        />
      ))}
    </ul>
  );
}
