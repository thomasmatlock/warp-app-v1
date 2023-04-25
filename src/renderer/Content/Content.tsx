import { useContext } from 'react';
import Browser from './Browser';
import DownloadsAudio from './DownloadsAudio';

import DownloadsVideo from './DownloadsVideo';
import Warpstagram from './Warpstagram';
import NavContext from '../../store/navContext';
import './Content.scss';
const Content = () => {
  const navCtx = useContext(NavContext);

  return (
    <div className="content">
      {navCtx.audioMode && <Browser />}
      {navCtx.audioMode && <DownloadsAudio />}
      {navCtx.videoMode && <Browser />}
      {navCtx.videoMode && <DownloadsVideo />}
      {navCtx.warpstagramMode && <Warpstagram />}
    </div>
  );
};
export default Content;
