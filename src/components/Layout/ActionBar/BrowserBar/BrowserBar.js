import { Fragment } from 'react';
import classes from './BrowserBar.module.scss';
import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = (props) => {
    return <Fragment>
        <div className={classes.browserBar}>
            <a className={classes.browserBarDownloadSource}>
                <img className={classes.browserBarDownloadSourceIcon1} src={browserBarDownloadSourceIcon1} />
                <p className={classes.browserBarDownloadSourceText}>Source</p>
                <img className={classes.browserBarDownloadSourceIcon2} src={browserBarDownloadSourceIcon2} />
            </a>
            <a className={classes.browserBarDownloadBtn}>Download Audio MP3</a>
        </div>
    </Fragment>
}
export default BrowserBar;