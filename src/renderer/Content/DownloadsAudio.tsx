import { Fragment, useState, useContext } from 'react';
import thumbnail from '../../../assets/Content/dummy_thumbnail.png';
import iconLength from '../../../assets/Downloads/duration.svg';
import iconFileSize from '../../../assets/Downloads/fileSize.svg';
import IconFileTypeAudio from '../../../assets/Downloads/fileTypeAudio.svg';
import DownloadItem from './DownloadItem';

import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import DownloadsContext from '../../storage/downloadsContext';
import InputContext from '../../storage/inputContext';

import './Downloads.scss';

const DownloadsAudio = () => {
  const [searchInput, setSearchInput] = useState('');
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  // console.log(inputCtx.searchText);

  const downloadSelectedHandler = (id) => {
    console.log(id);
  };
  // DOM EVENT LISTENERS
  // Filter items with "search"
  // window.addEventListener('keyup', (e) => {
  //   // console.log(e.key);

  //   // Loop items
  //   // getElementsByClassName returns an object of type HTML collection, very similar to normal JS array
  //   // we cant loop the object directly, but pass it to Array.from essentially converts its type to a standard array
  //   // this obv means we can now loop it. The elements in this array stay the same, so we can still use them
  //   Array.from(
  //     document.getElementsByClassName(
  //       'content__panel__downloads__list__item__audio'
  //     )
  //   ).forEach((item) => {
  //     // console.log(item);

  //     // Hide items that dont match the search value
  //     // let hasMatch = item.innerText.toLowerCase().includes(search.value); // hasMatch will now hold a boolean value based on whether the item text matches the search text
  //     let hasMatch = item.title.toLowerCase().includes(inputCtx.searchText); // hasMatch will now hold a boolean value based on whether the item text matches the search text
  //     // console.log(hasMatch);

  //     // item.style.display = hasMatch ? 'flex' : 'none'; // if item text matches search text, display, else set display to none
  //   });
  // });
  const audioDownloads = (
    <ul className="content__panel__downloads__list">
      {downloadsCtx.downloadsAudio.map(
        (item) =>
          item.title.toLowerCase().includes(inputCtx.searchText) && (
            <DownloadItem
              format={item.format}
              id={item.id}
              key={item.id}
              length={item.length}
              size={item.size}
              source={item.source}
              thumbnail={item.thumbnail}
              title={item.title}
              type={item.type}
            />
          )
      )}
    </ul>
  );
  return (
    <Fragment>
      <div
        className={
          actionBarCtx.isDownloadsPanelCollapsed
            ? 'contentPanel__collapsed'
            : 'contentPanel'
        }
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.content.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.content.light.backgroundColor,
              }
        }
      >
        {audioDownloads}
      </div>
    </Fragment>
  );
};
export default DownloadsAudio;
