import { Fragment, useContext } from 'react';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import './Container.scss';
import ThemeContext from '../storage/themeContext';

const Container = (props) => {
  const themeCtx = useContext(ThemeContext);
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
