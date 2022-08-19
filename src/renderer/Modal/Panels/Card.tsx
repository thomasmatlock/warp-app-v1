import { Fragment } from 'react';
import './Cards.scss';
// import './featureCards.scss';
import './Product.scss';
import './Products.scss';
import Product from './Product';
import Products from './Products';

const Card = (props) => {
  // console.log(props);

  return (
    <Fragment>
      <div
        className={
          props.expanded
            ? 'wrapup_cards__card wrapup_card_hovered'
            : ' wrapup_cards__card'
        }
        onClick={props.onMouseEnter}
      >
        <div className="wrapup_cards__card__astronaut__container">
          {/* <img className="wrapup_cards__card__astronaut__container__astronaut" src="img/public/sections/space/astronauts/png/Asset 8 whitened.webp" alt="" loading="lazy"> */}
        </div>
        <div className="wrapup_cards__card__header">
          <img
            className="wrapup_cards__card__header__item wrapup_cards__card__header__icon"
            src={props.info.header_source}
            height="30px"
          />
          <h2 className="wrapup_cards__card__header__item wrapup_cards__card__header__title">
            {props.info.title}
          </h2>
        </div>
        <div className="wrapup_cards__card__description">
          {props.expanded && <Products />}
        </div>
      </div>
    </Fragment>
  );
};
export default Card;
