import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import styles from '../Overview.module.scss';
import sortIcon from '../assets/sort.svg';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import ThemeContext from '../../../store/themeContext';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);
    const filterBarMenuLeft = [styles.filterBar__menu, styles.filterBar__menu__left].join(' ');
    const filterBarMenuRight = [styles.filterBar__menu, styles.filterBar__menu__right].join(' ');
    const filterBarMenuItemTotal = [styles.filterBar__menu__item, styles.filterBar__menu__item__accounts_total].join(
        ' '
    );
    const menuItem = [styles.filterBar__menu__item, styles.filterBar__menu__item__sort].join(' ');
    const menuItemText = [
        styles.filterBar__menu__item,
        styles.filterBar__menu__item__sort,
        styles.filterBar__menu__item__text,
    ].join(' ');
    const activeMenuItem = [styles.filterBar__menu__item, styles.filterBar__menu__item__sort].join(' ');

    return (
        <div
            // onMouseLeave={turnOffContextMenu}
            className={styles.filterBar}
        >
            <div className={filterBarMenuLeft}>
                <div
                    // className={filterTypeAll ? 'filterBar__menu__item__active' : 'filterBar__menu__item'}
                    // className={styles.filterBar__menu__item}
                    className={menuItemText}
                    style={
                        themeCtx.isDarkTheme
                            ? { filter: 'invert(0%)' }
                            : {
                                  filter: 'invert(100%)',
                              }
                    }
                    // onClick={filterTypeAllHandler}
                >
                    All
                </div>
                <div
                    // className={filterTypeUsers ? 'filterBar__menu__item__active' : 'filterBar__menu__item'}
                    // className={styles.filterBar__menu__item}
                    className={menuItemText}
                    style={
                        themeCtx.isDarkTheme
                            ? { filter: 'invert(0%)' }
                            : {
                                  filter: 'invert(100%)',
                              }
                    }
                    // onClick={filterTypeUsersHandler}
                >
                    Users
                </div>
                <div
                    // className={filterTypeHashtags ? 'filterBar__menu__item__active' : 'filterBar__menu__item'}
                    // className={styles.filterBar__menu__item}
                    className={menuItemText}
                    style={
                        themeCtx.isDarkTheme
                            ? { filter: 'invert(0%)' }
                            : {
                                  filter: 'invert(100%)',
                              }
                    }
                    // onClick={filterTypeHashtagsHandler}
                >
                    Hashtags
                </div>
                <div
                    className={menuItemText}
                    // className={filterTypeLocations ? 'filterBar__menu__item__active' : 'filterBar__menu__item'}
                    style={
                        themeCtx.isDarkTheme
                            ? { filter: 'invert(0%)' }
                            : {
                                  filter: 'invert(100%)',
                              }
                    }
                    // onClick={filterTypeLocationsHandler}
                >
                    Locations
                </div>
            </div>
            <div className={filterBarMenuRight}>
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
                    {overviewDisplayCtx.warpstagramAccounts.length} accounts
                </div>
                <div className={menuItem}>
                    <Image
                        alt="Sort"
                        src={sortIcon}
                        title="Sort"
                        loading="lazy"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(0%)' }
                                : {
                                      filter: 'invert(100%)',
                                  }
                        }
                    />
                </div>
            </div>
        </div>
    );
}
