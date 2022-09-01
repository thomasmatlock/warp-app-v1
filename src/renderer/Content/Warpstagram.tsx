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
            <WarpstagramItem
              // format={item.format}
              id={item.id}
              key={item.id}
              // length={item.length}
              // size={item.size}
              // source={item.source}
              // thumbnail={item.thumbnail}
              title={item.title}
              // type={item.type}
            />
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
        {/* <ul
          className="content__panel__warpstagram__accounts"
          style={
            themeCtx.isDarkTheme
              ? { backgroundColor: themeCtx.content.dark.backgroundColor }
              : {
                  backgroundColor: themeCtx.content.light.backgroundColor,
                }
          }
        >
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
                peakyblindersofficial
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
                    <ContextMenu
                      options={ContextMenuOptionsWarpstagramAccount}
                    />
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
        </ul> */}
      </div>
    </Fragment>
  );
};
export default Warpstagram;
