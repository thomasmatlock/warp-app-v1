import { Fragment } from 'react';
import './Cards.scss';
import './featureCards.scss';

const Card = (props) => {
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
          {/* <p className="wrapup_cards__card__description__text">
            Find it - as quickly as you <i>think it.</i>
            No scrolling, hunting or switching programs. Not only does Warp's
            global search instantly find anything you've downloaded locally, but
            pulls up what you want in the browser, too.
          </p> */}
          <div className="features_cards_carousel">
            <div id="feature_card_warpstagram2" className="feature_card">
              <div className="feature_card_header">
                <img
                  src="img/3rdparty/flaticon/1102341-essential/svg/001-add.svg"
                  alt=""
                  loading="lazy"
                />
                <h4 className="title">Download Instagram Posts</h4>
              </div>
              <div className="feature_card_description">
                <p>
                  {/* Download audio in its original Youtube format or adjust it in
                  your preferences to save space */}
                </p>
              </div>
            </div>
            <div id="feature_card_warpstagram3" className="feature_card">
              <div className="feature_card_header">
                <img
                  src="img/3rdparty/flaticon/6164008-miscellany-communication-and-social-media/svg/014-instagram stories.svg"
                  alt=""
                  loading="lazy"
                />
                <h4 className="title">Download Instagram Stories</h4>
              </div>
              <div className="feature_card_description">
                <p>
                  {/* Download audio in its original Youtube format or adjust it in
                  your preferences to save space */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Card;
