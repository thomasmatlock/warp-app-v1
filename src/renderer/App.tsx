import { Fragment } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
// import Nav from './Nav/Nav';
import Container from './Container';
// import { nanoid } from 'nanoid/async';

// let testID;
// async function createUser() {
//   testID = await nanoid();
//   console.log(testID);
//   return testID;
// }
// createUser();

const Hello = () => {
  return <Container />;
};

export default function App() {
  // window.electron.ipcRenderer.on('resize', (arg) => {
  //   // eslint-disable-next-line no-console
  //   console.log('resize');
  // });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
