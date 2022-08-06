import { Fragment, useState, useContext } from 'react';
import BlackHole from './BlackHole/BlackHole';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
// import { lightTheme, darkTheme } from '../storage/themeContext';
import './Container.scss';
import ThemeContext from '../storage/themeContext';

const Container = (props) => {
  const themeCtx = useContext(ThemeContext);
  // console.log(themeCtx);

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => {
    console.log('toggleTheme');

    if (isDarkTheme) {
      setIsDarkTheme(false);
    } else if (!isDarkTheme) {
      setIsDarkTheme(true);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <Search toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <ActionBar />
        <Content />
        <Nav />
      </div>
    </Fragment>
  );
};
export default Container;
