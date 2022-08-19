import { Fragment, useState } from 'react';
import racingIcon from '../../../../assets/Products/racing.svg';
import downloadsIcon from '../../../../assets/Products/downloading.svg';
import './Product.scss';

const Product = (props) => {
  const [isViewing, setIsViewing] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const clickHandler = () => {
    console.log('clicked');
    setIsViewing(false);
    setIsPurchasing(true);
  };
  console.log(props);

  return (
    <Fragment>
      <div className="product">
        <div className="product_header">
          {/* <img
                    src="img/3rdparty/flaticon/1102341-essential/svg/001-add.svg"
                    alt=""
                    loading="lazy"
                  /> */}
          <h1 className="title">Astronaut</h1>
        </div>
        <div className="product_description">
          <ul className="product_description__list">
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Unlimited single audio and video downloads
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Playlists
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={downloadsIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Simultaneous downloads
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Channels
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Multiple Formats
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
          </ul>{' '}
          <ul className="product_description__list">
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Playlists
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={downloadsIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Simultaneous downloads
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Channels
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  Multiple Formats
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>{' '}
            <li className="product_description__list__item">
              <img
                className="product_description__list__item__icon"
                src={racingIcon}
                alt=""
              />
              <div className="product_description__list__item__text">
                <div className="product_description__list__item__text__title">
                  URLs Import and Export
                </div>
                <div className="product_description__list__item__text__description">
                  Download audio in its original Youtube format or adjust it in
                  your preferences to save space
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="product__footer">
          {isViewing && (
            <div
              onClick={clickHandler}
              className="product__footer__cta"
              style={
                isViewing
                  ? {
                      animation: 'fadeIn 0.5s ease-in-out',
                    }
                  : {
                      animation: 'fadeOut 0.5s ease-in-out',
                    }
              }
            >
              <img
                className="product__footer__cta__icon"
                src={racingIcon}
                alt=""
              />
              <p className="product__footer__cta__text">Choose Now</p>
            </div>
          )}
          {isPurchasing && (
            <div
              onClick={clickHandler}
              className="product__footer__cta"
              style={
                isPurchasing
                  ? {
                      animation: 'fadeIn 0.5s ease-in-out',
                    }
                  : {
                      animation: 'fadeOut 0.5s ease-in-out',
                    }
              }
            >
              <img
                className="product__footer__cta__icon"
                src={racingIcon}
                alt=""
              />
              <p className="product__footer__cta__text">Buy Now</p>
            </div>
          )}
          {/* <img src="img/3rdparty/flaticon/1102341-essential/svg/001-add.svg" /> */}
          {/* <h1 className="title">Astronaut</h1> */}
        </div>
      </div>
    </Fragment>
  );
};
export default Product;
