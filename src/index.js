import ReactDOM from 'react-dom/client';
// import { app, clipboard, ipcRenderer, shell } from 'electron';
// how to import the remote module in a React component?
// const electron = require('electron');
// const remote = electron.remote
// const { BrowserWindow, dialog, Menu } = remote
// const electron = window.require('electron'); // using window.require()
// const { ipcRenderer } = electron;

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
