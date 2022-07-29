import { Fragment } from 'react';
import './ModalOutputFolder.scss';

const ModalOutputFolder = (props) => {
  return (
    <Fragment>
      <div id={props.id} className="modalOutputFolder">
        <div className="modalOutputFolder_title">
          <p>{props.label}</p>
        </div>
        <div className="modalOutputFolder_userInput">
          <div className="modalOutputFolder_userInput__textInput">
            <input type="text" placeholder={props.placeholder} />
          </div>
          <div
            id="modalOutputFolderBtn_audio"
            className="modalOutputFolder_userInput__button"
          >
            <p>Browse</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalOutputFolder;
