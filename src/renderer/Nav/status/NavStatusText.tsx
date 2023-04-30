import './NavStatusText.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  message: string;
  hovered: boolean;
  position: string;
};
export default function NavStatusText(props: Props) {
  const themeCtx = useContext(ThemeContext);

  const { message, hovered, position } = props;
  const styling = hovered ? 'status_text__hovered' : 'status_text';

  return (
    <p className={styling} style={{ position: position }}>
      {message}
    </p>
  );
}
