import { Fragment, useContext } from 'react';
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Container from './Container';
// import ThemeContext from '../storage/themeContext';

export default function App() {
  // const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <Container />
    </Fragment>
  );
}
