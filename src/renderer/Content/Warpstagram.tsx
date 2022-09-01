import { Fragment, useState, useContext } from 'react';
import ThemeContext from '../../storage/themeContext';
import refreshIcon from '../../../assets/Warpstagram/refresh1.svg';
import pinIcon from '../../../assets/Warpstagram/pin.svg';
import menuIcon from '../../../assets/Warpstagram/menu.svg';
// import navLogoText from '../../../assets/Nav/logo_lowercase_extrabold.svg';

import dummy_avatar from '../../../assets/Content/Warpstagram/peaky/6.jpg';
// import dummy_post3 from '../../../assets/Content/Warpstagram/peaky/3.jpg';
// import dummy_post4 from '../../../assets/Content/Warpstagram/peaky/4.jpg';
// import dummy_post5 from '../../../assets/Content/Warpstagram/peaky/5.jpg';
// import dummy_post6 from '../../../assets/Content/Warpstagram/peaky/6.jpg';
// import dummy_post7 from '../../../assets/Content/Warpstagram/peaky/7.jpg';
// import dummy_post8 from '../../../assets/Content/Warpstagram/peaky/8.jpg';
// import dummy_post9 from '../../../assets/Content/Warpstagram/peaky/9.jpg';
// import dummy_post11 from '../../../assets/Content/Warpstagram/peaky/11.jpg';
// import dummy_post12 from '../../../assets/Content/Warpstagram/peaky/12.jpg';

import dummy_post3 from '../../../assets/Content/Warpstagram/nintendoswitch/3.jpg';
import dummy_post4 from '../../../assets/Content/Warpstagram/nintendoswitch/4.jpg';
import dummy_post5 from '../../../assets/Content/Warpstagram/nintendoswitch/5.jpg';
import dummy_post6 from '../../../assets/Content/Warpstagram/nintendoswitch/6.jpg';
import dummy_post7 from '../../../assets/Content/Warpstagram/nintendoswitch/7.jpg';
import dummy_post8 from '../../../assets/Content/Warpstagram/nintendoswitch/8.jpg';
import dummy_post9 from '../../../assets/Content/Warpstagram/nintendoswitch/9.jpg';
import dummy_post11 from '../../../assets/Content/Warpstagram/nintendoswitch/11.jpg';
import dummy_post12 from '../../../assets/Content/Warpstagram/nintendoswitch/12.jpg';
import dummy_post13 from '../../../assets/Content/Warpstagram/nintendoswitch/13.jpg';
import dummy_post14 from '../../../assets/Content/Warpstagram/nintendoswitch/14.jpg';
import dummy_post15 from '../../../assets/Content/Warpstagram/nintendoswitch/15.jpg';

import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuOptionsWarpstagramAccount from '../ContextMenu/ContextMenuOptionsWarpstagramAccount';
import InputContext from '../../storage/inputContext';
import DownloadsContext from '../../storage/downloadsContext';

import './Warpstagram.scss';
import WarpstagramItem from './WarpstagramItem';

const Warpstagram = () => {
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  const inputCtx = useContext(InputContext);

  // const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [downloads, setDownloads] = useState(
    downloadsCtx.downloadsWarpstagram.subscribed
  );
  // const toggleContextMenuSort = () => {
  //   if (isContextMenuVisible) {
  //     setisContextMenuVisible(false);
  //   } else {
  //     setisContextMenuVisible(true);
  //   }
  // };
  // const turnOffContextMenu = () => {
  //   setisContextMenuVisible(false);
  // };

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
  return (
    <Fragment>
      <div
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
