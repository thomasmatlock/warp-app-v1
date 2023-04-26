import { Fragment, useContext } from 'react';
import iconSortAZ from './assets/sortAZ.svg';
import iconSortZA from './assets/sortZA.svg';
import iconSortNewOld from './assets/sortOldNew.svg';
import iconSortOldNew from './assets/sortNewOld.svg';
import ActionBarContext from '../../store/actionBarContext';
// const actionBarCtx = useContext(ActionBarContext);
// import
// const actionBarCtx = useContext(ActionBarContext);
const ContextMenuSortOptions = [
  {
    name: 'Sort by name (A-Z)',
    id: 'sort_az',
    icon: iconSortAZ,
    // sortAZ: () => {
    //   console.log('sort_by_name_asc');
    //   // actionBarCtx.sortAZhandler();
    // },
  },
  {
    name: 'Sort by name (Z-A)',
    id: 'sort_za',
    icon: iconSortZA,
    // onClick: () => {
    //   console.log('sort_by_name_z_a');
    // },
  },
  {
    name: 'Sort by newest to oldest',
    id: 'sort_new_old',
    icon: iconSortOldNew,
    // onClick: () => {
    //   console.log('sort_by_name_z_a');
    // },
  },
  {
    name: 'Sort by oldest to newest',
    id: 'sort_old_new',
    icon: iconSortNewOld,
    // onClick: () => {
    //   console.log('sort_by_name_z_a');
    // },
  },
];
export default ContextMenuSortOptions;
