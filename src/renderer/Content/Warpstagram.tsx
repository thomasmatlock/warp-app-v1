import { Fragment, useState, useContext } from 'react';
import ThemeContext from '../../storage/themeContext';
import InputContext from '../../storage/inputContext';
import DownloadsContext from '../../storage/downloadsContext';

import './Warpstagram.scss';
import WarpstagramItem from './WarpstagramItem';

const Warpstagram = () => {
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);

  const [downloads, setDownloads] = useState(
    downloadsCtx.downloadsWarpstagram.subscribed
  );

  const warpstagramAccounts = (
    <ul className="content__panel__warpstagram__accounts">
      {downloads.map(
        (item) =>
          item.title.toLowerCase().includes(inputCtx.searchText) && (
            <WarpstagramItem id={item.id} key={item.id} title={item.title} />
          )
      )}
    </ul>
  );
  // const mouseLeaveHandler = () => {};
  return (
    <Fragment>
      <div
        // onMouseEnter={mouseEnterHandler}
        className="contentPanel"
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.content.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.content.light.backgroundColor,
              }
        }
      >
        {warpstagramAccounts}
      </div>
    </Fragment>
  );
};
export default Warpstagram;
