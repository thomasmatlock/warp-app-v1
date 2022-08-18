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
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  // console.log(downloadsCtx.downloadsVideo[0].background);

  const [downloads, setDownloads] = useState(
    Array.from(downloadsCtx.downloadsVideo).sort((a, b) => {
      if (actionBarCtx.sortAZ) {
        // return a.title.localeCompare(b.title);
        return Sort.byAZ(downloadsCtx.downloadsVideo, 'title');
        // return a.title.localeCompare(b.title);
      } else if (actionBarCtx.sortZA) {
        return Sort.byZA(downloadsCtx.downloadsVideo, 'title');
        // return Sort.byZA(a, b);
        // return b.title.localeCompare(a.title);
      } else if (actionBarCtx.sortNewOld) {
        return Sort.byDateNewToOld(downloadsCtx.downloadsVideo, 'date');
      } else if (actionBarCtx.sortOldNew) {
        return Sort.byDateOldToNew(downloadsCtx.downloadsVideo, 'date');
      }
    })
  );

  useEffect(() => {
    setDownloads(
      Array.from(downloadsCtx.downloadsVideo).sort((a, b) => {
        if (actionBarCtx.sortAZ) {
          // return a.title.localeCompare(b.title);
          return Sort.byAZ(downloadsCtx.downloadsVideo, 'title');
          // return a.title.localeCompare(b.title);
        } else if (actionBarCtx.sortZA) {
          return Sort.byZA(downloadsCtx.downloadsVideo, 'title');
          // return Sort.byZA(a, b);
          // return b.title.localeCompare(a.title);
        } else if (actionBarCtx.sortNewOld) {
          return Sort.byDateNewToOld(downloadsCtx.downloadsVideo, 'date');
        } else if (actionBarCtx.sortOldNew) {
          return Sort.byDateOldToNew(downloadsCtx.downloadsVideo, 'date');
        }
      })
    );
  }, [
    actionBarCtx.sortAZ,
    actionBarCtx.sortZA,
    actionBarCtx.sortNewOld,
    actionBarCtx.sortOldNew,
    inputCtx.searchText,
    downloadsCtx.downloadsVideoState,
  ]);
  const videoDownloads = (
    <ul className="content__panel__downloads__list">
      {/* {downloads.map( */}
      {downloads.map(
        (item) =>
          item.searchTags.toLowerCase().includes(inputCtx.searchText) && (
            <DownloadItem
              author={item.author.name}
              backgroundURL={item.background.url}
              date={item.date}
              timestamp={item.timestamp}
              format={item.format}
              fps={item.fps}
              id={item.id}
              key={item.id}
              length={item.lengthDisplay}
              resolution={item.resolution}
              size={item.size}
              source={item.source}
              thumbnail={item.thumbnailDisplay}
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
