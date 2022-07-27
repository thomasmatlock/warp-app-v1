import { Fragment } from 'react';
import './Browser.scss';
import youtubePlaceholder from '../../../assets/Content/Browser/youtubeDark1.png';

const Browser = () => {
  return (
    <Fragment>
      <div className="contentPanel__browser">
        <img src={youtubePlaceholder} alt="" />
      </div>
    </Fragment>
  );
};
export default Browser;
