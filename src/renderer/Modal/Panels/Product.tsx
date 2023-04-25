/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react';
import racingIcon from '../../Products/racing.svg';
import downloadsIcon from '../../Common/status.svg';
import ProductsContext from '../../../store/productsContext';
import './Product.scss';

const Product = (props: object) => {
  // console.log(props);

  const productsCtx = useContext(ProductsContext);
  // console.log(productsCtx);

  const clickHandler = () => {
    // productsCtx.setViewingProduct(props.info.id);
    // console.log(props.info.id);
    // console.log(props.info.productID1);
  };

  return (
    <>
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
          {/* {
            <div className="product_description__checkout">
              <input
                type="text"
                className="product_description__checkout__email"
              />
            </div>
          } */}
        </div>
        <div className="product__footer">
          {props.info.productID1 && (
            <div onClick={clickHandler} className="product__footer__cta">
              <img
                className="product__footer__cta__icon"
                src={racingIcon}
                alt=""
              />
              <p className="product__footer__cta__text">Choose Now</p>
            </div>
          )}
          {/* {productsCtx.isViewingAudio2 && (
            <div onClick={clickHandler} className="product__footer__cta">
              <img
                className="product__footer__cta__icon"
                src={racingIcon}
                alt=""
              />
              <p className="product__footer__cta__text">Choose Now</p>
            </div>
          )} */}
          {/* <div onClick={clickHandler} className="product__footer__cta">
            <img
              className="product__footer__cta__icon"
              src={racingIcon}
              alt=""
            />
            <p className="product__footer__cta__text">Buy Now</p>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Product;
