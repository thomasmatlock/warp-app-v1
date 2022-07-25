import { Fragment } from 'react';
import  './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './BrowserBar';
import FilterBar from './FilterBar';
const ActionBar = () => {

    const audio = true;
    const video = true;
    const warpstagram = true;
    return <Fragment>
        <div className="actionBar" >
            <BrowserBar />
            <FilterBar />
            {/* {audio && <BrowserBar />} */}
            {/* {warpstagram && <FilterBar />} */}
        </div>
    </Fragment>
}
export default ActionBar;