import { useContext } from 'react';
import styles from './Overview.module.scss';
import OverviewDisplayContextProvider from '../../store/overviewDisplayDownloadsDataContext';
import OverviewDisplaySearch from './OverviewDisplaySearch';
import OverviewDisplayActionBar from './ActionBar/OverviewDisplayActionBar';
import OverviewDisplayNav from './OverviewDisplayNav';
import OverviewDisplayContent from './OverviewDisplayContent';
export default function OverviewDisplay() {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);

    return (
        <div className={styles.container}>
            <OverviewDisplaySearch />
            <OverviewDisplayActionBar />
            <OverviewDisplayContent />
            <OverviewDisplayNav />
        </div>
    );
}
