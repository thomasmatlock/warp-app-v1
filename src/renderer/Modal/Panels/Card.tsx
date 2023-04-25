import { Fragment, useState, useContext } from 'react';
import './Cards.scss';
// import './featureCards.scss';
import './Product.scss';
import './Products.scss';
import Product from './Product';
import Products from './Products';
import ProductsContext from '../../../store/productsContext';

const Card = (props) => {
  const productsCtx = useContext(ProductsContext);
  return (
    <Fragment>
      <div
        id={props.info.id}
        className={props.expanded ? 'cards__card card_hovered' : ' cards__card'}
        onClick={props.onClick}
      >
        <div className="cards__card__astronaut__container">
          {/* <img className="cards__card__astronaut__container__astronaut" src="img/public/sections/space/astronauts/png/Asset 8 whitened.webp" alt="" loading="lazy"> */}
        </div>
        <div className="cards__card__header">
          <img
            className="cards__card__header__item cards__card__header__icon"
            src={props.info.header_source}
            height="30px"
          />
          <h2 className="cards__card__header__item cards__card__header__title">
            {props.info.title}
          </h2>
        </div>
        <div
          className="cards__card__description"
          style={{
            background: props.info.background,
            backgroundSize: '400% 400%',
            animation: 'gradient 10s ease infinite',
          }}
        >
          {props.expanded && <Products info={props.info} />}
        </div>
      </div>
    </Fragment>
  );
};
export default Card;
