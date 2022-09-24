import iconSortAZ from './sortAZ.svg';
import iconSortZA from './sortZA.svg';
import iconSortNewOld from './sortOldNew.svg';
import iconSortOldNew from './sortNewOld.svg';
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
