import './Status.scss';

type Props = {
  message: string;
};
export default function Status(props: Props) {
  // destructuring props message
  const { message } = props;

  return <p className="status">{message}</p>;
}
