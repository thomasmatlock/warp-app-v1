import { Fragment, useState, useEffect, useContext } from 'react';
import DownloadItem from './DownloadItem';
import ThemeContext from '../../store/themeContext';
import ActionBarContext from '../../store/actionBarContext';
import DownloadsContext from '../../store/downloadsContext';
import InputContext from '../../store/inputContext';
import Sort from './Sort';
import './Downloads.scss';

const DownloadsAudioActivation = () => {
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
    downloadsCtx.percentUpdateState,
  ]);
  //  itemDetails.downloadedPercentage = 0;
  //  itemDetails.downloadComplete = false;
  //  itemDetails.conversionPercentage = 0;
  //  itemDetails.conversionComplete = false;
  const audioDownloadsActivation = (
    <ul className="content__panel__downloads__list__activation">
      {downloads.map(
        (item) =>
          item.searchTags.toLowerCase().includes(inputCtx.searchText) && (
            <DownloadItem
              author={item.author.name}
              date={item.date}
              timestamp={item.timestamp}
              format={item.format}
              fps={item.fps}
              id={item.id}
              key={item.id}
              length={item.lengthDisplay}
              downloadedPercentage={item.downloadedPercentage}
              downloadComplete={item.downloadComplete}
              conversionPercentage={item.conversionPercentage}
              conversionComplete={item.conversionComplete}
              resolution={item.resolution}
              fileSize={item.fileSize}
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
      {audioDownloadsActivation}
    </div>
  );
};
export default DownloadsAudioActivation;
