import { Fragment } from 'react';
import './Loader.scss';

const Loader = (props) => {
  return (
    <>
      <div className="loader_container">
        <div className="loader loader1" />
        <div className="loader loader2" />
        <div className="loader loader3" />
        <div className="loader loader4" />
        <div className="loader loader3" />
      </div>
    </>
  );
};
export default Loader;
