/* eslint-disable jsx-a11y/alt-text */
import { Fragment, useState, useContext } from 'react';
import './Search.scss';
import SearchIcon from './lightning.svg';
import SunIcon from './sun.svg';
import MoonIcon from './moon.svg';
import clearTextIcon from './close.svg';
import settingsIcon from '../Common/gear.svg';
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
  // console.log(navCtx);
  window.electron.ipcRenderer.on('search focus', () => {
    console.log('search focus');

    // document.getElementById('search__input').blur();
    document.getElementById('search__input').focus();
    Array.from(document.getElementsByClassName('search__input')).forEach(
      (item) => {
        // item.blur();
        item.focus();
      }
    );
    Array.from(document.getElementsByClassName('search')).forEach((item) => {
      // item.blur();
      item.focus();
    });
    // document.getElementById('search__input').focus();
  });
  const prefsCtx = useContext(PrefsContext);
  // console.log(prefsCtx.prefs);

  const restoreInputDefaultWidthDelay = 3000;

  const [clearIcon, setClearIcon] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

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

    window.electron.ipcRenderer.sendMessage('Search: InputChange', ['']);
  };
  const searchInputBlurHandler = (event) => {
    let inputContainsText = event.target.value.length > 0;
    if (clearIcon == false && inputCtx.searchText.length === 0) {
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
  const focusHandler = () => {};
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (modalsCtx.isModalOpen) {
        modalsCtx.modalStateHandler(false);
      }
      if (!modalsCtx.isModalOpen && inputCtx.searchText.length > 0)
        searchClearTextHandler();
    }
  });
  window.addEventListener('keydown', (event) => {
    // console.log(event.key);

    Array.from(document.getElementsByClassName('search__input')).forEach(
      (item) => {
        if (!modalsCtx.isModalOpen) item.focus();
        if (modalsCtx.isModalOpen) item.blur();
        if (event.key === 'Escape') {
          if (inputCtx.searchText.length === 0) item.blur();
        }
        if (event.key === 'Control') item.blur();
        if (event.key === 'Shift') item.blur();
        if (event.key === '!' || event.key === '@' || event.key === '#') {
          item.blur();
          setTimeout(() => {
            // if (inputCtx.searchText.length != 0) item.focus();
          }, 1000);
        }
      }
    );
  });
  const mouseEnterHandler = () => {
    window.electron.ipcRenderer.sendMessage('screenshot', 'from search');
  };
  const mouseLeaveHandler = () => {};

  return (
    <>
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
      {/* {themeCtx.isDarkTheme && (
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
          />
        </div>
      )} */}
      {/* {!themeCtx.isDarkTheme && (
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
          />
        </div>
      )} */}
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
          prefs={prefsCtx.prefs}
          // isLicenseMode={navCtx.licenseMode}
        />
      )}
    </>
  );
};
export default Search;
