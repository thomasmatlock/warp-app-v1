import { Fragment, useState } from 'react';
import BlackHole from './BlackHole/BlackHole';
import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import { lightTheme, darkTheme } from './Theme/Theme';
import './Container.scss';

const Container = (props) => {
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
        {/* <BlackHole /> */}
        {/* <Search /> */}
        {/* <Search toggleTheme={toggleTheme} /> */}
        <Search toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <ActionBar />
        <Content />
        <Nav />
      </div>
    </Fragment>
  );
};
export default Container;
