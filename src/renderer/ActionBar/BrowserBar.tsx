import { Fragment } from 'react';
import  './BrowserBar.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = () => {
    return <Fragment>
        <div className="browserBar">
            <a className="browserBarDownloadSource">
                <img className="browserBarDownloadSourceIcon1" src={browserBarDownloadSourceIcon1} />
                <p className="browserBarDownloadSourceText">Source</p>
                <img className="browserBarDownloadSourceIcon2" src={browserBarDownloadSourceIcon2} />
            </a>
            <a className="browserBarDownloadBtn">Download Audio MP3</a>
        </div>
    </Fragment>
}
export default BrowserBar;