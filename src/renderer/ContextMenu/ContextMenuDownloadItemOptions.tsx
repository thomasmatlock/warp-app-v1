import iconCopy from '../../../assets/ContextMenu/copy.svg';
import iconPaste from '../../../assets/ContextMenu/paste.svg';
import iconRemove from '../../../assets/ContextMenu/remove.svg';
import iconDelete from '../../../assets/ContextMenu/delete.svg';
import iconRemoveAll from '../../../assets/ContextMenu/removeAll4.svg';
const ContextMenuDownloadItemOptions = [
  {
    name: 'Copy link address',
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
