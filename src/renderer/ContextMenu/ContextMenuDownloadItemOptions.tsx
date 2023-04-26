import iconCopy from './assets/copy.svg';
import iconPaste from './assets/paste.svg';
import iconRemove from './assets/remove.svg';
import iconDelete from './assets/delete.svg';
import iconRemoveAll from './assets/removeAll4.svg';

const ContextMenuDownloadItemOptions = [
  {
    name: 'Copy link',
    id: 'copy_link_address',
    icon: iconCopy,
    onClick: () => {
      console.log('copy_link_address');
    },
  },
  {
    name: 'Open in browser',
    id: 'open_in_browser',
    icon: iconPaste,
  },
  {
    name: 'Remove',
    id: 'remove_item',
    icon: iconRemove,
  },

  {
    name: 'Remove all',
    id: 'remove_all',
    icon: iconRemoveAll,
  },
  {
    name: 'Delete file',
    id: 'delete_file',
    icon: iconDelete,
  },
];
export default ContextMenuDownloadItemOptions;
