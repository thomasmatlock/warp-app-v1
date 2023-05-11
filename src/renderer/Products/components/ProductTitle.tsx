import styles from './ProductTitle.module.scss';

type Props = {
  title: string;
  expanded: boolean;
};
export default function ProductTitle(props: Props) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.title_expanded : styles.title;
  return <h3 className={componentStyle}>{title}</h3>;
}
