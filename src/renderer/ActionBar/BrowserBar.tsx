import { Fragment } from 'react';
import  './BrowserBar.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = () => {
    return <Fragment>
        <div className="browserBar">
            <div className="browserBarDownloadSource ">
                                <li className="browserBarDownloadSource__item ">
                                    <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">

                                        <img src={browserBarDownloadSourceIcon1} className="browserBarDownloadSource__item__icon"/>

                                        <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">Youtube
                                        </div>
                                    </div>
                                    <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
                                        <img src={browserBarDownloadSourceIcon2} className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"/>
                                    </div>
                                </li> <li className="browserBarDownloadSource__item ">
                                    <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">

                                        <img src={browserBarDownloadSourceIcon1} className="browserBarDownloadSource__item__icon"/>

                                        <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">Youtube
                                        </div>
                                    </div>
                                    <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
                                        <img src={browserBarDownloadSourceIcon2} className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"/>
                                    </div>
                                </li>
            </div>
                
            {/* <a className="browserBarDownloadBtn browserBarDownloadBtn__audio">Download Audio MP3</a> */}
            <a className="browserBarDownloadBtn browserBarDownloadBtn__video">Download Video MP4</a>
        </div>
    </Fragment>
}
export default BrowserBar;