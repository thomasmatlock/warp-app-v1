import { Fragment, useContext } from 'react';
import './Products.scss';
import Product from './ArchivedProduct';
import ProductsContext from '../../../store/archivedProductsContext';

const Products = (props) => {
  const productsCtx = useContext(ProductsContext);
  // console.log(props);
  const audioCard = {
    title: 'Professional Audio Edition',
    id: 'audioCard',
    background: 'linear-gradient(-45deg, red, #e73c7e, #ff8500)',
    // header_source: IconFileTypeAudio,

    productID1: 'product_audio_1',
    productID2: 'product_audio_2',
  };
  return (
    <>
      {props.info.id.includes('audio') && (
        <div className="products_carousel">
          {productsCtx.isViewingAudio1 && <Product info={props.info} />}
          {/* {productsCtx.isViewingAudio2 && <Product info={props.info} />} */}
          {/* <Product info={props.info} /> */}
          {/* <Product info={props.info} /> */}
        </div>
      )}{' '}
      {props.info.id.includes('video') && (
        <div className="products_carousel">
          {productsCtx.isViewingVideo1 && <Product info={props.info} />}
          {productsCtx.isViewingVideo2 && <Product info={props.info} />}
          {/* <Product info={props.info} /> */}
          {/* <Product info={props.info} /> */}
        </div>
      )}
      {props.info.id.includes('warpstagram') && (
        <div className="products_carousel">
          {productsCtx.isViewingWarpstagram1 && <Product info={props.info} />}
          {productsCtx.isViewingWarpstagram2 && <Product info={props.info} />}
          {/* <Product info={props.info} /> */}
          {/* <Product info={props.info} /> */}
        </div>
      )}{' '}
      {props.info.id.includes('bundle') && (
        <div className="products_carousel">
          {productsCtx.isViewingBundle && <Product info={props.info} />}
          {/* <Product info={props.info} /> */}
        </div>
      )}
    </>
  );
};
export default Products;
