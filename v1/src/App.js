import { useState, Fragment } from 'react';
// import { app, clipboard, ipcRenderer, shell } from 'electron';
// const { app, clipboard, ipcRenderer, shell } = require('electron');
const electron = window.require('electron'); // using window.require()
const { ipcRenderer } = electron;

import Container from './components/Layout/Container';
// import Container from './components/Layout/Container';
// import package 

export function App() {
  return (
    <Fragment>
      <Container />
    </Fragment>
  );
}
export default App;