import { Fragment, useState, useContext } from 'react';
import refreshIcon from '../../../assets/Warpstagram/refresh1.svg';
import pinIcon from '../../../assets/Warpstagram/pin.svg';
import menuIcon from '../../../assets/Warpstagram/menu.svg';
import './Warpstagram.scss';
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
import dummy_avatar from '../../../assets/Content/Warpstagram/peaky/6.jpg';
import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuOptionsWarpstagramAccount from '../ContextMenu/ContextMenuOptionsWarpstagramAccount';
const WarpstagramItem = (props) => {
  const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);

  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const toggleContextMenuSort = () => {
    if (isContextMenuVisible) {
      setisContextMenuVisible(false);
    } else {
      setisContextMenuVisible(true);
    }
  };
  const turnOffContextMenu = () => {
    setisContextMenuVisible(false);
  };
  return (
    <li
      onMouseLeave={turnOffContextMenu}
      className="content__panel__warpstagram__account"
      style={
        themeCtx.isDarkTheme
          ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
            }
      }
    >
      <div className="content__panel__warpstagram__account__info">
        <img
          src={dummy_avatar}
          className=" content__panel__warpstagram__account__info__avatar"
        ></img>
        <div
          className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__name"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(0%)' }
              : {
                  filter: 'invert(100%)',
                }
          }
        >
          {props.title}
        </div>
        <div
          className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(0%)' }
              : {
                  filter: 'invert(100%)',
                }
          }
        >
          143 items
        </div>
        <div
          className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts-type"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(0%)' }
              : {
                  filter: 'invert(100%)',
                }
          }
        >
          posts, stories, highlights
        </div>
        <div className="filterBar__menu filterBar__menu__right">
          <div className="filterBar__menu__item filterBar__menu__item__sort">
            <img
              title="Sort"
              src={refreshIcon}
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            />
          </div>
          <div
            // onClick={actionBarCtx.toggleAudioPanelCollapsed}
            className="filterBar__menu__item filterBar__menu__item__sort"
          >
            <img
              title="Collapse audio downloads panel"
              src={pinIcon}
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            />
          </div>
          <div
            onClick={toggleContextMenuSort}
            // onClick={actionBarCtx.toggleAudioPanelCollapsed}
            className="filterBar__menu__item filterBar__menu__item__sort"
          >
            <img
              title="fill"
              src={menuIcon}
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            />
            {isContextMenuVisible && (
              <ContextMenu options={ContextMenuOptionsWarpstagramAccount} />
            )}
          </div>
        </div>
      </div>
      <div className="content__panel__warpstagram__account__posts">
        <img
          src={dummy_post12}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post3}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post4}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post5}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post6}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post7}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post8}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post9}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post11}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src={dummy_post14}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />{' '}
        <img
          src={dummy_post15}
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
      </div>
    </li>
  );
};
export default WarpstagramItem;