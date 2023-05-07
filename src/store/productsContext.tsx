import React, { useState, useEffect, createContext } from 'react';
import racingIcon from '../renderer/Products/racing.svg';

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
// import hoverCardImg2 from '../public/GridCards/hoverCardImg2.webp';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
import hoverCardImg3 from '../renderer/Global/GridCards/hoverCardImg3.png';

const ProductsGridCardsContext = createContext({
  cardsData: [
    {
      id: 'hoverCard1',
      image: hoverCardImg1,
      // title: 'Download at the speed of thought',
      title: 'Control Alt Download',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Download Audio MP3',
      threeScene: 'audio',
      expanded: false,
      features: [
        {
          id: 'videoFeature1',
          title: 'Video Feature 1',
          description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
          icon: racingIcon,
        },
      ],
    },
    {
      id: 'hoverCard2',
      image: hoverCardImg2,
      expanded: false,

      title: 'For creators, by creators',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Download Audio MP3',
      threeScene: 'video',
    },
    {
      id: 'hoverCard3',
      image: hoverCardImg3,
      title: 'Free bird',
      description: `No hidden fees. No ads. No subscriptions. The free version of Warp is identical, fast, and as fun to use as the premium version.`,
      ctaMessage: 'Download Audio MP3',
      threeScene: 'bundle',
      expanded: false,
    },
  ],
  getCardID: (card: object) => {},
  toggleUserInteracting: () => {},
});

export function ProductsGridCardsContextProvider(props: any) {
  const [userInteracting, setUserInteracting] = useState(false);
  const [audioCardExpanded, setAudioCardExpanded] = useState(false);
  const [videoCardExpanded, setVideoCardExpanded] = useState(false);
  const [bundleCardExpanded, setBundleCardExpanded] = useState(false);
  const cardsData = [
    {
      id: 'audioPersonalEdition',
      image: hoverCardImg1,
      // title: 'Download at the speed of thought',
      title: 'Audio Personal Edition',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Go to checkout',
      threeScene: 'audio',
    },
    {
      id: 'videoPersonalEdition',
      threeScene: 'video',
      expanded: false,

      image: hoverCardImg2,
      title: 'Video Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
    },
    {
      id: 'bundlePersonalEdition',
      threeScene: 'bundle',
      expanded: false,

      image: hoverCardImg3,
      title: 'Bundle Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
    },
  ];
  const getCardID = (id) => {
    // console.log(id);
  };
  const toggleUserInteracting = () => {
    setUserInteracting((prevState) => !prevState);
  };
  return (
    <ProductsGridCardsContext.Provider
      value={{
        cardsData,
        audioCardExpanded,
        videoCardExpanded,
        bundleCardExpanded,
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
