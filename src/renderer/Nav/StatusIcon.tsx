import './StatusImage.scss';
import { useContext } from 'react';
import ThemeContext from '../../store/themeContext';

type Props = {
  icon: string;
};
export default function StatusIcon(props: Props) {
  const themeCtx = useContext(ThemeContext);
  const { icon } = props;
  // const [animated, setAnimated] = useState(false);

  return (
    <div className="status_icon">
      <img
        src={icon}
        alt="icon"
        className="status_icon__updating"
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(100%)' }
            : {
                filter: 'invert(0%)',
              }
        }
      />
    </div>
  );
}
