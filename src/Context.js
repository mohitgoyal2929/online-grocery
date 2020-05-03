import React, { useState } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const handleDetail = () => console.log("Hello from detail");
const addToCart = () => console.log("Hello from add to cart");

function ProductProvider(props) {
  const [products, setProducts] = useState(storeProducts);
  const [inputDetailProducts, setInputDetailProducts] = useState(detailProduct);
  return (
    <ProductContext.Provider
      value={{
        products: [...products],
        detailProduct: inputDetailProducts,
        handleDetail: handleDetail,
        addToCart: addToCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
