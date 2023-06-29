import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import Divider from "@mui/material/Divider";

import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import "./Header.css";
import logo from "../../img/logo.png";
import emptyCart from "../../img/emptyCart.jpg";
import CartItem from "../pizzas/types/cartItem";
import { useSelector } from "react-redux";
import { selectIsChange } from "../pizzas/selectors";
import { changeCount } from "../pizzas/pizzasSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

type Anchor = "right";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "2px 4px",
    fontSize: 'calc(var(--index) * 0.5)',

  },
}));

export default function Header(): JSX.Element {
  const [state, setState] = useState({ right: false });
  const [cartSize, setCartSize] = useState(0);
  const isChange = useSelector(selectIsChange);
  const dispatch = useDispatch();

  function getCartContent(): CartItem[] {
    const cartContent = localStorage.getItem("cartContent");
    return cartContent ? JSON.parse(cartContent) : [];
  }
  let cartContent: CartItem[] = [...getCartContent()];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box>
      <Link to={"/cart"}>
        <button
          className="cartOrderButton"
          onClick={() => setState({ right: false })}
        >
          Manage your order
        </button>
      </Link>
      <div className="cartHeaderTextContainer">
        <span className="cartHeaderText">Only </span>
        <span className="cartHeaderPriceText">
          {cartContent.reduce(
            (accumulator, obj) => accumulator + obj.quantity * obj.totalPrice,
            0
          )}
          €
        </span>
        <p className="cartHeaderText">for all these pizzas:</p>
      </div>
      {cartContent.map((item, index) => (
        <div key={item.id} className="cartItemContainer">
          <div className="cartPizzaNameContainer">
            <div className="cartPizzaName">
              <span className="cartPizzaIndexText">{index + 1}.</span>
              <div className="cartPizzaNameText">{item.pizza.name}</div>
              <span className="cartPizzaQuantityText">x {item.quantity}</span>
            </div>
            <button
              title="Remove from cart"
              className="deleteCartItemButton"
              onClick={() => deleteCartItem(item.id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
          <div className="cartPizzaDescription">
            <div className="cartPizzaDescription1">
              <p className="cartPizzaDescriptionText">
                Crust size: {item.crustSize}
              </p>
              <p className="cartPizzaDescriptionText">
                Seasoning: {item.seasoning}
              </p>
              <p className="cartPizzaDescriptionText">Size: {item.pizzaSize}</p>
            </div>
            <div className="cartPizzaDescription2">
              {item.isDoubleCheese && (
                <p className="cartPizzaDescriptionText">+Double Cheese</p>
              )}
              {item.isExtraCheeseboard && (
                <p className="cartPizzaDescriptionText">+ExtraCheeseboard</p>
              )}
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </Box>
  );

  function deleteCartItem(id: number): void {
    if (cartSize < 0 && isChange) {
      return;
    }
    cartContent = cartContent.filter((item) => item.id !== id);
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
    setCartSize(cartContent.length);
    dispatch(changeCount());
  }

  return (
    <>
      <div className="headerContainer">
        <div className="headerContent">
          <a href="/">
            <img className="logo" src={logo} alt="logo" />
          </a>

          <div className="headerLinkContainer">
            <NavLink to={"/about"}>About us</NavLink>
            <NavLink to={"/contacts"}>Contacts</NavLink>
            <NavLink to={"/reviews"}>Reviews</NavLink>
          </div>
          <div className="headerBlankContainer1"></div>

          <IconButton
            sx={{ fontSize: "calc(var(--index) * 1.4)" }}
            aria-label="cart"
            onClick={toggleDrawer("right", true)}
          >
            <StyledBadge badgeContent={cartContent.length} color="secondary">
              <AiOutlineShoppingCart />
            </StyledBadge>
          </IconButton>
          <div className="headerBlankContainer2"></div>
        </div>
      </div>
      <div>
        {(["right"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {cartContent.length === 0 ? (
                <div className="emptyCart">
                  <p>
                    Your shopping cart <br />
                    is still empty..
                  </p>
                  <img
                    className="emptyCartImg"
                    src={emptyCart}
                    alt="emptyCart"
                  />
                </div>
              ) : (
                <div>{list(anchor)}</div>
              )}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
