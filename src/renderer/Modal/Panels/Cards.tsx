import { Fragment, useState } from 'react';
import './Cards.scss';
import Card from './Card';
import IconFileTypeAudio from '../../../../assets/Modals/license/fileTypeAudio.svg';
import IconFileTypeVideo from '../../../../assets/Modals/license/fileTypeVideo.svg';

const Cards = () => {
  const [audioCardExpanded, setAudioCardExpanded] = useState(false);
  const [videoCardExpanded, setVideoCardExpanded] = useState(false);
  const [warpstagramCardExpanded, setWarpstagramCardExpanded] = useState(false);
  const [bundleCardExpanded, setBundleCardExpanded] = useState(true);
  const audioCard = {
    title: 'Professional Audio Edition',
    // header_source: IconFileTypeAudio,
  };
  const videoCard = {
    title: 'Professional Video Edition',
    // header_source: IconFileTypeVideo,
  };
  const warpstagramCard = {
    title: 'Professional Warpstagram Edition',
  };
  const bundleCard = {
    title: 'Bundle: Professional Audio, Video, and Warpstagram Editions',
  };
  const disableAll = () => {
    setAudioCardExpanded(false);
    setVideoCardExpanded(false);
    setWarpstagramCardExpanded(false);
    setBundleCardExpanded(false);
  };
  const audioHandler = () => {
    // console.log('audioHandler');

    disableAll();
    setAudioCardExpanded(true);
  };
  const videoHandler = () => {
    disableAll();
    setVideoCardExpanded(true);
  };
  const warpstagramHandler = () => {
    disableAll();
    setWarpstagramCardExpanded(true);
  };
  const bundleHandler = () => {
    disableAll();
    setBundleCardExpanded(true);
  };
  return (
    <Fragment>
      <div className="wrapup_cards">
        <Card
          info={audioCard}
          onMouseEnter={audioHandler}
          expanded={audioCardExpanded}
        />
        <Card
          info={videoCard}
          onMouseEnter={videoHandler}
          expanded={videoCardExpanded}
        />
        <Card
          info={warpstagramCard}
          onMouseEnter={warpstagramHandler}
          expanded={warpstagramCardExpanded}
        />
        <Card
          info={bundleCard}
          onMouseEnter={bundleHandler}
          expanded={bundleCardExpanded}
        />
      </div>
    </Fragment>
  );
};
export default Cards;
