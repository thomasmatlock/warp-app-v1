export default function ProductFeaturesList(props) {
  return (
    <ul className="product_description__list">
      <li className="product_description__list__item">
        {/* <img
          className="product_description__list__item__icon"
          src={racingIcon}
          alt=""
        /> */}
        <div className="product_description__list__item__text">
          <div className="product_description__list__item__text__title">
            Playlists
          </div>
          <div className="product_description__list__item__text__description">
            Download audio in its original Youtube format or adjust it in your
            preferences to save space
          </div>
        </div>
      </li>
    </ul>
  );
}
