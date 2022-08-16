import { Fragment, useContext } from 'react';
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Container from './Container';
// import Youtube from '../downloaders/youtube/Youtube';
// import ThemeContext from '../storage/themeContext';

export default function App() {
  // console.log(Youtube);
  // const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <Container />
    </Fragment>
  );
}
