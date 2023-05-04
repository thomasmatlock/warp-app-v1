import './NavStatusText.scss';
// import { useContext } from 'react';
// import ThemeContext from '../../../store/themeContext';

type Props = {
  // status: object;
  status: {
    complete: string[];
    inProgress: string[];
    pending: string[];
  };
  hovered: boolean;
};
export default function NavStatusTextAbsolute(props: Props) {
  // const themeCtx = useContext(ThemeContext);

  const { status, hovered } = props;

  const styling = hovered
    ? 'status_text__absolute__hovered'
    : 'status_text__absolute';

  return <p className={styling}>{status.inProgress}</p>;
}
