import { Fragment, useContext } from 'react';
import './ContextMenu.scss';
import ThemeContext from '../../storage/themeContext';
import ContextMenuItem from './ContextMenuItem';

const ContextMenu = (props) => {
  const themeCtx = useContext(ThemeContext);
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
          // onClick={() => sourceSelectedHandler(item.id)}
        />
      ))}
    </ul>
  );

  return <Fragment>{contextMenu}</Fragment>;
};
export default ContextMenu;
