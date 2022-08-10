import { Fragment, useContext } from 'react';
import './ModalHeader.scss';
import clearTextIcon from '../../../../assets/Search/close.svg';
import ThemeContext from '../../../storage/themeContext';
const ModalHeader = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <div className="modal_preferences__header">
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
