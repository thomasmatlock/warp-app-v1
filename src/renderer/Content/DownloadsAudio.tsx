import { Fragment, useState, useEffect, useContext } from 'react';
import DownloadItem from './DownloadItem';
import ActivationItem from './ActivationItem';
//
// import DownloadsAudioActivation from './DownloadsAudioActivation';
import ThemeContext from '../../store/themeContext';
import ActionBarContext from '../../store/actionBarContext';
import DownloadsContext from '../../store/downloadsContext';
import UserContext from '../../store/userContext';
import InputContext from '../../store/inputContext';
import Sort from './Sort';
import './Downloads.scss';

const DownloadsAudio = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  const userCtx = useContext(UserContext);
  const [audioIsFree, setAudioIsFree] = useState(userCtx.user.audio === 'free');
  // console.log(userCtx.user.audio);

  const [downloads, setDownloads] = useState(
    Array.from(downloadsCtx.downloadsAudio).sort((a, b) => {
      if (actionBarCtx.sortAZ) {
        return Sort.byAZ(downloadsCtx.downloadsAudio, 'title');
      } else if (actionBarCtx.sortZA) {
        return Sort.byZA(downloadsCtx.downloadsAudio, 'title');
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
          return Sort.byAZ(downloadsCtx.downloadsAudio, 'title');
        } else if (actionBarCtx.sortZA) {
          return Sort.byZA(downloadsCtx.downloadsAudio, 'title');
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
  const audioDownloads = (
    <ul className="content__panel__downloads__list">
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
              downloadSecondsRemaining={item.downloadSecondsRemaining}
              conversionSecondsRemaining={item.conversionSecondsRemaining}
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
  const audioDownloadsActivation = (
    <ul className="content__panel__downloads__list__activation">
      {userCtx.audioDownloadsActivationArr.map((item) => (
        <ActivationItem
          id={item.id}
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          ctaImage={item.ctaImage}
          ctaText={item.ctaText}
        />
      ))}
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
        {audioDownloadsActivation}
      </div>
    </Fragment>
  );
};
export default DownloadsAudio;
