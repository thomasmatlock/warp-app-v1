import { Fragment, useState, useEffect, useContext } from 'react';
import DownloadItem from './DownloadItem';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import DownloadsContext from '../../storage/downloadsContext';
import InputContext from '../../storage/inputContext';
import Sort from './Sort';
import './Downloads.scss';

const DownloadsAudio = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);

  const audioDownloads = (
    <ul className="content__panel__downloads__list">
      {actionBarCtx.sortAZ &&
        // downloads.map(
        Sort.byAZ(downloadsCtx.downloadsAudio, 'title').map(
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
        )}{' '}
      {actionBarCtx.sortZA &&
        // downloads.map(
        Sort.byZA(downloadsCtx.downloadsAudio, 'title').map(
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
        )}{' '}
      {actionBarCtx.sortNewOld &&
        // downloads.map(
        Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date').map(
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
        )}{' '}
      {actionBarCtx.sortOldNew &&
        // downloads.map(
        Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date').map(
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
