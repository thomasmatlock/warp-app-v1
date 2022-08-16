import { Fragment, useContext } from 'react';
import iconSortAZ from '../../../assets/ContextMenu/sortAZ.svg';
import iconSortZA from '../../../assets/ContextMenu/sortZA.svg';
import iconSortNewOld from '../../../assets/ContextMenu/sortOldNew.svg';
import iconSortOldNew from '../../../assets/ContextMenu/sortNewOld.svg';
import ActionBarContext from 'storage/actionBarContext';
// import
const ContextMenuSortOptions = [
  {
    name: 'Sort by name (A-Z)',
    id: 'sort_az',
    icon: iconSortAZ,
    // onClick: () => {
    //   console.log('sort_by_name_asc');
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
