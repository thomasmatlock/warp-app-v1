import './NavStatusIcon.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  icon: string;
  hovered: boolean;
};
export default function NavStatusIcon(props: Props) {
  const themeCtx = useContext(ThemeContext);
  const { icon, hovered } = props;
  // console.log('hovered', hovered);
  const styling = hovered
    ? 'status_icon__img__absolute__hovered'
    : 'status_icon__img__absolute';

  return (
    <div className="status_icon__absolute">
      <img
        src={icon}
        alt="icon"
        className={styling}
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(0%)' }
            : {
                filter: 'invert(100%)',
              }
        }
      />
    </div>
  );
}
