import { Fragment } from 'react';
import classes from './Content.module.scss';
const Content = (props) => {
    return <Fragment>
        <div className={classes.content}>
            <div className={classes.contentPanel}>hello</div>
            <div className={classes.contentPanel}>hello</div>
        </div>
    </Fragment>
}
export default Content;