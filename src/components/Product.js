import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

export default function Product(props) {
  const { id, title, img, price, inCart } = props.product;
  return (
    <ProductWrapper className="col-9 mx-auto cold-md-6 col-lg-3 my-3">
      <div className="card">
        <div
          className="img-container p-5"
          onClick={() => console.log("you clicked img container")}
        >
          <Link to="/details">
            <img src={img} alt="Product" className="card-img-top" />
          </Link>
        </div>
      </div>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div``;
