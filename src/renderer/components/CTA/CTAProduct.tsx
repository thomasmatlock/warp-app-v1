import { useState, useEffect, useContext } from 'react';
// import appleIcon from '/public/3rdparty/flaticon/apple.svg';
// import windowsIcon from '/public/3rdparty/flaticon/windows.svg';
// import { UAParser } from 'ua-parser-js';
// import AppContextProvider from '../../store/appContext';

import styles from './CTAProduct.module.scss';
// import stylesMobile from './CTAMobile.module.scss';
import mirroredStyles from './mirrored.module.scss';

export default function CTAProduct(props: any) {
  console.log(props);
  const { message } = props;

  const mouseEnterHandler = (e: any) => {
    console.log('mouse enter');
  };
  const mouseLeaveHandler = (e: any) => {
    console.log('mouse leave');
  };

  return (
    <div
      className={styles.cta_product}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <p className={styles.cta_platform_text}>{message}</p>
    </div>
  );
}
