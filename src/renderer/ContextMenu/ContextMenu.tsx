import { Fragment, useContext } from 'react';
import './ContextMenu.scss';
import ThemeContext from '../../store/themeContext';
import ContextMenuItem from './ContextMenuItem';
import ActionBarContext from '../../store/actionBarContext';
import DownloadsContext from 'store/downloadsContext';

const ContextMenu = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const downloadsCtx = useContext(DownloadsContext);
  const listHeight = props.options.length * 40;
  const clickHandler = (id, downloadID) => {
    // actionBarCtx;
    if (id.toLowerCase().includes('az')) actionBarCtx.sortAZhandler();
    if (id.toLowerCase().includes('za')) actionBarCtx.sortZAhandler();
    if (id.toLowerCase().includes('new_old')) actionBarCtx.sortNewOldhandler();
    if (id.toLowerCase().includes('old_new')) actionBarCtx.sortOldNewhandler();
    if (downloadID != undefined) {
      downloadsCtx.downloadContextActionHandler(id, downloadID);
      // console.log(id, downloadID);
    }
  };
  const contextMenu = (
    <ul
      className="context_menu context_menu__downloadItem"
      style={{ height: `${listHeight}px` }}
    >
      {props.options.map((item) => (
        <ContextMenuItem
          name={item.name}
          id={item.id}
          key={item.id}
          icon={item.icon}
          // onClick={item.onClick}
          onClick={() => clickHandler(item.id, props.downloadID)}
          // sortAZ={actionBarCtx.sortAZhandler}
          // sortZA={actionBarCtx.sortZAhandler}
          // sortNewOld={actionBarCtx.sortNewOldhandler}
          // sortOldNew={actionBarCtx.sortOldNewhandler}
        />
      ))}
    </ul>
  );

  return <Fragment>{contextMenu}</Fragment>;
};
export default ContextMenu;
