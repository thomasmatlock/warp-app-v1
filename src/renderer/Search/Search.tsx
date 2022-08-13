import { Fragment, useState, useContext } from 'react';
import './Search.scss';
import SearchIcon from '../../../assets/Search/lightning.svg';
// import SunIcon from '../../../assets/Search/sun_colored.svg';
import SunIcon from '../../../assets/Search/sun.svg';
// import SunIcon from '../../../assets/Search/sun2.svg';
// import MoonIcon from '../../../assets/Search/moon_colored.svg';
// import MoonIcon from '../../../assets/Search/moon.svg';
// import MoonIcon from '../../../assets/Search/moon2.svg';
// import MoonAstronaut from '../../../assets/Search/moon_astronaut.svg';
// import MoonAstronaut from '../../../assets/astronauts/SVG/white/asset 6.svg';
// import SunAstronaut from '../../../assets/Search/sun_astronaut.svg';
import MoonIcon from '../../../assets/Search/moon.svg';
import clearTextIcon from '../../../assets/Search/close.svg';
import settingsIcon from '../../../assets/Search/gear.svg';
// import Modal from '../Modal/Modal';
import ModalPreferences from '../Modal/ModalPreferences';
import ThemeContext from '../../storage/themeContext';
import NavContext from '../../storage/navContext';
import InputContext from '../../storage/inputContext';
import ModalsContext from '../../storage/modalsContext';
import PrefsContext from '../../storage/prefsContext';

const Search = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);
  const inputCtx = useContext(InputContext);
  const modalsCtx = useContext(ModalsContext);
  // console.log(modalsCtx.prefs);

  const prefsCtx = useContext(PrefsContext);
  // console.log(prefsCtx.prefs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const restoreInputDefaultWidthDelay = 3000;

  const [clearIcon, setClearIcon] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  let prefs;
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    console.log(arg.general.checkboxes[0].checked);
    console.log(arg.general.checkboxes[1].checked);

    setTimeout(() => {
      prefs = arg;
    }, 500);
  });
  const searchInputChangeHandler = (event) => {
    if (event.target.value.length > 0) {
      setClearIcon(true);
      window.electron.ipcRenderer.sendMessage('Search: InputChange', [
        event.target.value,
      ]);
    }
    inputCtx.setSearchText(event.target.value);
  };
  const searchClearTextHandler = () => {
    setClearIcon(false);
    inputCtx.setSearchText('');
    // setPlaceholderController();

    window.electron.ipcRenderer.sendMessage('Search: InputChange', ['']);
  };
  const searchInputBlurHandler = (event) => {
    let inputContainsText = event.target.value.length > 0;
    if (clearIcon == false && inputCtx.searchText.length === 0) {
      // setPlaceholderController();
    }
    if (!inputContainsText) {
      setTimeout(() => {
        userStoppedInteracting();
      }, restoreInputDefaultWidthDelay);
    }
  };
  const userStartedInteracting = () => {
    setIsHovering(true);
  };
  const userStoppedInteracting = () => {
    // let inputContainsText = searchText.length > 0;
    if (clearIcon == false && inputCtx.searchText.length === 0) {
      // setPlaceholderController();
      setTimeout(() => {
        // userStoppedInteracting();
        setIsHovering(false);
      }, restoreInputDefaultWidthDelay);
    }
  };
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modalsCtx.modalStateHandler(false);
    }
    if (event.key === 'Escape' && !modalsCtx.isModalOpen) {
      searchClearTextHandler();
    }
  });
  const mouseEnterHandler = () => {
    window.electron.ipcRenderer.sendMessage('screenshot', 'from search');
  };
  const mouseLeaveHandler = () => {};

  return (
    <Fragment>
      <form
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.search.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.search.light.backgroundColor,
              }
        }
        className="search"
        onSubmit={inputCtx.searchInputSubmit}
        // onMouseEnter={userStartedInteracting}
        // onMouseLeave={userStoppedInteracting}
      >
        <img
          id="search__input__icon__unfocused"
          className="search__input__icon search__input__icon__unfocused"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(100%)' }
              : {
                  filter: 'invert(0%)',
                }
          }
          src={SearchIcon}
        />
        <input
          // autoFocus
          id="search__input"
          className={isHovering ? 'search__input__hovering' : 'search__input'}
          style={
            themeCtx.isDarkTheme
              ? {
                  backgroundColor: themeCtx.search.dark.inputBackgroundColor,
                  color: themeCtx.search.dark.color,
                  // filter: 'invert(100%)',
                }
              : {
                  backgroundColor: themeCtx.search.light.inputBackgroundColor,
                  color: themeCtx.search.light.color,
                  // filter: 'invert(0%)',
                }
          }
          type="text"
          value={inputCtx.searchText}
          onChange={searchInputChangeHandler}
          onMouseEnter={userStartedInteracting}
          onMouseLeave={userStartedInteracting}
          onBlur={searchInputBlurHandler}
          placeholder={navCtx.placeholder}
          spellCheck="false"
        />
        {clearIcon && (
          <img
            id="search__input__icon__focused"
            className="search__input__icon search__input__icon__clearText"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
            src={clearTextIcon}
            onClick={searchClearTextHandler}
          />
        )}
      </form>
      {themeCtx.isDarkTheme && (
        <div onClick={themeCtx.toggleTheme} className="theme">
          <img
            src={MoonIcon}
            // src={MoonAstronaut}
            className="theme__icon "
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
            title="Change Theme"
            // className="theme__icon theme__icon__moon"
            // onClick={showModalHandler}
          />
        </div>
      )}{' '}
      {!themeCtx.isDarkTheme && (
        <div onClick={themeCtx.toggleTheme} className="theme">
          <img
            src={SunIcon}
            // src={SunAstronaut}
            className="theme__icon"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
            title="Change Theme"

            // className="theme__icon theme__icon__sun"
            // onClick={showModalHandler}
          />
        </div>
      )}
      <div className="settings">
        <img
          src={settingsIcon}
          className="settings_icon"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(100%)' }
              : {
                  filter: 'invert(0%)',
                }
          }
          onClick={modalsCtx.showModalHandler}
          title="Open Preferences"
        />
      </div>
      {modalsCtx.isModalOpen && (
        <ModalPreferences
          prefs={prefs}
          // isLicenseMode={navCtx.licenseMode}
        />
      )}
    </Fragment>
  );
};
export default Search;
