import { Fragment } from 'react';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import classes from './Container.module.scss';
const Container = (props) => {
    return <Fragment>
        <div className={classes.container}>
            <Search />
            <Nav />
        </div>
    </Fragment>
}
export default Container;