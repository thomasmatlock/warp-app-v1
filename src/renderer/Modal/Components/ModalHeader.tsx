/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
import { Fragment, useContext } from 'react';
import './ModalHeader.scss';
import clearTextIcon from '../../Search/close.svg';
// import astronaut from '../../../../assets/astronauts/png/Asset 8 whitened.png';
import ThemeContext from '../../../store/themeContext';
const ModalHeader = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <div className="modal_preferences__header">
        {/* <img
          src={astronaut}
          alt=""
          className="modal_preferences__header__astronaut"
        /> */}
        <h3 className="modal_preferences__header__title">Preferences</h3>
        <div className="modal_preferences__header__close">
          <img
            className="modal_preferences__header__close__icon"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
            src={clearTextIcon}
            onClick={props.onClose}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalHeader;
