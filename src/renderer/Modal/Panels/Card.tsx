import { Fragment } from 'react';
import './Cards.scss';

const Card = (props) => {
  return (
    <Fragment>
      <div
        // id="wrapup_cards__card1"
        className="wrapup_cards__card "
        onMouseEnter={props.onMouseEnter}
        style={
          props.expanded
            ? {
                height: '300px',
                // boxShadow: '-0rem -1rem 2rem #fff',
              }
            : { height: '100px' }
        }
      >
        <div className="wrapup_cards__card__astronaut__container">
          {/* <img className="wrapup_cards__card__astronaut__container__astronaut" src="img/public/sections/space/astronauts/png/Asset 8 whitened.webp" alt="" loading="lazy"> */}
        </div>
        <div className="wrapup_cards__card__header">
          <img
            className="wrapup_cards__card__header__item wrapup_cards__card__header__icon"
            src={props.header_source}
            height="30px"
          />
          <h2 className="wrapup_cards__card__header__item wrapup_cards__card__header__title">
            {props.title}
          </h2>
        </div>
        <div className="wrapup_cards__card__description">
          <p className="wrapup_cards__card__description__text">
            Find it - as quickly as you <i>think it.</i>
            No scrolling, hunting or switching programs. Not only does Warp's
            global search instantly find anything you've downloaded locally, but
            pulls up what you want in the browser, too.
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default Card;
