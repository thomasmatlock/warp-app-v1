import { Fragment } from 'react';
import BlackHole from './BlackHole/BlackHole';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import './Container.scss';

const Container = () => {
    return <Fragment>
        <div className="container">
            {/* <BlackHole /> */}
            <Search />
            <ActionBar />
            <Content />
            <Nav />
        </div>
    </Fragment>
}
export default Container;