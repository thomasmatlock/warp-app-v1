import { Fragment, useState, useEffect, useContext } from 'react';
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
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);
  let downloads2;
  const [downloads, setDownloads] = useState(downloadsCtx.downloadsAudio);
  useEffect(() => {
    if (actionBarCtx.sortAZ) {
      setDownloads(Sort.byZA(downloadsCtx.downloadsAudio, 'title'));
      // downloads2 = Sort.byAZ(downloadsCtx.downloadsAudio, 'title');
    }
    if (actionBarCtx.sortZA) {
      // downloads2 = Sort.byZA(downloadsCtx.downloadsAudio, 'title');
      setDownloads(Sort.byAZ(downloadsCtx.downloadsAudio, 'title'));
    }
    if (actionBarCtx.sortNewOld) {
      // downloads2 = Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date');
      setDownloads(Sort.byDateNewToOld(downloadsCtx.downloadsAudio, 'date'));
    }
    if (actionBarCtx.sortOldNew) {
      // downloads2 = Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date');
      setDownloads(Sort.byDateOldToNew(downloadsCtx.downloadsAudio, 'date'));
    }
    // console.log(downloads[0].title);
    // console.log(downloads[0].date);

    //And any time any dependency value changes
  }, [
    actionBarCtx.sortAZ,
    actionBarCtx.sortZA,
    actionBarCtx.sortNewOld,
    actionBarCtx.sortOldNew,
  ]);

  const audioDownloads = (
    <ul className="content__panel__downloads__list">
      {downloads.map(
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
