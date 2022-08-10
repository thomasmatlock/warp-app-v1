import iconSortAZ from '../../../assets/ContextMenu/sortAZ.svg';
import iconSortZA from '../../../assets/ContextMenu/sortZA.svg';
import iconSortNewOld from '../../../assets/ContextMenu/sortOldNew.svg';
import iconSortOldNew from '../../../assets/ContextMenu/sortNewOld.svg';
const ContextMenuSortOptions = [
  {
    name: 'Show details',
    id: 'show_details',
    icon: iconSortAZ,
    onClick: () => {
      console.log('show_details');
    },
  },
  {
    name: 'Show on Instagram',
    id: 'show_on_instagram',
    icon: iconSortZA,
    onClick: () => {
      console.log('show_on_instagram');
    },
  },
  {
    name: 'Copy link',
    id: 'copy_warpstagram_link',
    icon: iconSortZA,
    onClick: () => {
      console.log('copy_warpstagram_link');
    },
  },
  {
    name: 'Remove',
    id: 'remove_from_warpstagram',
    icon: iconSortOldNew,
    onClick: () => {
      console.log('remove_from_warpstagram');
    },
  },
];
export default ContextMenuSortOptions;
