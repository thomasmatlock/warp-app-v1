import Search from './Search/Search';
import ActionBar from './ActionBar/ActionBar';
import Content from './Content/Content';
import Nav from './Nav/Nav';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Search />
      <ActionBar />
      <Content />
      <Nav />
    </div>
  );
}
