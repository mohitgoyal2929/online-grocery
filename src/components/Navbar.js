import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default function Navbar() {
  return (
    <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
      <Link to="/">
        <img
          src={require("../assets/logo.png")}
          alt="store"
          className="navbar-brand"
          height="50px"
        />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>
      <Link to="/Cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fa fa-cart-plus" />
          </span>
          My cart
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--mainBlue) !important;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
