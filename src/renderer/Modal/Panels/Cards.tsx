import { Fragment, useState, useContext } from 'react';
import './Cards.scss';
import Card from './Card';
import ProductsContext from '../../../store/productsContext';
import IconFileTypeAudio from '../../../../assets/Modals/license/fileTypeAudio.svg';
import IconFileTypeVideo from '../../../../assets/Modals/license/fileTypeVideo.svg';

const Cards = () => {
  const productsCtx = useContext(ProductsContext);
  const [audioCardExpanded, setAudioCardExpanded] = useState(false);
  const [videoCardExpanded, setVideoCardExpanded] = useState(false);
  const [warpstagramCardExpanded, setWarpstagramCardExpanded] = useState(false);
  const [bundleCardExpanded, setBundleCardExpanded] = useState(true);
  const audioCard = {
    title: 'Personal Audio Edition',
    id: 'audioCard',
    background: 'linear-gradient(-45deg, red, #e73c7e, #ff8500)',
    // header_source: IconFileTypeAudio,

    productID1: 'product_audio_1',
    productID2: 'product_audio_2',
  };
  const videoCard = {
    title: 'Personal Video Edition',
    id: 'videoCard',
    // $gradient-blue: linear-gradient( to left, #0463db 0%, #0b88e6 33%, #13aff2 66%, #19d2fc 100%);
    background: 'linear-gradient( -45deg, #0463db , #19d2fc )',
    productID1: 'product_video_1',
    productID2: 'product_video_2',
  };
  const warpstagramCard = {
    title: 'Person Warpstagram Edition',
    id: 'warpstagramCard',
    background: 'linear-gradient( -45deg, #9200A9, #B65CFA )',
    productID1: 'product_warpstagram_1',
    productID2: 'product_warpstagram_2',
  };
  const bundleCard = {
    title:
      // 'Ultimate Bundle: Professional Audio, Video, and Warpstagram Editions',
      'Ultimate Bundle: Audio and Video Personal Editions',
    id: 'bundleCard',
    productID: 'product_bundle',
  };
  return (
    <div className="cards">
      <Card
        info={audioCard}
        onClick={productsCtx.expandAudioCard}
        expanded={productsCtx.audioCardExpanded}
      />
      <Card
        info={videoCard}
        onClick={productsCtx.expandVideoCard}
        expanded={productsCtx.videoCardExpanded}
      />
      {/* <Card
        info={warpstagramCard}
        onClick={productsCtx.expandWarpstagramCard}
        expanded={productsCtx.warpstagramCardExpanded}
      /> */}
      <Card
        info={bundleCard}
        onClick={productsCtx.expandBundleCard}
        expanded={productsCtx.bundleCardExpanded}
      />
    </div>
  );
};
export default Cards;
