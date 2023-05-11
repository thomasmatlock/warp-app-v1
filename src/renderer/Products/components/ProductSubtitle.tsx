import styles from './ProductSubtitle.module.scss';

type Props = {
  description: string;
  expanded: boolean;
};
export default function ProductSubtitle(props: Props) {
  const { description, expanded } = props;

  const componentStyle = expanded ? styles.subtitle : styles.subtitle;
  return <h3 className={componentStyle}>{description}</h3>;
}
