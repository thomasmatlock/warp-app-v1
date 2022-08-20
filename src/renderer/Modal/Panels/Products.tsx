import { Fragment } from 'react';
import './Products.scss';
import Product from './Product';

const Products = (props) => {
  // console.log(props);

  return (
    <Fragment>
      {props.info.id.includes('audio') && (
        <div className="products_carousel">
          <Product info={props.info} />
          <Product info={props.info} />
        </div>
      )}{' '}
      {props.info.id.includes('video') && (
        <div className="products_carousel">
          <Product info={props.info} />
          <Product info={props.info} />
        </div>
      )}{' '}
      {props.info.id.includes('warpstagram') && (
        <div className="products_carousel">
          <Product info={props.info} />
          <Product info={props.info} />
        </div>
      )}{' '}
      {props.info.id.includes('bundle') && (
        <div className="products_carousel">
          <Product info={props.info} />
        </div>
      )}
    </Fragment>
  );
};
export default Products;
