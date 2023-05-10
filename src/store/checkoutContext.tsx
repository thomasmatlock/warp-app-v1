import React, { useState, useEffect, createContext } from 'react';
// import data from './productsData';

const ProductsGridCardsContext = createContext({
  // audioCardExpanded: false,
  testFunction: () => {},
});

export function ProductsGridCardsContextProvider(props: any) {
  const [isAudioCheckoutDev, setAudioCheckoutDev] = useState(true); // DEFAULT IS FALSE

  const testFunction = () => {
    console.log('testFunction');
  };
  return (
    <ProductsGridCardsContext.Provider
      value={{
        testFunction,
      }}
    >
      {props.children}
    </ProductsGridCardsContext.Provider>
  );
}

export default ProductsGridCardsContext;
