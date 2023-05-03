/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './NavStatusButton.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  message: string;
};
export default function NavStatusButton(props: Props) {
  const themeCtx = useContext(ThemeContext);
  const { message } = props;
  const restartHandler = () => {
    window.electron.ipcRenderer.sendMessage('updater_restart_and_update', []);
  };
  return (
    <div
      className="restartBtn"
      onClick={restartHandler}
      style={
        themeCtx.isDarkTheme
          ? { filter: 'invert(0%)' }
          : {
              filter: 'invert(100%)',
            }
      }
    >
      {message}
    </div>
  );
}
