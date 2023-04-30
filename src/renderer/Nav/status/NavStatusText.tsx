import './NavStatusText.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  message: string;
  hovered: boolean;
};
export default function NavStatusText(props: Props) {
  const themeCtx = useContext(ThemeContext);

  const { message, hovered } = props;
  const textStyling = hovered ? 'status_text__hovered' : 'status_text';

  return <p className={textStyling}>{message}</p>;
}
