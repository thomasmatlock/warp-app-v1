import Image from 'next/image';
import { useContext } from 'react';
import styles from '../Overview.module.scss';
import sortIcon from '../assets/sort.svg';
import collapseIcon from '../assets/collapse.svg';
import expandIcon from '../assets/expand.svg';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import ThemeContext from '../../../store/themeContext';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);
    const filterBarMenuRight = [styles.filterBar__menu, styles.filterBar__menu__right].join(' ');
    const filterBarMenuItemTotal = [styles.filterBar__menu__item, styles.filterBar__menu__item__accounts_total].join(
        ' '
    );
    const menuItem = [styles.filterBar__menu__item, styles.filterBar__menu__item__sort].join(' ');

    return (
        <div
            // className="filterBar"
            // onMouseLeave={turnOffContextMenu}
            // className={actionBarCtx.isDownloadsPanelCollapsed ? 'filterBar__collapsed' : 'filterBar'}
            className={styles.filterBar_video}
        >
            <div className={filterBarMenuRight}>
                {/* {!actionBarCtx.isDownloadsPanelCollapsed && ( */}
                <div
                    className={filterBarMenuItemTotal}
                    style={
                        themeCtx.isDarkTheme
                            ? { filter: 'invert(0%)' }
                            : {
                                  filter: 'invert(100%)',
                              }
                    }
                >
                    {/* {downloadsTotalString} */}
                    {/* {props.audioDownloadsTotal} */}
                    {overviewDisplayCtx.videoDownloadsData.length} video downloads
                </div>
                {/* // )} */}
                {/* {!actionBarCtx.isDownloadsPanelCollapsed && ( */}
                <div
                    // onClick={toggleContextMenuSort}
                    // className={menuItem}
                    className={menuItem}
                >
                    <Image
                        loading="lazy"
                        title="Sort"
                        alt="Sort"
                        src={sortIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(0%)' }
                                : {
                                      filter: 'invert(100%)',
                                  }
                        }
                    />
                    {/* {isContextMenuVisible && <ContextMenu options={ContextMenuSortOptions} />} */}
                </div>
                {/* )} */}
                {/* {!actionBarCtx.isBrowserPanelCollapsed && !actionBarCtx.isDownloadsPanelCollapsed && ( */}
                <div
                    // onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                    className={menuItem}
                >
                    <Image
                        alt="Collapse"
                        title="Expand downloads panel"
                        src={expandIcon}
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div>
                {/* )} */}
                {/* {actionBarCtx.isBrowserPanelCollapsed && ( */}
                {/* <div
                // onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                // className="filterBar__menu__item filterBar__menu__item__sort"
                >
                    <Image
                        className={menuItem}
                        alt="Expand"
                        title="Restore split view"
                        src={collapseIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div> */}
                {/* // )} */}
                {/* {actionBarCtx.isDownloadsPanelCollapsed && ( */}
                {/* <div
                    className={menuItem}
                >
                    <Image
                        alt="Restore"
                        title="Restore split view"
                        src={expandIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div> */}
                {/* )} */}
                {/* {!actionBarCtx.isDownloadsPanelCollapsed && !actionBarCtx.isBrowserPanelCollapsed && ( */}
                <div className={menuItem}>
                    <Image
                        alt="Collapse"
                        title="Collapse downloads panel"
                        src={collapseIcon}
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div>
                {/* )} */}
            </div>
        </div>
    );
}
