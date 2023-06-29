import React, { useEffect, useState } from "react";
import CartItem from "../pizzas/types/cartItem";
import { changeCount } from "../pizzas/pizzasSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectIsChange } from "../pizzas/selectors";
import emptyCart from "../../img/emptyCart.jpg";
import "./Cart.css";
import Address from "../address/Address";
import MyModal from "../myModal/MyModal";
import CartImg from "./CartImg";

export default function Cart(): JSX.Element {
  const [cartSize, setCartSize] = useState(0);
  const isChange = useSelector(selectIsChange);
  const [quantity, setQuantity] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [modalImgActive, setModalImgActive] = useState(false);
  const [getImgSrc, setGetImgSrc] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {}, [quantity]);

  function getCartContent(): CartItem[] {
    const cartContent = localStorage.getItem("cartContent");
    return cartContent ? JSON.parse(cartContent) : [];
  }
  let cartContent: CartItem[] = [...getCartContent()];

  function deleteCartItem(id: number): void {
    if (cartSize < 0 && isChange) {
      return;
    }
    cartContent = cartContent.filter((item) => item.id !== id);
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
    setCartSize(cartContent.length);
    dispatch(changeCount());
  }

  const handleQuantityChange = (id: number, itemqty: number, num: number) => {
    setQuantity(itemqty + num);
    if (itemqty === 1 && num === -1) {
      return;
    }
    if (itemqty === 20 && num === 1) {
      return;
    }
    cartContent.map((item) => {
      if (item.id === id) {
        item.quantity += num;
        return item;
      }
      return item;
    });

    localStorage.setItem("cartContent", JSON.stringify(cartContent));
  };

  return (
    <div className="bigCartContainer">
      {cartContent.length === 0 ? (
        <div className="emptyBigCart">
          <p>Your shopping cart is still empty..</p>
          <img className="emptyBigCartImg" src={emptyCart} alt="emptyCart" />
        </div>
      ) : (
        <div>
          {cartContent.map((item, index) => (
            <div key={item.id} className="bigCartItemContainer">
              <div className="bigCartPizzaNameContainer">
                <div className="bigCartPizzaName">
                  <div className="bigCartIndexNameDiv">
                    <span className="bigCartPizzaIndexText">{index + 1}.</span>
                    <div className="bigCartPizzaNameText">
                      <button
                        type="button"
                        className="bigCartPizzaNameTextBtn"
                        onClick={() => {
                          setModalImgActive(true);
                          setGetImgSrc(item.pizza.img);
                        }}
                      >
                        {item.pizza.name}
                      </button>
                      {/* {item.pizza.name} */}
                    </div>
                  </div>
                  <div className="bigCartPriceQuantityPrice">
                    <span className="bigCartPizzaQuantityText">
                      {item.totalPrice}€
                    </span>
                    <span className="bigCartPizzaQuantityText">x</span>
                    <div className="bigCartQuantityContainer">
                      <button
                        className="bigCartQuantityMinusBtn"
                        onClick={() => {
                          handleQuantityChange(item.id, item.quantity, -1);
                        }}
                      >
                        -
                      </button>
                      <div className="bigCartQuantityText">{item.quantity}</div>
                      <button
                        className="bigCartQuantityPlusBtn"
                        onClick={() => {
                          handleQuantityChange(item.id, item.quantity, 1);
                        }}
                      >
                        +
                      </button>
                      <span className="bigCartPizzaQuantityText">=</span>
                      <span className="bigCartPizzaQuantityText">
                        {item.totalPrice * item.quantity}€
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  title="Remove from cart"
                  className="deleteBigCartItemButton"
                  onClick={() => deleteCartItem(item.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
              <div className="bigCartPizzaDescription">
                <div className="bigCartPizzaDescription1">
                  <p className="bigCartPizzaDescriptionText">
                    Crust size: {item.crustSize}
                  </p>
                  <p className="bigCartPizzaDescriptionText">
                    Seasoning: {item.seasoning}
                  </p>
                  <p className="bigCartPizzaDescriptionText">
                    Size: {item.pizzaSize}
                  </p>
                </div>
                <div className="bigCartPizzaDescription2">
                  {item.isDoubleCheese && (
                    <p className="bigCartPizzaDescriptionText">
                      +Double Cheese
                    </p>
                  )}
                  {item.isExtraCheeseboard && (
                    <p className="bigCartPizzaDescriptionText">
                      +ExtraCheeseboard
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="bigCartTotalDiv">
            <p className="bigCartTotalLine">────────────────────────</p>
            <span className="bigCartTotalPriceText">
              Total:{" "}
              {cartContent.reduce(
                (accumulator, obj) =>
                  accumulator + obj.quantity * obj.totalPrice,
                0
              )}
              €
            </span>
            <button
              className="bigCartSendOrder"
              onClick={() => {
                setModalActive(true);
              }}
            >
              Ready, steady, pizza! Fire up my order!
            </button>
            {/* внутри map */}
          </div>
        </div>
      )}
      {modalActive && (
        <MyModal
          setActive={setModalActive}
          component={<Address setActive={setModalActive} />}
        />
      )}
      {modalImgActive && (
        <MyModal
          setActive={setModalImgActive}
          component={<CartImg imgSrc={getImgSrc} />}
        />
      )}
    </div>
  );
}
