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
import Sort from './Sort';

import './Downloads.scss';

const DownloadsAudio = () => {
  const [searchInput, setSearchInput] = useState('');
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);

  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  console.log(downloadsCtx.downloadsAudio[0].title);

  // const [downloads, setDownloads] = useState(downloadsCtx.downloadsAudio);
  const [downloadsAZ, setDownloadsAZ] = useState(
    Sort.byAZ(downloadsCtx.downloadsAudio, 'title')
  );
  // const [downloadsZA, setDownloadsZA] = useState(
  //   Sort.byZA(downloadsCtx.downloadsAudio, 'title')
  // );
  // const [downloadsNewOld, setDownloadsNewOld] = useState(
  //   Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date')
  // );
  // const [downloadsOldNew, setDownloadsOldNew] = useState(
  //   Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date')
  // );
  // console.log(downloads);
  console.log(downloadsAZ[0].title);
  // console.log(downloadsZA[0].title);
  // // console.log(downloadsZA);
  // console.log(downloadsNewOld[0].date);
  // console.log(downloadsOldNew[0].date);

  const audioDownloads = (
    <ul className="content__panel__downloads__list">
      {/* {actionBarCtx.sortAZ && */}
      {downloadsAZ.map(
        (item) =>
          item.title.toLowerCase().includes(inputCtx.searchText) && (
            <DownloadItem
              date={item.date}
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
      {/* {actionBarCtx.sortZA &&
        downloadsZA.map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
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
        )} */}
      {/* {actionBarCtx.sortNewOld &&
        downloadsNewOld.map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
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
        )} */}
      {/* {actionBarCtx.sortOldNew &&
        downloadsOldNew.map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
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
        )} */}
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
