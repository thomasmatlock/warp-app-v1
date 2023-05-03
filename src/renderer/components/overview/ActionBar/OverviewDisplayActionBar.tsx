import { useContext } from 'react';
import styles from '../Overview.module.scss';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import OverviewDisplayActionBarBrowserBar from './OverviewDisplayActionBarBrowserBar';
import OverviewDisplayActionBarAudio from './OverviewDisplayActionBarAudio';
import OverviewDisplayActionBarVideo from './OverviewDisplayActionBarVideo';
import OverviewDisplayActionBarWarpstagram from './OverviewDisplayActionBarWarpstagram';
import ThemeContext from '../../../store/themeContext';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);

    return (
        // <h2>action bar</h2>
        <>
            <div
                // onMouseEnter={mouseEnterHandler}
                // onMouseLeave={mouseLeaveHandler}
                className={styles.actionBar}
                style={
                    themeCtx.isDarkTheme
                        ? { backgroundColor: themeCtx.actionBar.dark.backgroundColor }
                        : {
                              backgroundColor: themeCtx.actionBar.light.backgroundColor,
                          }
                }
            >
                {overviewDisplayCtx.audioMode && <OverviewDisplayActionBarBrowserBar />}
                {overviewDisplayCtx.videoMode && <OverviewDisplayActionBarBrowserBar />}
                {overviewDisplayCtx.audioMode && (
                    <OverviewDisplayActionBarAudio
                    // audioDownloadsTotal={audioDownloadsTotal}
                    />
                )}
                {overviewDisplayCtx.videoMode && (
                    <OverviewDisplayActionBarVideo
                    // videoDownloadsTotal={videoDownloadsTotal}
                    />
                )}
                {overviewDisplayCtx.warpstagramMode && (
                    <OverviewDisplayActionBarWarpstagram
                    // warpstagramDownloadsTotal={warpstagramDownloadsTotal}
                    />
                )}
            </div>
        </>
    );
}
