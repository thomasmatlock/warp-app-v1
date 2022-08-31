import { Fragment } from 'react';
import './Loader.scss';

const Loader = (props) => {
  return (
    <Fragment>
      <div className="loader_container">
        <div className="loader1" />
        <div className="loader2" />
        <div className="loader3" />
      </div>
    </Fragment>
  );
};
export default Loader;
