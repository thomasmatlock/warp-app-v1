import { Fragment } from 'react';
import './Products.scss';
import Product from './Product';

const Products = (props) => {
  // console.log(props);

  return (
    <Fragment>
      <div className="products_carousel">
        <Product />
        <Product />
        {/* <Product /> */}
      </div>
    </Fragment>
  );
};
export default Products;
