import { Fragment, useContext } from 'react';
import './ContextMenu.scss';
import ThemeContext from '../../storage/themeContext';
import ContextMenuItem from './ContextMenuItem';
import ActionBarContext from '../../storage/actionBarContext';

const ContextMenu = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const listHeight = props.options.length * 40;
  const clickHandler = (id) => {
    // actionBarCtx;
    if (id.toLowerCase().includes('az')) actionBarCtx.sortAZhandler();
    if (id.toLowerCase().includes('za')) actionBarCtx.sortZAhandler();
    if (id.toLowerCase().includes('new_old')) actionBarCtx.sortNewOldhandler();
    if (id.toLowerCase().includes('old_new')) actionBarCtx.sortOldNewhandler();

    // console.log(id);
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
          sortAZ={actionBarCtx.sortAZhandler}
          sortZA={actionBarCtx.sortZAhandler}
          sortNewOld={actionBarCtx.sortNewOldhandler}
          sortOldNew={actionBarCtx.sortOldNewhandler}
          onClick={() => clickHandler(item.id)}
        />
      ))}
    </ul>
  );

  return <Fragment>{contextMenu}</Fragment>;
};
export default ContextMenu;
