import Link from 'next/link';
import Image from 'next/image';
import sortIcon from '../../../public/overview/warpstagram/sort.svg';
import caretIcon from '../../../public/overview/caret-down.svg';
import lightningIcon from '../../../public/wrapup/cards/lightning.svg';
import youtubeIcon from '../../../public/wrapup/display/youtube.svg';
import { useContext, useState } from 'react';
import styles from '../OverviewContent.module.scss';
// import listStyles from '../../../styles/overview/v2/OverviewV2Downloads.module.scss';
import listStyles from './OverviewDownloads.module.scss';

import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
// import OverviewV1DisplayContent3 from './OverviewV1DisplayContent3';
import ThemeContext from '../../../store/themeContext';
import DownloadItem from './DownloadItem';
import { shuffleArray } from '../../../utils/arrays';
import * as generate from '../../../utils/generate';

export default function OverviewDisplay(props: any) {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);
    // const [downloads, setDownloads] = useState(shuffleArray(Array.from(overviewDisplayCtx.videoDownloadsData)));
    // const [downloads, setDownloads] = useState(Array.from(overviewDisplayCtx.videoDownloadsData));

    const videoDownloads = (
        <ul className={listStyles.content__panel__downloads__list}>
            {/* {downloads.map((item) => ( */}
            {/* {overviewDisplayCtx.videoDownloadsData.map((item) => ( */}
            {props.items.map((item) => (
                <DownloadItem
                    date={item.date}
                    timestamp={item.timestamp}
                    format={item.format}
                    fps={item.fps}
                    id={item.id}
                    key={item.id}
                    length={item.length}
                    resolution={item.resolution}
                    fileSize={item.fileSize}
                    source={item.source}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    type={item.type}
                    // date={generate.randomTimestampInPast7Days()}
                    // timestamp={generate.randomTimestampInPast7Days()}
                    // format={item.format}
                    // fps={item.fps}
                    // id={item.id}
                    // key={generate.randomId()}
                    // length={item.length}
                    // resolution={item.resolution}
                    // fileSize={item.fileSize}
                    // source={item.source}
                    // thumbnail={item.thumbnail}
                    // title={item.title}
                    // type={item.type}
                />
            ))}
        </ul>
    );
    return (
        <div
            // className={actionBarCtx.isDownloadsPanelCollapsed ? 'contentPanel__collapsed' : 'contentPanel'}
            className={styles.contentPanel}
            style={
                themeCtx.isDarkTheme
                    ? { backgroundColor: themeCtx.content.dark.backgroundColor }
                    : {
                          backgroundColor: themeCtx.content.light.backgroundColor,
                      }
            }
        >
            {videoDownloads}
        </div>
    );
}
