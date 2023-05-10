import React, { useState, useEffect, createContext } from 'react';
// import data from './productsData';

import racingIcon from '../renderer/Products/assets/racing.svg';
import playlistIcon from '../renderer/Products/assets/playlistVideo.svg';
import channelIcon from '../renderer/Products/assets/channel.svg';
import linkIcon from '../renderer/Products/assets/link.svg';
import fastForwardIcon from '../renderer/Products/assets/fastForward.svg';
import wavIcon from '../renderer/Products/assets/wav.png';
import mp4Icon from '../renderer/Products/assets/film2.png';
import rocketIcon from '../renderer/Products/assets/rocket2.png';

import hoverCardImg1 from '../renderer/Global/GridCards/hoverCardImg1.png';
import hoverCardImg2 from '../renderer/Global/GridCards/hoverCardImg2.png';
import hoverCardImg3 from '../renderer/Global/GridCards/hoverCardImg3.png';

const ProductsGridCardsContext = createContext({
  audioCardExpanded: false,
  videoCardExpanded: false,
  warpstagramCardExpanded: false,
  bundleCardExpanded: false,
  audioCardCollapsed: false,
  videoCardCollapsed: false,
  warpstagramCardCollapsed: false,
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
  goBackHandler: () => {},
  // toggleUserInteracting: () => {},
});

export function ProductsGridCardsContextProvider(props: any) {
  // const [isCheckoutDev, setCheckoutDev] = useState(true);
  // const [userInteracting, setUserInteracting] = useState(false);
  /// //////////////////////////////////////////
  // BASICS
  const [isAudioCheckoutDev, setAudioCheckoutDev] = useState(true); // DEFAULT IS FALSE
  const [isVideoCheckoutDev, setVideoCheckoutDev] = useState(false); // DEFAULT IS FALSE
  const [isWarpstagramCheckoutDev, setWarpstagramCheckoutDev] = useState(false); // DEFAULT IS FALSE
  const [isBundleCheckoutDev, setBundleCheckoutDev] = useState(false); // DEFAULT IS FALSE
  // BASICS
  /// //////////////////////////////////////////
  // EXPANDED
  const [audioCardExpanded, setAudioCardExpanded] =
    useState(isAudioCheckoutDev);
  const [videoCardExpanded, setVideoCardExpanded] =
    useState(isVideoCheckoutDev);
  const [warpstagramCardExpanded, setWarpstagramCardExpanded] = useState(
    isWarpstagramCheckoutDev
  );
  const [bundleCardExpanded, setBundleCardExpanded] =
    useState(isBundleCheckoutDev);
  // EXPANDED
  /// //////////////////////////////////////////
  // COLLAPSED
  const [audioCardCollapsed, setAudioCardCollapsed] = useState(
    isVideoCheckoutDev || isWarpstagramCheckoutDev || isBundleCheckoutDev
  );
  const [videoCardCollapsed, setVideoCardCollapsed] = useState(
    isAudioCheckoutDev || isWarpstagramCheckoutDev || isBundleCheckoutDev
  );
  const [warpstagramCardCollapsed, setWarpstagramCardCollapsed] = useState(
    isAudioCheckoutDev || isVideoCheckoutDev || isBundleCheckoutDev
  );
  const [bundleCardCollapsed, setBundleCardCollapsed] = useState(
    isAudioCheckoutDev || isVideoCheckoutDev || isWarpstagramCheckoutDev
  );
  // COLLAPSED
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
          description: `Triple Speed: up to 3 concurrent downloads at once.`,
          image: fastForwardIcon,
        },
        {
          id: 'audioFeature2',
          title: 'Multiple Formats',
          description: `Download audio in MP3, OGG, and WAV.`,
          image: wavIcon,
          inverted: true,
        },
        {
          id: 'audioFeature3',
          title: 'Channels',
          description: `Clicking 67 times to download 67 audio files is a thing of the past.`,
          image: channelIcon,
          inverted: true,
        },
        {
          id: 'audioFeature4',
          title: 'Playlists',
          description: `It takes 900 clicks to get an entire playlist. Just kidding. It takes one!`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'audioFeature5',
          title: 'Bulk Import and Export URLS',
          description: `Download audio in MP3, OGG, and WAV.`,
          image: linkIcon,
        },
      ],
    },
    {
      id: 'videoPersonalEdition',
      image: hoverCardImg2,
      title: 'Video Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      expanded: videoCardExpanded,
      collapsed: videoCardCollapsed,
      threeScene: 'videoPersonalEdition',
      // threeModelURL: audioThreeModelURL,

      features: [
        {
          id: 'videoFeature1',
          title: 'Simultaneous downloads',
          description: `Triple Speed: up to 3 concurrent downloads at once.`,
          image: fastForwardIcon,
        },
        {
          id: 'videoFeature2',
          title: 'Multiple Formats',
          description: `Download audio in MP3, OGG, and WAV.`,
          image: mp4Icon,
          inverted: true,
        },
        {
          id: 'videoFeature3',
          title: 'Channels',
          description: `This does what it says to the left. Grab a channels videos with one click.`,
          image: channelIcon,
          inverted: true,
        },
        {
          id: 'videoFeature4',
          title: 'Playlists',
          description: `Download audio in MP3, OGG, and WAV.`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'videoFeature5',
          title: 'Bulk Import and Export URLS',
          description: `Download audio in MP3, OGG, and WAV.`,
          image: linkIcon,
        },
      ],
    },
    {
      id: 'warpstagramPersonalEdition',
      expanded: warpstagramCardExpanded,
      image: hoverCardImg3,
      title: 'Warpstagram Personal Edition',
      description: `The Warp team are developers, designers, and editors. We solved our own frustrations and made it available to you, too!`,
      ctaMessage: 'Go to checkout',
      collapsed: warpstagramCardCollapsed,
      threeScene: 'warpstagramPersonalEdition',
      // threeModelURL: audioThreeModelURL,
      features: [
        {
          id: 'warpstagramFeature1',
          title: 'Simultaneous downloads',
          description: `Triple Speed: up to 3 concurrent downloads at once.`,
          image: racingIcon,
        },
        {
          id: 'warpstagramFeature2',
          title: 'Multiple Formats',
          description: `Download videos in MP4 and MKV.`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'warpstagramFeature3',
          title: 'Simultaneous downloads',
          description: `Triple Speed: up to 3 concurrent downloads at once.`,
          image: racingIcon,
        },
        {
          id: 'warpstagramFeature4',
          title: 'Multiple Formats',
          description: `Download videos in MP4 and MKV.`,
          image: playlistIcon,
          inverted: true,
        },
        {
          id: 'warpstagramFeature5',
          title: 'Simultaneous downloads',
          description: `Triple Speed: up to 3 concurrent downloads at once.`,
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
          title: 'Audio Personal Edition',
          description: `Everything in the Audio edition. Audiophiles rejoice!`,
          image: rocketIcon,
        },
        {
          id: 'bundleFeature2',
          title: 'Video Personal Edition',
          description: `Everything in the Video edition. What are you, a content creator?`,
          image: rocketIcon,
        },
      ],
    },
  ];
  const uncollapseAllCards = () => {
    setAudioCardCollapsed(false);
    setVideoCardCollapsed(false);
    setWarpstagramCardCollapsed(false);
    setBundleCardCollapsed(false);
  };
  const collapseAllCards = () => {
    setAudioCardCollapsed(true);
    setVideoCardCollapsed(true);
    setWarpstagramCardCollapsed(true);
    setBundleCardCollapsed(true);
  };
  const disableAllExpandedCards = () => {
    setAudioCardExpanded(false);
    setVideoCardExpanded(false);
    setWarpstagramCardExpanded(false);
    setBundleCardExpanded(false);
  };
  const getCardID = (id: string) => {
    // console.log('id', id);

    disableAllExpandedCards();
    uncollapseAllCards();
    if (id === 'audioPersonalEdition') {
      setAudioCardExpanded(true);
      setVideoCardCollapsed(true);
      setWarpstagramCardCollapsed(true);
      setBundleCardCollapsed(true);
    }
    if (id === 'videoPersonalEdition') {
      setVideoCardExpanded(true);
      setAudioCardCollapsed(true);
      setWarpstagramCardCollapsed(true);
      setBundleCardCollapsed(true);
    }
    if (id === 'warpstagramPersonalEdition') {
      setWarpstagramCardExpanded(true);
      setAudioCardCollapsed(true);
      setVideoCardCollapsed(true);
      setBundleCardCollapsed(true);
    }
    if (id === 'bundlePersonalEdition') {
      setBundleCardExpanded(true);
      setAudioCardCollapsed(true);
      setVideoCardCollapsed(true);
      setWarpstagramCardCollapsed(true);
    }
  };
  const goBackHandler = () => {
    disableAllExpandedCards();
    uncollapseAllCards();
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
        warpstagramCardExpanded,
        bundleCardExpanded,
        audioCardCollapsed,
        videoCardCollapsed,
        warpstagramCardCollapsed,
        bundleCardCollapsed,
        getCardID,
        goBackHandler,
        // toggleUserInteracting,
      }}
    >
      {props.children}
    </ProductsGridCardsContext.Provider>
  );
}

export default ProductsGridCardsContext;
