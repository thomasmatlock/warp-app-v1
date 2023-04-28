import { useContext, useState } from 'react';
import styles from './OverviewContent.module.scss';
import OverviewDisplayContextProvider from '../../store/overviewDisplayDownloadsDataContext';
import OverviewBrowser from './OverviewBrowser';
import DownloadsAudio from './Downloads/DownloadsAudio';
import DownloadsVideo from './Downloads/DownloadsVideo';
import DownloadsWarpstagram from './Downloads/DownloadsWarpstagram';
import { shuffleArray } from '../../utils/arrays';

export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const [delayFinished, setDelayFinished] = useState(false);
    const [audioDownloads, setAudioDownloads] = useState(
        shuffleArray(Array.from(overviewDisplayCtx.audioDownloadsData))
    );
    const [videoDownloads, setVideoDownloads] = useState(
        shuffleArray(Array.from(overviewDisplayCtx.videoDownloadsData))
    );
    const [warpstagramAccounts, setWarpstagramAccounts] = useState(
        shuffleArray(Array.from(overviewDisplayCtx.warpstagramAccounts))
    );
    // console.log(overviewDisplayCtx.audioDownloadsData);
    setTimeout(() => {
        setDelayFinished(true);
    }, 100);
    // const audioDownloads = useState(overviewDisplayCtx.audioDownloadsData[0]);
    // const videoDownloads = useState(overviewDisplayCtx.videoDownloadsData[0]);
    // const warpstagramAccounts = useState(overviewDisplayCtx.warpstagramAccounts[0]);
    // console.log(audioDownloads, videoDownloads, warpstagramAccounts);

    return (
        <div className={styles.content}>
            {overviewDisplayCtx.audioMode && <OverviewBrowser />}
            {overviewDisplayCtx.audioMode && delayFinished && <DownloadsAudio items={audioDownloads} />}
            {overviewDisplayCtx.videoMode && <OverviewBrowser />}
            {overviewDisplayCtx.videoMode && delayFinished && <DownloadsVideo items={videoDownloads} />}
            {overviewDisplayCtx.warpstagramMode && delayFinished && (
                <DownloadsWarpstagram items={warpstagramAccounts} />
            )}
        </div>
    );
}
