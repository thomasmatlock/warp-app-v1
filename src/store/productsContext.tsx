import React, { useState, useEffect, createContext } from 'react';
import racingIcon from '../renderer/Products/racing.svg';
// import playlistIcon from '../renderer/Products/playlistAudio.svg';
import playlistIcon from '../renderer/Products/playlistVideo.svg';
import channelIcon from '../renderer/Products/channel.svg';
// import audioThreeModelURL from '../renderer/Global/video.glb';
// invert svg

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
// import hoverCardImg2 from '../public/GridCards/hoverCardImg2.webp';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
// import hoverCardImg2 from '../renderer/Global/GridCards/2.png';
import hoverCardImg3 from '../renderer/Global/GridCards/hoverCardImg3.png';

const ProductsGridCardsContext = createContext({
  audioCardExpanded: false,
  videoCardExpanded: false,
  bundleCardExpanded: false,
  audioCardCollapsed: false,
  videoCardCollapsed: false,
  bundleCardCollapsed: false,
  cardsData: [
    {
      id: 'audioPersonalEdition',
      image: hoverCardImg1,
      title: 'Audio Personal Edition',
      description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
      alt: '',
      ctaMessage: 'Go to checkout',
      threeScene: 'audio',
      // threeModelURL: audioThreeModelURL,
      expanded: false,
      collapsed: false,
      features: [
        {
          id: 'audioFeature1',
          title: 'Audio Feature 1',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: racingIcon,
        },
      ],
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
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      alt: '',
      ctaMessage: 'Go to checkout',
      expanded: audioCardExpanded,
      collapsed: audioCardCollapsed,
      threeScene: 'audioPersonalEdition',
      // threeModelURL: audioThreeModelURL,

      features: [
        {
          id: 'audioFeature1',
          title: 'Simultaneous downloads',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: racingIcon,
        },
        {
          id: 'audioFeature2',
          title: '  Multiple Formats',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'audioFeature3',
          title: 'Channels',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: channelIcon,
          inverted: true,
        },
        {
          id: 'audioFeature4',
          title: 'Playlists',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'audioFeature5',
          title: 'Bulk Import and Export URLS',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: racingIcon,
        },
      ],
    },
    {
      id: 'videoPersonalEdition',
      expanded: videoCardExpanded,
      image: hoverCardImg2,
      title: 'Video Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      collapsed: videoCardCollapsed,
      threeScene: 'videoPersonalEdition',
      // threeModelURL: audioThreeModelURL,
      features: [
        {
          id: 'videoFeature1',
          title: 'Video Feature 1',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: racingIcon,
        },
        {
          id: 'videoFeature2',
          title: 'Simultaneous downloads',
          description: `Built-in, lightning-fast Chrome browser side by side with all your downloads in one place, with a dual search to simultaneously find what you want - online and offline.`,
          image: racingIcon,
        },
      ],
    },
    {
      id: 'bundlePersonalEdition',
      image: hoverCardImg3,
      title: 'Bundle Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      expanded: bundleCardExpanded,
      collapsed: bundleCardCollapsed,
      threeScene: 'bundlePersonalEdition',
      // threeModelURL: audioThreeModelURL,

      features: [
        {
          id: 'bundleFeature1',
          title: 'Bundle Feature 1',
          description: `Everything in the Audio and Video editions, plus the ability to download entire playlists and channels from YouTub`,
          image: racingIcon,
        },
      ],
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
        audioCardCollapsed,
        videoCardCollapsed,
        bundleCardCollapsed,
        getCardID,
        // toggleUserInteracting,
      }}
    >
      {props.children}
    </ProductsGridCardsContext.Provider>
  );
}

export default ProductsGridCardsContext;
