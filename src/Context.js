import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

function ProductProvider(props) {
  const [dbProducts, setDbProducts] = useState([]);
  const [detailProducts, setDetailProducts] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setDbProducts(tempProducts);
  }, []);

  const getItem = (id) => dbProducts.find((item) => item.id === id);

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProducts(product);
  };

  const addToCart = (id) => {
    let tempProducts = [...dbProducts];
    let index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    const price = product.price;
    product.inCart = true;
    product.count = 1;
    product.total = price;
    setDbProducts(tempProducts);
    setCart([...cart, product]);
  };
  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products: [...dbProducts],
        detailProduct: detailProducts,
        cart: cart,
        modalOpen: modalOpen,
        modalProduct: modalProduct,
        handleDetail: handleDetail,
        addToCart: addToCart,
        openModal: openModal,
        closeModal: closeModal,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
