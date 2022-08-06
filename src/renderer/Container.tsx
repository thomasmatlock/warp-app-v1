import { Fragment } from 'react';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import './Container.scss';

const Container = (props) => {
  return (
    <Fragment>
      <div className="container">
        <Search />
        <ActionBar />
        <Content />
        <Nav />
      </div>
    </Fragment>
  );
};
export default Container;
