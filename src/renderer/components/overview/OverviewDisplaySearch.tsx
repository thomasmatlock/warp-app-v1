import Link from 'next/link';
import Image from 'next/image';
import sortIcon from '../../../public/overview/warpstagram/sort.svg';
import clearTextIcon from './assets/close.svg';
import SearchIcon from './assets/lightning.svg';

import { useContext, useState, useEffect } from 'react';
import styles from './OverviewDisplaySearch.module.scss';
import OverviewDisplayContextProvider from '../../store/overviewDisplayDownloadsDataContext';
import ThemeContext from '../../store/themeContext';
// import ThemeContext from '../storage/themeContext';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);

    const themeCtx = useContext(ThemeContext);
    // console.log('themeCtx', themeCtx);
    const [isHovering, setIsHovering] = useState(false);
    const [clearIcon, setClearIcon] = useState(false);
    const [placeholder, setPlaceholder] = useState(overviewDisplayCtx.audioPlaceholders[0]);
    useEffect(() => {
        if (overviewDisplayCtx.audioMode) {
            // random placeholder
            setPlaceholder(
                overviewDisplayCtx.audioPlaceholders[
                    Math.floor(Math.random() * overviewDisplayCtx.audioPlaceholders.length)
                ]
            );
        }
        if (overviewDisplayCtx.videoMode) {
            // random placeholder
            setPlaceholder(
                overviewDisplayCtx.videoPlaceholders[
                    Math.floor(Math.random() * overviewDisplayCtx.videoPlaceholders.length)
                ]
            );
        }
        if (overviewDisplayCtx.warpstagramMode) {
            // random placeholder
            setPlaceholder(
                overviewDisplayCtx.warpstagramPlaceholders[
                    Math.floor(Math.random() * overviewDisplayCtx.warpstagramPlaceholders.length)
                ]
            );
        }
    }, [
        overviewDisplayCtx.audioMode,
        overviewDisplayCtx.audioPlaceholders,
        overviewDisplayCtx.videoMode,
        overviewDisplayCtx.videoPlaceholders,
        overviewDisplayCtx.warpstagramMode,
        overviewDisplayCtx.warpstagramPlaceholders,
    ]);
    const searchIconClass = [styles.search__input__icon, styles.search__input__icon__unfocused].join(' ');

    return (
        <>
            <form
                style={
                    themeCtx.isDarkTheme
                        ? { backgroundColor: themeCtx.search.dark.backgroundColor }
                        : {
                              backgroundColor: themeCtx.search.light.backgroundColor,
                          }
                }
                className={styles.search}
            >
                <Image
                    id={styles.search__input__icon__unfocused}
                    className={searchIconClass}
                    src={SearchIcon}
                    alt="Search Icon"
                />
                <input
                    id={styles.search__input}
                    className={isHovering ? styles.search__input__hovering : styles.search__input}
                    style={
                        themeCtx.isDarkTheme
                            ? {
                                  backgroundColor: themeCtx.search.dark.inputBackgroundColor,
                                  color: themeCtx.search.dark.color,
                              }
                            : {
                                  backgroundColor: themeCtx.search.light.inputBackgroundColor,
                                  color: themeCtx.search.light.color,
                              }
                    }
                    type="text"
                    // value={inputCtx.searchText}
                    // onChange={searchInputChangeHandler}
                    // onMouseEnter={userStartedInteracting}
                    // onMouseLeave={userStartedInteracting}
                    // onBlur={searchInputBlurHandler}
                    placeholder={placeholder}
                    spellCheck="false"
                />
            </form>
        </>
    );
}
