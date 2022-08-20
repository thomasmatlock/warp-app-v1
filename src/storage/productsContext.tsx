import React, { useState, useEffect } from 'react';

const ProductsContext = React.createContext({
  audioCardExpanded: false,
  videoCardExpanded: false,
  warpstagramCardExpanded: false,
  bundleCardExpanded: true,
  isViewingAudio1: false,
  isViewingAudio2: false,
  isViewingVideo1: false,
  isViewingVideo2: false,
  isViewingWarpstagram1: false,
  isViewingWarpstagram2: false,
  isViewingBundle: false,
  isPurchasingAudio1: false,
  isPurchasingAudio2: false,
  isPurchasingVideo1: false,
  isPurchasingVideo2: false,
  isPurchasingWarpstagram1: false,
  isViewingProduct1: false,
  isViewingProduct2: false,
  isBuyingProduct1: false,
  isBuyingProduct2: false,

  isPurchasingWarpstagram2: false,
  isPurchasingBundle: false,
  expandAudioCard: () => {},
  expandVideoCard: () => {},
  expandWarpstagramCard: () => {},
  expandBundleCard: () => {},
});

export const ProductsContextProvider = (props) => {
  const [audioCardExpanded, setAudioCardExpanded] = useState(true);
  const [videoCardExpanded, setVideoCardExpanded] = useState(false);
  const [warpstagramCardExpanded, setWarpstagramCardExpanded] = useState(false);
  const [bundleCardExpanded, setBundleCardExpanded] = useState(false);
  const [isViewingAudio1, setIsViewingAudio1] = useState(true);
  const [isViewingAudio2, setIsViewingAudio2] = useState(true);
  const [isViewingVideo1, setIsViewingVideo1] = useState(true);
  const [isViewingVideo2, setIsViewingVideo2] = useState(true);
  const [isViewingWarpstagram1, setIsViewingWarpstagram1] = useState(true);
  const [isViewingWarpstagram2, setIsViewingWarpstagram2] = useState(true);
  const [isViewingBundle, setIsViewingBundle] = useState(true);
  const [isPurchasingAudio1, setIsPurchasingAudio1] = useState(false);
  const [isPurchasingAudio2, setIsPurchasingAudio2] = useState(false);
  const [isPurchasingVideo1, setIsPurchasingVideo1] = useState(false);
  const [isPurchasingVideo2, setIsPurchasingVideo2] = useState(false);
  const [isPurchasingWarpstagram1, setIsPurchasingWarpstagram1] =
    useState(false);
  const [isPurchasingWarpstagram2, setIsPurchasingWarpstagram2] =
    useState(false);
  const [isPurchasingBundle, setIsPurchasingBundle] = useState(false);
  ////
  const [isViewingProduct1, setIsViewingProduct1] = useState(false);
  const [isViewingProduct2, setIsViewingProduct2] = useState(false);
  const [isBuyingProduct1, setIsBuyingProduct1] = useState(false);
  const [isBuyingProduct2, setIsBuyingProduct2] = useState(false);
  const disableAllStates = () => {
    setIsViewingAudio1(false);
    setIsViewingAudio2(false);
    setIsViewingVideo1(false);
    setIsViewingVideo2(false);
    setIsViewingWarpstagram1(false);
    setIsViewingWarpstagram2(false);
    setIsViewingBundle(false);

    setIsPurchasingAudio1(false);
    setIsPurchasingAudio2(false);
    setIsPurchasingVideo1(false);
    setIsPurchasingVideo2(false);
    setIsPurchasingWarpstagram1(false);
    setIsPurchasingWarpstagram2(false);
    setIsPurchasingBundle(false);
  };

  const collapseAllCards = () => {
    setAudioCardExpanded(false);
    setVideoCardExpanded(false);
    setWarpstagramCardExpanded(false);
    setBundleCardExpanded(false);
  };
  const expandAudioCard = () => {
    collapseAllCards();
    setAudioCardExpanded(true);
  };
  const expandVideoCard = () => {
    collapseAllCards();
    setVideoCardExpanded(true);
  };
  const expandWarpstagramCard = () => {
    collapseAllCards();
    setWarpstagramCardExpanded(true);
  };
  const expandBundleCard = () => {
    collapseAllCards();
    setBundleCardExpanded(true);
  };
  return (
    <ProductsContext.Provider
      value={{
        audioCardExpanded: audioCardExpanded,
        videoCardExpanded: videoCardExpanded,
        warpstagramCardExpanded: warpstagramCardExpanded,
        bundleCardExpanded: bundleCardExpanded,

        expandAudioCard: expandAudioCard,
        expandVideoCard: expandVideoCard,
        expandWarpstagramCard: expandWarpstagramCard,
        expandBundleCard: expandBundleCard,

        isViewingAudio1: isViewingAudio1,
        isViewingAudio2: isViewingAudio2,
        isViewingVideo1: isViewingVideo1,
        isViewingVideo2: isViewingVideo2,
        isViewingWarpstagram1: isViewingWarpstagram1,
        isViewingWarpstagram2: isViewingWarpstagram2,
        isViewingBundle: isViewingBundle,
        isPurchasingAudio1: isPurchasingAudio1,
        isPurchasingAudio2: isPurchasingAudio2,
        isPurchasingVideo1: isPurchasingVideo1,
        isPurchasingVideo2: isPurchasingVideo2,
        isPurchasingWarpstagram1: isPurchasingWarpstagram1,
        isPurchasingWarpstagram2: isPurchasingWarpstagram2,
        isPurchasingBundle: isPurchasingBundle,

        isViewingProduct1: isViewingProduct1,
        isViewingProduct2: isViewingProduct2,
        isBuyingProduct1: isBuyingProduct1,
        isBuyingProduct2: isBuyingProduct2,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
