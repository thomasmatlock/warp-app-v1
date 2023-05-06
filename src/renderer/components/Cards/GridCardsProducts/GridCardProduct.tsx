// import Link from 'next/link';
// import Image from 'next/image';
import { useContext } from 'react';
// import HorizontalCardsContextProvider from '../../../store/gridCardsContext';
import ProductsContext from '../../../../store/productsGridCardsContext';

import styles from './GridCardsProducts.module.scss';
import CTA from 'renderer/components/CTA/CTA';

export default function GridCard(props: any) {
  const cardsCtx = useContext(ProductsContext);
  // console.log(cardsCtx);

  const mouseEnterHandler = (e: any) => {
    cardsCtx.toggleUserInteracting();
    cardsCtx.getCardID(props.id);
  };
  const mouseLeaveHandler = (e: any) => {
    cardsCtx.toggleUserInteracting();
  };
  const activeCardClass = [styles.card__active, styles.card].join(' ');

  return (
    //                         {overviewDisplayCtx.audioMode && <a className={browserBarBtnClass1}>Download Audio MP3</a>}

    <li
      className={styles.card}
      id={props.id}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={styles.card_content}>
        <div className={styles.card_info_wrapper}>
          <div className={styles.card_info}>
            <img className={styles.card_image} src={props.iconString} alt="" />
            {/* <i
                            className={props.iconString}
                            style={{
                                color: 'rgb(240, 240, 240)',
                                transform: 'translateY(18px)',
                            }}
                        ></i> */}
            <div className={styles.card_info_title}>
              <h3>{props.title}</h3>
              <h4>{props.description}</h4>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
