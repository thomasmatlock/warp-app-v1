import iconSortAZ from '../../../assets/ContextMenu/sortAZ.svg';
import iconSortZA from '../../../assets/ContextMenu/sortZA.svg';
import iconSortNewOld from '../../../assets/ContextMenu/sortOldNew.svg';
import iconSortOldNew from '../../../assets/ContextMenu/sortNewOld.svg';
// import
const ContextMenuSortOptions = [
  {
    name: 'Sort by name (A-Z)',
    id: 'sort_by_name_asc',
    icon: iconSortAZ,
    onClick: () => {
      console.log('sort_by_name_asc');
    },
  },
  {
    name: 'Sort by name (Z-A)',
    id: 'sort_by_name_z_a',
    icon: iconSortZA,
    onClick: () => {
      console.log('sort_by_name_z_a');
    },
  },
  {
    name: 'Sort by newest to oldest',
    id: 'sort_newest_oldest',
    icon: iconSortOldNew,
    onClick: () => {
      console.log('sort_by_name_z_a');
    },
  },
  {
    name: 'Sort by oldest to newest',
    id: 'sort_oldest_newest',
    icon: iconSortNewOld,
    onClick: () => {
      console.log('sort_by_name_z_a');
    },
  },
];
export default ContextMenuSortOptions;
