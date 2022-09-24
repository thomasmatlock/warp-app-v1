/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useContext } from 'react';
import ThemeContext from 'storage/themeContext';
import refreshIcon from './Warpstagram/refresh1.svg';
import pinIcon from './Warpstagram/pin.svg';
import menuIcon from './Warpstagram/menu.svg';
import './Warpstagram.scss';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuOptionsWarpstagramAccount from '../ContextMenu/ContextMenuOptionsWarpstagramAccount';

const WarpstagramItem = (props) => {
  const themeCtx = useContext(ThemeContext);

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
          src="https://i.pinimg.com/564x/0b/84/d1/0b84d125e863158bce1c7c835f19de7d.jpg"
          className=" content__panel__warpstagram__account__info__avatar"
          alt=""
        />
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
          src="https://i.pinimg.com/564x/d1/0e/9f/d10e9f68993b44ebe6e9b15b9a1b7071.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/43/db/2b/43db2b9c11acf70e371e3e0de1a3d16d.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/48/51/e0/4851e0c84e96f1535aff97b34daf52ad.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/4e/27/66/4e2766cda38299ad8656c49dc9248756.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/f2/6a/1c/f26a1cecefb436b9ac976c414b2207ea.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/67/50/17/6750175985eef0795e780774b33fb16a.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/59/2f/ff/592fffae37003cf4ad70e2bfceb7b9d5.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/27/22/e0/2722e06b178604f2dde02f100e6f63c1.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/36/0c/d9/360cd98b08f801b798798ab861aed3eb.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
        <img
          src="https://i.pinimg.com/564x/46/13/67/46136766b5d7012d8c3c9f8bfa22910a.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />{' '}
        <img
          src="https://i.pinimg.com/564x/0b/84/d1/0b84d125e863158bce1c7c835f19de7d.jpg"
          alt="null"
          className="content__panel__warpstagram__account__posts__item"
        />
      </div>
    </li>
  );
};
export default WarpstagramItem;
