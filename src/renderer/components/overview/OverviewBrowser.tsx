import Image from 'next/image';
import styles from './OverviewBrowser.module.scss';
import youtubeDark2 from '../../public/overview/youtubeDark2.webp';

const Browser = () => {
    return (
        <div id={styles.contentPanel__browser} className={styles.contentPanel__browser}>
            <Image alt="Browser" className={styles.contentPanel__browser__img} src={youtubeDark2} />
        </div>
    );
};
export default Browser;
