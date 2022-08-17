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
  const [downloads, setDownloads] = useState(
    Array.from(downloadsCtx.downloadsAudio).sort((a, b) => {
      if (actionBarCtx.sortAZ) {
        // return a.title.localeCompare(b.title);
        return Sort.byAZ(downloadsCtx.downloadsAudio, 'title');
        // return a.title.localeCompare(b.title);
      } else if (actionBarCtx.sortZA) {
        return Sort.byZA(downloadsCtx.downloadsAudio, 'title');
        // return Sort.byZA(a, b);
        // return b.title.localeCompare(a.title);
      } else if (actionBarCtx.sortNewOld) {
        return Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date');
      } else if (actionBarCtx.sortOldNew) {
        return Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date');
      }
    })
  );

  useEffect(() => {
    setDownloads(
      Array.from(downloadsCtx.downloadsAudio).sort((a, b) => {
        if (actionBarCtx.sortAZ) {
          // return a.title.localeCompare(b.title);
          return Sort.byAZ(downloadsCtx.downloadsAudio, 'title');
          // return a.title.localeCompare(b.title);
        } else if (actionBarCtx.sortZA) {
          return Sort.byZA(downloadsCtx.downloadsAudio, 'title');
          // return Sort.byZA(a, b);
          // return b.title.localeCompare(a.title);
        } else if (actionBarCtx.sortNewOld) {
          return Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date');
        } else if (actionBarCtx.sortOldNew) {
          return Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date');
        }
      })
    );
  }, [
    actionBarCtx.sortAZ,
    actionBarCtx.sortZA,
    actionBarCtx.sortNewOld,
    actionBarCtx.sortOldNew,
    inputCtx.searchText,
    downloadsCtx.downloadsAudioState,
  ]);

  const audioDownloads = (
    <ul className="content__panel__downloads__list">
      {downloads.map(
        (item) =>
          item.title.toLowerCase().includes(inputCtx.searchText) && (
            <DownloadItem
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
        {audioDownloads}
      </div>
    </Fragment>
  );
};
export default DownloadsAudio;
