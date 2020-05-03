import React from "react";
import { ProductConsumer } from "../Context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export default function Details() {
  return (
    <ProductConsumer>
      {(value) => {
        const {
          id,
          company,
          img,
          info,
          price,
          title,
          inCart,
        } = value.detailProduct;
        return (
          <div className="container">
            {/* title */}
            <div className="row">
              <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <h1>{title}</h1>
              </div>
            </div>
            {/* end title */}
            {/* Produt Info */}
            <div className="row">
              {/* Product image */}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <img src={img} className="img-fluid" alt="product" />
              </div>
              {/* Product Text */}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h2> model: {title} </h2>
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  This is made by{" "}
                  <span className="text-uppercase">{company}</span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    price : <span>$</span>
                    {price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  Some Info about the product:
                </p>
                <p className="text-muted lead"> {info}</p>
                {/* buttons */}
                <Link to="/">
                  <ButtonContainer> back to products</ButtonContainer>
                </Link>
                <ButtonContainer
                  cart
                  disabled={inCart ? true : false}
                  onClick={() => {
                    value.addToCart(id);
                  }}
                >
                  {inCart ? "In cart" : "Add to cart"}
                </ButtonContainer>
              </div>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}
