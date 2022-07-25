import { Fragment } from 'react';
import classes from './ActionBar.module.scss';
import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import FilterBar from '../ActionBar/FilterBar/FilterBar';
const ActionBar = (props) => {

    const audio = true;
    const video = true;
    const warpstagram = true;
    return <Fragment>
        <div className={classes.actionBar} >
            {audio && <BrowserBar />}
            {warpstagram && <FilterBar />}
        </div>
    </Fragment>
}
export default ActionBar;