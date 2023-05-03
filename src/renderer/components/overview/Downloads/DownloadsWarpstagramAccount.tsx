import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import ThemeContext from '../../../store/themeContext';
import refreshIcon from '../assets/refresh1.svg';
import pinIcon from '../assets/pin.svg';
import menuIcon from '../assets/menu.svg';
import styles from './OverviewWarpstagram.module.scss';
import filterBarStyles from '../OverviewDisplayActionBarWarpstagram.module.scss';
import DownloadsWarpstagramPostsList from './DownloadsWarpstagramPostsList';

export default function WarpstagramAccount(props) {
    const themeCtx = useContext(ThemeContext);

    const iconClass = [styles.warpstagram__menu__item].join(' ');
    const titleClass = [
        styles.content__panel__warpstagram__account__info__text,
        styles.content__panel__warpstagram__account__info__name,
    ].join(' ');
    const postsCount = [
        styles.content__panel__warpstagram__account__info__text,
        styles.content__panel__warpstagram__account__info__posts,
    ].join(' ');
    const postsType = [
        styles.content__panel__warpstagram__account__info__text,
        styles.content__panel__warpstagram__account__info__posts_type,
    ].join(' ');
    const filterBarRight = [
        filterBarStyles.filterBar__menu,
        filterBarStyles.filterBar__menu__right,
        // styles.content__panel__warpstagram__account__info__posts_type,
    ].join(' ');

    return (
        <li
            // onMouseLeave={turnOffContextMenu}
            className={styles.content__panel__warpstagram__account}
            style={
                themeCtx.isDarkTheme
                    ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
                    : {
                          backgroundColor: themeCtx.nav.light.backgroundColor,
                      }
            }
        >
            <div className={styles.content__panel__warpstagram__account__info}>
                {/* <Image
                    src="https://i.pinimg.com/564x/0b/84/d1/0b84d125e863158bce1c7c835f19de7d.jpg"
                    className=" content__panel__warpstagram__account__info__avatar"
                    alt=""
                /> */}
                <div
                    // className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__name"
                    className={titleClass}
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
                    // className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts"
                    className={postsCount}
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
                    // className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts_type"
                    className={postsType}
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
                <div
                    // className="filterBar__menu filterBar__menu__right"
                    className={filterBarRight}
                >
                    <div
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                    // className={iconClass}
                    >
                        <Image
                            className={iconClass}
                            alt="Sort"
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
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                    >
                        <Image
                            className={iconClass}
                            alt="Pin"
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
                    <div>
                        <Image
                            alt="Fill"
                            className={iconClass}
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
                        {/* {isContextMenuVisible && <ContextMenu options={ContextMenuOptionsWarpstagramAccount} />} */}
                    </div>
                </div>
            </div>
            {/* <div> */}
            <DownloadsWarpstagramPostsList items={props.posts} />
        </li>
    );
}
// export default WarpstagramItem;
