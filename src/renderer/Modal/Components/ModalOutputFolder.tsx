import { Fragment } from 'react';
import './ModalOutputFolder.scss';

const ModalOutputFolder = (props) => {
  // console.log(props);

  const clickHandler = (e) => {
    // console.log(props.id);
  };
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
            onClick={clickHandler}
            className="modalOutputFolder_userInput__button"
          >
            <p>Change folder</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalOutputFolder;
