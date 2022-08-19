import { Fragment } from 'react';
import './Product.scss';

const Product = (props) => {
  // console.log(props);

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
          <p>
            {/* Download audio in its original Youtube format or adjust it in
                  your preferences to save space */}
          </p>
        </div>
        <div className="product__footer">
          {/* <img src="img/3rdparty/flaticon/1102341-essential/svg/001-add.svg" /> */}
          {/* <h1 className="title">Astronaut</h1> */}
        </div>
      </div>
    </Fragment>
  );
};
export default Product;
