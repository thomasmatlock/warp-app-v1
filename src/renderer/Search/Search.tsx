import { Fragment, useState } from 'react';
import './Search.scss';
// import SearchIcon from '../../assets/public/sections/wrapup/cards/lightning.svg';
import SearchIcon from '../../../assets/Search/lightning.svg';
import clearTextIcon from '../../../assets/Search/close.svg';
import settingsIcon from '../../../assets/Search/settings_white.svg';
import Modal from '../Modal/Modal';
import ModalPreferences from '../Modal/ModalPreferences';
import { log } from 'console';

const Search = (props) => {
  // console.log(props.settings);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModalHandler = () => {
    setIsModalOpen(false);
  };
  const showModalHandler = () => {
    setIsModalOpen(true);
    // console.log('showModalHandler');
  };
  const restoreInputDefaultWidthDelay = 3000;
  const audioPlaceholder = 'audio search...beep boop  ';
  const videoPlaceholder = 'video search...beep boop  ';
  const warpstagramPlaceholder =
    'Enter instagram username, hashtag, or location';
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [generalMode, setGeneralMode] = useState(false);
  const [authsMode, setAuthsMode] = useState(false);
  const [licenseMode, setLicenseMode] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const setPlaceholderController = () => {
    if (warpstagramMode) {
      setPlaceholder(warpstagramPlaceholder);
    } else if (videoMode) {
      setPlaceholder(videoPlaceholder);
    } else if (audioMode) {
      setPlaceholder(audioPlaceholder);
    }
  };
  const setAllModesToFalse = () => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(false);
    setGeneralMode(false);
    setAuthsMode(false);
    setLicenseMode(false);
  };

  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setAllModesToFalse();
    setAudioMode(true);
    setPlaceholder(audioPlaceholder);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setAllModesToFalse();
    setVideoMode(true);
    setPlaceholder(videoPlaceholder);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setAllModesToFalse();
    setWarpstagramMode(true);
    setPlaceholder(warpstagramPlaceholder);
  });
  window.electron.ipcRenderer.on('modal: preferences: license', (arg) => {
    setAllModesToFalse();
    setLicenseMode(true);
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  window.electron.ipcRenderer.on('modal: preferences: auths', (arg) => {
    setAllModesToFalse();
    setAuthsMode(true);
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  window.electron.ipcRenderer.on('modal: preferences', (prefs) => {
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }

    // setPlaceholderController();
  });
  const [placeholder, setPlaceholder] = useState('input search...beep boop');
  const [searchText, setSearchText] = useState('');
  const [clearIcon, setClearIcon] = useState(false);

  const searchInputSubmit = (event) => {
    event.preventDefault();
    if (searchText.length > 0) {
      // console.log(searchText);
      window.electron.ipcRenderer.sendMessage('Search: Submit', [searchText]);
    } else {
      console.log('no search text');
    }
  };
  const searchInputChangeHandler = (event) => {
    if (event.target.value.length > 0) {
      setClearIcon(true);
      // console.log(event.target.value);
      window.electron.ipcRenderer.sendMessage('Search: InputChange', [
        event.target.value,
      ]);
    }
    setSearchText(event.target.value);
  };
  const searchClearTextHandler = (event) => {
    setClearIcon(false);
    setSearchText('');
    // setPlaceholderController();

    window.electron.ipcRenderer.sendMessage('Search: InputChange', ['']);
  };
  const searchInputBlurHandler = (event) => {
    let inputContainsText = event.target.value.length > 0;
    if (clearIcon == false && searchText.length === 0) {
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
    if (clearIcon == false && searchText.length === 0) {
      setPlaceholderController();
      setTimeout(() => {
        // userStoppedInteracting();
        setIsHovering(false);
      }, restoreInputDefaultWidthDelay);
    }
  };

  return (
    <Fragment>
      <form
        className="search"
        onSubmit={searchInputSubmit}
        // onMouseEnter={userStartedInteracting}
        // onMouseLeave={userStoppedInteracting}
      >
        <img
          id="search__input__icon__unfocused"
          className="search__input__icon search__input__icon__unfocused"
          src={SearchIcon}
        />
        <input
          autoFocus
          id="search__input"
          className={isHovering ? 'search__input__hovering' : 'search__input'}
          type="text"
          value={searchText}
          onChange={searchInputChangeHandler}
          onMouseEnter={userStartedInteracting}
          onMouseLeave={userStartedInteracting}
          onBlur={searchInputBlurHandler}
          placeholder={placeholder}
          spellCheck="false"
        />
        {clearIcon && (
          <img
            id="search__input__icon__focused"
            className="search__input__icon search__input__icon__clearText"
            src={clearTextIcon}
            onClick={searchClearTextHandler}
          />
        )}
      </form>
      <div className="settings">
        <img
          src={settingsIcon}
          className="settings_icon"
          onClick={showModalHandler}
        />
      </div>
      {isModalOpen && (
        <ModalPreferences
          settings={props.settings}
          onClose={hideModalHandler}
          isAudioMode={audioMode}
          isVideoMode={videoMode}
          isWarpstagramMode={warpstagramMode}
          isAuthsMode={authsMode}
          isLicenseMode={licenseMode}
        />
      )}
    </Fragment>
  );
};
export default Search;
