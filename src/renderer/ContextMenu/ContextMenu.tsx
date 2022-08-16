import { Fragment, useContext } from 'react';
import './ContextMenu.scss';
import ThemeContext from '../../storage/themeContext';
import ContextMenuItem from './ContextMenuItem';
import ActionBarContext from '../../storage/actionBarContext';

const ContextMenu = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const listHeight = props.options.length * 40;
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
          onClick={item.onClick}
          onSortAZ={actionBarCtx.sortAZhandler}
          onSortZA={actionBarCtx.sortZAhandler}
          onSortOldNew={actionBarCtx.sortOldNewhandler}
          onSortNewOld={actionBarCtx.sortNewOldhandler}
          // onClick={() => sourceSelectedHandler(item.id)}
        />
      ))}
    </ul>
  );

  return <Fragment>{contextMenu}</Fragment>;
};
export default ContextMenu;
