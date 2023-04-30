import './NavStatusIcon.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';

type Props = {
  icon: string;
  animated: boolean;
  hovered: boolean;
};
export default function NavStatusIcon(props: Props) {
  const themeCtx = useContext(ThemeContext);
  const { icon, animated, hovered } = props;
  const animatedClass = animated ? 'status_icon__animated' : '';
  console.log('hovered', hovered);

  return (
    <div className="status_icon">
      <img
        src={icon}
        alt="icon"
        className={animatedClass}
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
