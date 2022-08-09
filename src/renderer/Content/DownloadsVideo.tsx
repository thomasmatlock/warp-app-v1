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

import './Downloads.scss';

const DownloadsVideo = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);

  // window.electron.ipcRenderer.on('Search: InputChange', (arg) => {
  //   setSearchInput(arg[0]);
  //   console.log(arg[0]);
  // });
  const videoDownloads = (
    <ul className="content__panel__downloads__list">
      {downloadsCtx.downloadsVideo.map((item) => (
        <DownloadItem
          key={item.id}
          id={item.id}
          title={item.title}
          thumbnail={item.thumbnail}
          length={item.length}
          size={item.size}
          type={item.type}
          format={item.format}
          resolution={item.resolution}
          fps={item.fps}

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
