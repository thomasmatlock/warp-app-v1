import './PreloaderOrbits.scss';

type Props = {
  theme: string;
};
export default function PreloaderOrbits(props: Props) {
  const { theme } = props;

  const styling =
    // theme === 'dark' ? { filter: 'invert(1)' } : { filter: 'invert(0)' };
    theme === 'dark'
      ? { border: '1px solid white' }
      : { border: '1px solid #1a1a1a' };
  return (
    <div className="spinner-box">
      <div className="blue-orbit leo" style={styling} />

      <div className="green-orbit leo" style={styling} />

      <div className="red-orbit leo" style={styling} />

      <div className="white-orbit w1 leo" style={styling} />
      <div className="white-orbit w2 leo" style={styling} />
      <div className="white-orbit w3 leo" style={styling} />
    </div>
  );
}
