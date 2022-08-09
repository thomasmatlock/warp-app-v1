import { Fragment, useContext } from 'react';
import iconLength from '../../../assets/Downloads/duration.svg';
import iconFileSize from '../../../assets/Downloads/fileSize.svg';
import iconFileResolution from '../../../assets/Downloads/resolution.svg';
import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
import IconFileFps from '../../../assets/Downloads/fps1.svg';
import thumbnail from '../../../assets/Content/dummythumbnail2.jpg';

import DownloadItem from './DownloadItem';

import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import DownloadsContext from '../../storage/downloadsContext';
import Sort from './Sort';

import './Downloads.scss';

const DownloadsVideo = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);
  Sort.byAZ(downloadsCtx.downloadsVideo, 'title');
  Sort.byZA(downloadsCtx.downloadsVideo, 'title');

  // console.log(downloadsCtx.downloads);

  // window.electron.ipcRenderer.on('Search: InputChange', (arg) => {
  //   setSearchInput(arg[0]);
  //   console.log(arg[0]);
  // });
  const videoDownloads = (
    <ul className="content__panel__downloads__list">
      {downloadsCtx.downloadsVideo.map((item) => (
        <DownloadItem
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

          // onClick={() => sourceSelectedHandler(item.id)}
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
        {videoDownloads}
      </div>
    </Fragment>
  );
};
export default DownloadsVideo;
