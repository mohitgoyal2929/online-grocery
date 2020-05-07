import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

function ProductProvider(props) {
  const [dbProducts, setDbProducts] = useState([]);
  const [detailProducts, setDetailProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  //adding products to a new refrence
  useEffect(() => {
    setProducts();
  }, []);

  //Setting the prices of the products being added to cart
  useEffect(() => {
    let subtotal = 0;
    cart.map((item) => (subtotal += item.total));
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;
    setCartSubtotal(subtotal);
    setCartTax(tax);
    setCartTotal(total);
  }, [cart]);

  const setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setDbProducts(tempProducts);
  };

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
  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count++;
    product.total += product.price;
    setCart([...tempCart]);
  };
  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count--;
    if (product.count === 0) removeItem(id);
    else {
      product.total = product.count * product.price;
    }
    setCart([...tempCart]);
  };
  const removeItem = (id) => {
    let tempProducts = [...dbProducts];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart([...tempCart]);
    setProducts([...tempProducts]);
  };
  const clearCart = () => {
    setCart([]);
    setProducts();
  };

  //Modal Functionality
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
        cartSubTotal: cartSubtotal,
        cartTax: cartTax,
        cartTotal: cartTotal,
        modalOpen: modalOpen,
        modalProduct: modalProduct,
        handleDetail: handleDetail,
        addToCart: addToCart,
        openModal: openModal,
        closeModal: closeModal,
        increment,
        decrement,
        removeItem: removeItem,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
