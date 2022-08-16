import { Fragment, useState, useEffect, useContext } from 'react';

import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import DownloadsContext from '../../storage/downloadsContext';
import InputContext from '../../storage/inputContext';

import DownloadItem from './DownloadItem';
import Sort from './Sort';

import './Downloads.scss';

const DownloadsVideo = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);

  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  const [downloads, setDownloads] = useState(downloadsCtx.downloadsVideo);
  const videoDownloads = (
    <ul className="content__panel__downloads__list">
      {actionBarCtx.sortAZ &&
        // downloads.map(
        Sort.byAZ(downloadsCtx.downloadsVideo, 'title').map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
                format={item.format}
                fps={item.fps}
                id={item.id}
                key={item.id}
                length={item.length}
                resolution={item.resolution}
                size={item.size}
                source={item.source}
                thumbnail={item.thumbnail}
                title={item.title}
                type={item.type}
              />
            )
        )}{' '}
      {actionBarCtx.sortZA &&
        // downloads.map(
        Sort.byZA(downloadsCtx.downloadsVideo, 'title').map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
                format={item.format}
                fps={item.fps}
                id={item.id}
                key={item.id}
                length={item.length}
                resolution={item.resolution}
                size={item.size}
                source={item.source}
                thumbnail={item.thumbnail}
                title={item.title}
                type={item.type}
              />
            )
        )}{' '}
      {actionBarCtx.sortNewOld &&
        // downloads.map(
        Sort.byDateNewToOld(downloadsCtx.downloadsVideo, 'date').map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
                format={item.format}
                fps={item.fps}
                id={item.id}
                key={item.id}
                length={item.length}
                resolution={item.resolution}
                size={item.size}
                source={item.source}
                thumbnail={item.thumbnail}
                title={item.title}
                type={item.type}
              />
            )
        )}{' '}
      {actionBarCtx.sortOldNew &&
        // downloads.map(
        Sort.byDateOldToNew(downloadsCtx.downloadsVideo, 'date').map(
          (item) =>
            item.title.toLowerCase().includes(inputCtx.searchText) && (
              <DownloadItem
                date={item.date}
                format={item.format}
                fps={item.fps}
                id={item.id}
                key={item.id}
                length={item.length}
                resolution={item.resolution}
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
        {videoDownloads}
      </div>
    </Fragment>
  );
};
export default DownloadsVideo;
