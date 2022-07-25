import { Fragment } from 'react';
import Search from '../Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from '../Nav/Nav';
import classes from './Container.module.scss';
const Container = (props) => {
    return <Fragment>
        <div className={classes.container}>
            <Search />
            <ActionBar />
            <Content />
            <Nav />
        </div>
    </Fragment>
}
export default Container;