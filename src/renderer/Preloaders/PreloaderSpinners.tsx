import { Fragment } from 'react';
import './PreloaderSpinners.scss';

type Props = {
  theme: string;
};
const Loader = (props: Props) => {
  const { theme } = props;
  const styling =
    theme === 'dark' ? { filter: 'invert(0)' } : { filter: 'invert(1)' };
  return (
    <div className="loader_container">
      <div className="loader loader1" style={styling} />
      <div className="loader loader2" style={styling} />
      <div className="loader loader3" style={styling} />
      <div className="loader loader4" style={styling} />
      <div className="loader loader3" style={styling} />
    </div>
  );
};
export default Loader;
