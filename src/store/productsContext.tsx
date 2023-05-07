import React, { useState, useEffect, createContext } from 'react';
import racingIcon from '../renderer/Products/racing.svg';

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
// import hoverCardImg2 from '../public/GridCards/hoverCardImg2.webp';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
import hoverCardImg3 from '../renderer/Global/GridCards/hoverCardImg3.png';

const ProductsGridCardsContext = createContext({
  audioCardExpanded: false,
  videoCardExpanded: false,
  bundleCardExpanded: false,
  cardsData: [
    {
      id: 'audioPersonalEdition',
      image: hoverCardImg1,
      title: 'Audio Personal Edition',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Go to checkout',
      threeScene: 'audio',
      expanded: false,
    },
  ],
  getCardID: (id: string) => {},
  // toggleUserInteracting: () => {},
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
      title: 'Audio Personal Edition',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Go to checkout',
      threeScene: 'audio',
      expanded: audioCardExpanded,
    },
    {
      id: 'videoPersonalEdition',
      threeScene: 'video',
      expanded: videoCardExpanded,
      image: hoverCardImg2,
      title: 'Video Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
    },
    {
      id: 'bundlePersonalEdition',
      threeScene: 'bundle',
      expanded: bundleCardExpanded,

      image: hoverCardImg3,
      title: 'Bundle Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
    },
  ];
  const disableAllExpandedCards = () => {
    setAudioCardExpanded(false);
    setVideoCardExpanded(false);
    setBundleCardExpanded(false);
  };
  const getCardID = (id: string) => {
    // disableAllExpandedCards();
    // console.log(audioCardExpanded, videoCardExpanded, bundleCardExpanded);
    setTimeout(() => {
      setVideoCardExpanded(true);
      console.log(audioCardExpanded, videoCardExpanded, bundleCardExpanded);
    }, 100);
    // if (id === 'audioPersonalEdition')
    // console.log(id);
    // if (id === 'videoPersonalEdition') setVideoCardExpanded(true);
    // if (id === 'bundlePersonalEdition') setBundleCardExpanded(true);
  };
  const toggleUserInteracting = () => {
    // setUserInteracting((prevState) => !prevState);
  };
  return (
    <ProductsGridCardsContext.Provider
      value={{
        cardsData,
        audioCardExpanded,
        videoCardExpanded,
        bundleCardExpanded,
        getCardID,
        // toggleUserInteracting,
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
