import { Fragment, useState } from 'react';
import './Search.scss';
// import SearchIcon from '../../assets/public/sections/wrapup/cards/lightning.svg';
import SearchIcon from '../../../assets/Search/lightning.svg';
import clearTextIcon from '../../../assets/Search/close.svg';

const Search = () => {
  const audioPlaceholder = 'audio search...beep boop  ';
  const videoPlaceholder = 'video search...beep boop  ';
  const warpstagramPlaceholder =
    'Enter instagram username, hashtag, or location';
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
    setPlaceholderController();
    setPlaceholder(audioPlaceholder);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setVideoMode(true);
    setAudioMode(false);
    setWarpstagramMode(false);
    setPlaceholderController();
    setPlaceholder(videoPlaceholder);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
    setPlaceholderController();
    setPlaceholder(warpstagramPlaceholder);
  });
  const [placeholder, setPlaceholder] = useState('input search...beep boop');
  const [searchText, setSearchText] = useState('');
  const [clearIcon, setClearIcon] = useState(false);
  const setPlaceholderController = () => {
    if (warpstagramMode) {
      setPlaceholder(warpstagramPlaceholder);
    } else if (videoMode) {
      setPlaceholder(videoPlaceholder);
    } else if (audioMode) {
      setPlaceholder(audioPlaceholder);
    }
  };
  const searchInputSubmit = (event) => {
    event.preventDefault();
    if (searchText.length > 0) {
      console.log(searchText);
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
    if (warpstagramMode) {
      setPlaceholder('Enter instagram username, hashtag, or location');
    } else {
      setPlaceholder('');
    }

    window.electron.ipcRenderer.sendMessage('Search: InputChange', ['']);
  };
  const searchInputBlurHandler = (event) => {
    if (clearIcon == false && searchText.length === 0) {
      setPlaceholderController();
    }
  };

  return (
    <Fragment>
      <form
        className="search"
        onSubmit={searchInputSubmit}
        onMouseLeave={searchInputBlurHandler}
      >
        <img
          id="search__input__icon__unfocused"
          className="search__input__icon search__input__icon__unfocused"
          src={SearchIcon}
        />
        <input
          autoFocus
          id="search__input"
          className="search__input"
          type="text"
          value={searchText}
          onChange={searchInputChangeHandler}
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
    </Fragment>
  );
};
export default Search;
