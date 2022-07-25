import { Fragment } from 'react';
import classes from './ActionBar.module.scss';
import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import FilterBar from '../ActionBar/FilterBar/FilterBar';
const ActionBar = (props) => {
    return <Fragment>
        <div className={classes.actionBar} >
            <BrowserBar />
            <FilterBar />
        </div>
    </Fragment>
}
export default ActionBar;