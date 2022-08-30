import { Fragment, useState, useEffect, useContext } from 'react';
import DownloadItem from './DownloadItem';
import ActivationItem from './ActivationItem';
import iconLicenses from '../../../assets/Modals/settings/shuttle.svg';
//
// import DownloadsAudioActivation from './DownloadsAudioActivation';
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
    downloadsCtx.percentUpdateState,
  ]);
  let audioDownloadsActivationArr = [
    {
      title:
        15 -
        downloadsCtx.downloadsAudio.length +
        ' daily audio downloads remaining',
      subtitle: 'Activate a Personal or Professional License to download more',
      ctaImage: iconLicenses,
      ctaText: 'Activate',
    },
  ];
  // console.log(downloadsCtx.downloadsAudio.length);
  //  itemDetails.downloadedPercentage = 0;
  //  itemDetails.downloadComplete = false;
  //  itemDetails.conversionPercentage = 0;
  //  itemDetails.conversionComplete = false;
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
      {audioDownloadsActivationArr.map((item) => (
        <ActivationItem
          title={item.title}
          subtitle={item.subtitle}
          ctaImage={item.ctaImage}
          ctaText={item.ctaText}
          // author={item.author.name}
          // date={item.date}
          // timestamp={item.timestamp}
          // format={item.format}
          // fps={item.fps}
          // id={item.id}
          // key={item.id}
          // length={item.lengthDisplay}
          // downloadedPercentage={item.downloadedPercentage}
          // downloadComplete={item.downloadComplete}
          // conversionPercentage={item.conversionPercentage}
          // conversionComplete={item.conversionComplete}
          // resolution={item.resolution}
          // fileSize={item.fileSize}
          // source={item.source}
          // thumbnail={item.thumbnailDisplay}
          // title={item.title}
          // type={item.type}
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
