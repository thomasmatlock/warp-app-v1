import './NavStatusText.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  message: string;
};
export default function NavStatusText(props: Props) {
  const themeCtx = useContext(ThemeContext);

  const { message } = props;

  return <p className="status_text">{message}</p>;
}
