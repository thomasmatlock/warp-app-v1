import React, { useState, useEffect, createContext } from 'react';
import racingIcon from '../renderer/Products/racing.svg';

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
// import hoverCardImg2 from '../public/GridCards/hoverCardImg2.webp';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
// import hoverCardImg2 from '../renderer/Global/GridCards/2.png';
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
      collapsed: false,
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
  const [audioCardCollapsed, setAudioCardCollapsed] = useState(false);
  const [videoCardCollapsed, setVideoCardCollapsed] = useState(false);
  const [bundleCardCollapsed, setBundleCardCollapsed] = useState(false);
  const cardsData = [
    {
      id: 'audioPersonalEdition',
      image: hoverCardImg1,
      title: 'Audio Personal Edition',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Go to checkout',
      expanded: audioCardExpanded,
      collapsed: audioCardCollapsed,
    },
    {
      id: 'videoPersonalEdition',
      expanded: videoCardExpanded,
      image: hoverCardImg2,
      title: 'Video Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      collapsed: videoCardCollapsed,
    },
    {
      id: 'bundlePersonalEdition',
      image: hoverCardImg3,
      title: 'Bundle Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      expanded: bundleCardExpanded,
      collapsed: bundleCardCollapsed,
    },
  ];
  const uncollapseAllCards = () => {
    setAudioCardCollapsed(false);
    setVideoCardCollapsed(false);
    setBundleCardCollapsed(false);
  };
  const disableAllExpandedCards = () => {
    setAudioCardExpanded(false);
    setVideoCardExpanded(false);
    setBundleCardExpanded(false);
  };
  const getCardID = (id: string) => {
    disableAllExpandedCards();
    uncollapseAllCards();
    if (id === 'audioPersonalEdition') {
      setAudioCardExpanded(true);
      setVideoCardCollapsed(true);
      setBundleCardCollapsed(true);
    }
    if (id === 'videoPersonalEdition') {
      setVideoCardExpanded(true);
      setAudioCardCollapsed(true);
      setBundleCardCollapsed(true);
    }
    if (id === 'bundlePersonalEdition') {
      setBundleCardExpanded(true);
      setAudioCardCollapsed(true);
      setVideoCardCollapsed(true);
    }
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
