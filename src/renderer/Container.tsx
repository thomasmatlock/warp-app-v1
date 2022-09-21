import { useContext } from 'react';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
// import BlackHoleOld from './BlackHole/BlackHoleOld';
// import BlackHole from './BlackHole/BlackHole';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import './Container.scss';
import ThemeContext from '../storage/themeContext';

const Container = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <div className="container">
      <Search />
      <ActionBar />
      {/* <BlackHole /> */}
      {/* <BlackHoleOld /> */}
      <Content />
      <Nav />
    </div>
  );
};
export default Container;
