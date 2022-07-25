import { Fragment } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
// import Nav from './Nav/Nav';
import Container from './Container';
// import ActionBar from './ActionBar/ActionBar';

const Hello = () => {
  return (
    <Container/>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
