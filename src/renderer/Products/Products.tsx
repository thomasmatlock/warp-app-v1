import { useContext } from 'react';
import styles from './Products.module.scss';

import Product from './Product';

// import HoverCardsContext from '../../../store/gridCardsContext';
import ProductsContext from '../../store/productsContext';

export default function Products(props: any) {
  const productsCtx = useContext(ProductsContext);
  // console.log(productsCtx);

  // window.electron.ipcRenderer.on('global', (arg) => {
  //   console.log(arg);
  // });
  // console.log(productsCtx.cardsData);
  const items = productsCtx.cardsData;
  // set active class
  const mouseEnterHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
  };
  const mouseLeaveHandler = (e: any) => {
    // productsCtx.toggleUserInteracting();
  };

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
    <ul
      id={styles.hoverCards}
      className={styles.hoverCards}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
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
        />
      ))}
    </ul>
  );
}
