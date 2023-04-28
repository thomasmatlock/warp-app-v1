import { useContext, useState } from 'react';
import ThemeContext from '../../../store/themeContext';
import WarpstagramItem from './DownloadsWarpstagramAccount';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import panelStyles from '../OverviewContent.module.scss';
import styles from './OverviewWarpstagram.module.scss';

export default function Warpstagram(props: any) {
    // console.log(props.items);

    // const Warpstagram = () => {
    const themeCtx = useContext(ThemeContext);
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);

    // const downloadsCtx = useContext(DownloadsContext);
    // const inputCtx = useContext(InputContext);

    const [downloads, setDownloads] = useState(overviewDisplayCtx.warpstagramAccounts);

    const warpstagramAccounts = (
        <ul className={styles.content__panel__warpstagram__accounts}>
            {/* {downloads.map( */}
            {props.items.map(
                (item) => (
                    // item.title.toLowerCase().includes(inputCtx.searchText) && (
                    <WarpstagramItem id={item.id} key={item.id} title={item.title} posts={item.posts} />
                )
                // )
            )}
        </ul>
    );
    // const mouseLeaveHandler = () => {};
    return (
        // <Fragment>
        <div
            // onMouseEnter={mouseEnterHandler}
            // className="contentPanel"
            className={panelStyles.contentPanelWarpstagram}
            style={
                themeCtx.isDarkTheme
                    ? { backgroundColor: themeCtx.content.dark.backgroundColor }
                    : {
                          backgroundColor: themeCtx.content.light.backgroundColor,
                      }
            }
        >
            {warpstagramAccounts}
        </div>
        // {/* </Fragment> */}
    );
}
// export default Warpstagram;
