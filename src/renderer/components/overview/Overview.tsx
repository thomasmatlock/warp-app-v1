import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import sectionStyle from '../../../styles/sections.module.scss';
import styles from '../../styles/overview/overview.module.scss';
import TitleH3 from '../Headings/HeadingH3';
import TextMorphTitleSuffix from '../Headings/TextMorphSuffix';
import OverviewDisplay from './OverviewDisplay';
import GridCards from '../Cards/GridCards/GridCards';
import { OverviewDisplayContextProvider } from '../../store/overviewDisplayDownloadsDataContext';
import { HoverHorizontalCardsContextProvider } from '../../store/gridCardsContext';
import Section from '../Structure/Section';
import Container from '../Structure/Container';
import Panel from '../Structure/Panel';
import Spacer from '../Structure/Spacer';

export default function Overview() {
    const subtitleMsg = 'No confusing online downloaders or multiple desktop apps to keep track of or slow you down.';

    return (
        <OverviewDisplayContextProvider>
            {/* <HoverHorizontalCardsContextProvider> */}
            <Section>
                <TitleH3 message={subtitleMsg} />
                <OverviewDisplay />
            </Section>
            {/* </HoverHorizontalCardsContextProvider> */}
        </OverviewDisplayContextProvider>
    );
}
