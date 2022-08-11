import { Fragment, useContext } from 'react';

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
  Sort.byAZ(downloadsCtx.downloadsVideo, 'title');
  Sort.byZA(downloadsCtx.downloadsVideo, 'title');

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
