import Link from 'next/link';
import Image from 'next/image';
import sortIcon from '../assets/sort.svg';
import collapseIcon from '../assets/collapse.svg';
import expandIcon from '../assets/expand.svg';
import { useContext } from 'react';
import styles from '../Overview.module.scss';
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
            className={styles.filterBar_audio}
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
                    {overviewDisplayCtx.audioDownloadsData.length} audio downloads
                </div>
                {/* // )} */}
                {/* {!actionBarCtx.isDownloadsPanelCollapsed && ( */}
                <div
                    // onClick={toggleContextMenuSort}
                    // className={menuItem}
                    className={menuItem}
                >
                    <Image
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
                </div>
                <div
                    // onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                    // className="filterBar__menu__item filterBar__menu__item__sort"
                    className={menuItem}
                >
                    <Image
                        alt="Collapse"
                        title="Expand downloads panel"
                        src={expandIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                </div>

                <div className={menuItem}>
                    <Image
                        alt="Collapse"
                        title="Collapse downloads panel"
                        src={collapseIcon}
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
