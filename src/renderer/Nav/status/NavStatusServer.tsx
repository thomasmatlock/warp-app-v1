import './NavStatusServer.scss';
import { useContext } from 'react';
import ThemeContext from '../../../store/themeContext';
import StatusText from './NavStatusText';
import StatusIcon from './NavStatusIcon';
import iconMap from '../../Global/map_w.png';

type Props = {
  status: {
    complete: string[];
    inProgress: string[];
    pending: string[];
  };
  hovered: boolean;
};
export default function NavStatusServer(props: Props) {
  const themeCtx = useContext(ThemeContext);
  const { status, hovered } = props;
  // console.log('hovered', hovered);
  const containerStyling = hovered
    ? 'status_absolute__hovered'
    : 'status_absolute';

  return (
    <div className={containerStyling}>
      <StatusIcon icon={iconMap} animated={false} hovered={false} />
      <StatusText message={status.inProgress} hovered={false} />
    </div>
  );
}
