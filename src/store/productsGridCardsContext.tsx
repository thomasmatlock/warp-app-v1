import React, { useState, useEffect, createContext } from 'react';

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
// import hoverCardImg2 from '../public/GridCards/hoverCardImg2.webp';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
import hoverCardImg3 from '../renderer/Global/GridCards/hoverCardImg3.png';

const ProductsGridCardsContext = createContext({
  cardsData: [
    {
      id: 'hoverCard1',
      iconString: hoverCardImg1,
      // title: 'Download at the speed of thought',
      title: 'Control Alt Download',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
    },
    {
      id: 'hoverCard2',
      iconString: hoverCardImg2,
      title: 'For creators, by creators',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
    },
    // then
    {
      id: 'hoverCard3',
      iconString: hoverCardImg3,
      title: 'Free bird',
      description: `No hidden fees. No ads. No subscriptions. The free version of Warp is identical, fast, and as fun to use as the premium version.`,
    },
  ],
  getCardID: (card: object) => {},
  toggleUserInteracting: () => {},
});

export function ProductsGridCardsContextProvider(props: any) {
  const [userInteracting, setUserInteracting] = useState(false);
  const cardsData = [
    {
      id: 'hoverCard1',
      iconString: hoverCardImg1,
      // title: 'Download at the speed of thought',
      title: 'Control Alt Download',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
    },
    {
      id: 'hoverCard2',
      iconString: hoverCardImg2,
      title: 'For creators, by creators',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
    },
    // then
    {
      id: 'hoverCard3',
      iconString: hoverCardImg3,
      title: 'Free bird',
      description: `No hidden fees. No ads. No subscriptions. The free version of Warp is identical, fast, and as fun to use as the premium version.`,
    },
  ];
  const getCardID = (id) => {
    // console.log(id);
  };
  const toggleUserInteracting = () => {
    setUserInteracting((prevState) => !prevState);
    // console.log(userInteracting);
  };
  return (
    <ProductsGridCardsContext.Provider
      value={{
        cardsData,
        getCardID,
        toggleUserInteracting,
      }}
    >
      {props.children}
    </ProductsGridCardsContext.Provider>
  );
}

export default ProductsGridCardsContext;

// const ProductsGridCardsContext = React.createContext({
//   audioCardExpanded: false,
//   videoCardExpanded: false,
//   warpstagramCardExpanded: false,
//   bundleCardExpanded: true,
//   isViewingAudio1: false,
//   isViewingAudio2: false,
//   isViewingVideo1: false,
//   isViewingVideo2: false,
//   isViewingWarpstagram1: false,
//   isViewingWarpstagram2: false,
//   isViewingBundle: false,
//   isPurchasingAudio1: false,
//   isPurchasingAudio2: false,
//   isPurchasingVideo1: false,
//   isPurchasingVideo2: false,
//   isPurchasingWarpstagram1: false,
//   isViewingProduct1: false,
//   isViewingProduct2: false,
//   isBuyingProduct1: false,
//   isBuyingProduct2: false,

//   isPurchasingWarpstagram2: false,
//   isPurchasingBundle: false,
//   expandAudioCard: () => {},
//   expandVideoCard: () => {},
//   expandWarpstagramCard: () => {},
//   expandBundleCard: () => {},
//   cardsData: [],
// });
