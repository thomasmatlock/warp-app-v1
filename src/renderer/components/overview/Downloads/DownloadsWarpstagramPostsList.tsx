import Link from 'next/link';
import Image from 'next/image';
import sortIcon from '../../../public/overview/warpstagram/sort.svg';
import caretIcon from '../../../public/overview/caret-down.svg';
import lightningIcon from '../../../public/wrapup/cards/lightning.svg';
import youtubeIcon from '../../../public/wrapup/display/youtube.svg';
import { useContext, useState } from 'react';
import listStyles from '../../../../styles/overview/v2/OverviewV2Downloads.module.scss';
// import OverviewV1DisplayContent3 from './OverviewV1DisplayContent3';
import ThemeContext from '../../../store/themeContext';
import DownloadItem from './DownloadItem';
import DownloadsWarpstagramPostsListItem from './DownloadsWarpstagramPostsListItem';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
// import panelStyles from '../../../../styles/overview/v2/OverviewV2Content.module.scss';
import styles from './OverviewWarpstagram.module.scss';

export default function Warpstagram(props: any) {
    // console.log(props.items);

    // const Warpstagram = () => {
    const themeCtx = useContext(ThemeContext);
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);

    // const downloadsCtx = useContext(DownloadsContext);
    // const inputCtx = useContext(InputContext);

    const [postsArr, setPostsArr] = useState(props.items);
    //  <div className={styles.content__panel__warpstagram__account__posts}>
    // {
    /* <Image
                    src="https://i.pinimg.com/564x/d1/0e/9f/d10e9f68993b44ebe6e9b15b9a1b7071.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/43/db/2b/43db2b9c11acf70e371e3e0de1a3d16d.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                /> */
    // }
    // {
    /* <Image
                    src="https://i.pinimg.com/564x/48/51/e0/4851e0c84e96f1535aff97b34daf52ad.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/4e/27/66/4e2766cda38299ad8656c49dc9248756.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/f2/6a/1c/f26a1cecefb436b9ac976c414b2207ea.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/67/50/17/6750175985eef0795e780774b33fb16a.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/59/2f/ff/592fffae37003cf4ad70e2bfceb7b9d5.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                /> */
    // }
    // {
    /* <Image
                    src="https://i.pinimg.com/564x/27/22/e0/2722e06b178604f2dde02f100e6f63c1.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/36/0c/d9/360cd98b08f801b798798ab861aed3eb.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />
                <Image
                    src="https://i.pinimg.com/564x/46/13/67/46136766b5d7012d8c3c9f8bfa22910a.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                />{' '}
                <Image
                    src="https://i.pinimg.com/564x/0b/84/d1/0b84d125e863158bce1c7c835f19de7d.jpg"
                    alt="null"
                    className="content__panel__warpstagram__account__posts__item"
                /> */
    // }
    // {
    /* </div>; */
    // }
    const posts = (
        <ul className={styles.content__panel__warpstagram__account__posts}>
            {postsArr.map(
                (item) => (
                    // item.title.toLowerCase().includes(inputCtx.searchText) && (
                    <DownloadsWarpstagramPostsListItem key={item.id} src={item.src} />
                )
                // )
            )}
        </ul>
    );
    return <div>{posts}</div>;
}
