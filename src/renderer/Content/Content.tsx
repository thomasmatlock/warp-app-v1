import { Fragment } from 'react';
import Browser from './Browser';
import DownloadsAudio from './DownloadsAudio';
import DownloadsVideo from './DownloadsVideo';
import Warpstagram from './Warpstagram';
// import thumbnail from '../../../assets/Content/thumbnail.png'
import  './Content.scss';
const Content = () => {
    return (

        
        <div className="content">
        {/* <Browser/> */}
        {/* <DownloadsAudio/> */}
        <Browser/>
        <DownloadsVideo/>
        {/* <Warpstagram/> */}
        </div>
            )
}
export default Content;