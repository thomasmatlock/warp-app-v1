/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useScroll } from '@react-three/drei';
import { useEffect, useState } from 'react';
import styles from './CTAProduct.module.scss';

type Props = {
  type: string;
  message: string;
  clickHandler: (e: any) => void;
  expanded: boolean;
  isSubmittable: boolean;
};
export default function CTAProduct(props: Props) {
  // console.log(props);
  const { type, message, clickHandler, expanded, isSubmittable } = props;

  const [isBuy, setIsBuy] = useState(false);
  // const [ctaStyle, setCtaStyle] = useState(
  //   expanded ? styles.cta_product__expanded : styles.cta_product
  // );
  const ctaStyle = expanded ? styles.cta_product__expanded : styles.cta_product;
  useEffect(() => {
    // console.log(type);

    // if (expanded) setCtaStyle(styles.cta_product__expanded);
    if (type === 'buy') {
      setIsBuy(true);
      // ctaStyle = styles.cta_product__buy;
    }
  }, [type, expanded]);
  const CTA = () => {
    if (isBuy) {
      const buyBtnClass = isSubmittable
        ? styles.cta_product__buy__isSubmittable
        : styles.cta_product__buy;
      return (
        <div className={buyBtnClass} onClick={clickHandler}>
          <p className={styles.cta_text}>{message}</p>
        </div>
      );
    }
    return (
      <div className={ctaStyle} onClick={clickHandler}>
        <p className={styles.cta_text}>{message}</p>
      </div>
    );
  };

  return <CTA />;
}
