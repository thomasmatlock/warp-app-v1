import { Fragment } from 'react';
import './ModalPanel.scss';
import Cards from './Cards';
import GridCardsProducts from '../../components/Cards/GridCardsProducts/GridCardsProducts';

const ModalPanelLicenses = () => {
  return (
    <div id="" className="modalPrefsPanel_licenses">
      {/* <Cards /> */}
      <GridCardsProducts />
    </div>
  );
};
export default ModalPanelLicenses;
