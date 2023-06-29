import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Pizza from "../pizzas/types/pizza";
import CartItem from "../pizzas/types/cartItem";
import vegan from "../../img/vegan.png";
import { toast } from "react-toastify";
import { changeCount } from "../pizzas/pizzasSlice";
import { useDispatch } from "react-redux";

type MyProps = {
  setActive: (args:boolean) => void;
};

export default function PizzaSelected({ setActive }:MyProps): JSX.Element {
  const [isDoubleCheese, setIsDoubleCheese] = useState(false);
  const [isExtraCheeseboard, setIsExtraCheeseboard] = useState(false);
  const [crustSize, setCrustSize] = useState("Thin");
  const [seasoning, setSeasoning] = useState("Mild");
  const [pizzaSize, setPizzaSize] = useState("Standart");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  function getPizza(): Pizza {
    const pizza = localStorage.getItem("selectedPizza");
    return pizza ? JSON.parse(pizza) : {};
  }
  const selectedPizza: Pizza = getPizza();

  useEffect(() => {
    priceCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDoubleCheese, isExtraCheeseboard, crustSize, pizzaSize, quantity]);

  const handleDoubleCheeseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDoubleCheese(event.target.checked);
  };

  const handleExtraCheeseboardChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsExtraCheeseboard(event.target.checked);
  };

  const handleCrustSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setCrustSize(newAlignment);
  };

  const handleSeasoningChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setSeasoning(newAlignment);
  };

  const handlePizzaSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setPizzaSize(newAlignment);
  };

  const handleQuantityChange = (num: number) => {
    if (quantity === 1 && num === -1) {
      return;
    }
    if (quantity === 20 && num === 1) {
      return;
    }
    setQuantity(quantity + num);
  };

  const priceCounter = () => {
    let price = selectedPizza.price;

    if (isDoubleCheese) {
      price += 1;
    }
    if (isExtraCheeseboard) {
      price += 2;
    }
    if (crustSize === "Thick") {
      price += 1;
    }
    if (pizzaSize === "Tiny") {
      price -= 2;
    }
    if (pizzaSize === "XXL") {
      price += 2;
    }

    setTotalPrice(price);
  };

  function getCartContent(): CartItem[] {
    const cartContent = localStorage.getItem("cartContent");
    return cartContent ? JSON.parse(cartContent) : [];
  }

  function handleAddToCart() {
    const cartItem: CartItem = {
      id: new Date().getTime(),
      pizza: selectedPizza,
      isDoubleCheese,
      isExtraCheeseboard,
      crustSize,
      seasoning,
      pizzaSize,
      quantity,
      totalPrice,
    };
    const cartContent: CartItem[] = [...getCartContent(), cartItem];
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
    toast.success("Your pizza has been added to your cart!");
    dispatch(changeCount());
    setActive(false);
  }

  return (
    <div className="modalPizzaContainer">
      <div className="modalPizzaInfo">
        <div className="modalImgContainer">
          {selectedPizza.veg && (
            <img className="modalVeganImg" src={vegan} alt="vegan" />
          )}
          <img
            className="modalPizzaImgBig"
            src={selectedPizza.img}
            alt={selectedPizza.name}
          />
        </div>
        <div className="pizzaName">{selectedPizza.name}</div>
        <p className="pizzaIngredients">
          Ingredients: {selectedPizza.description}
        </p>
      </div>
      <div className="modalPizzaCustomize">
        <div className="pizzaCustomizeTxt">Customize your pizza:</div>
        <div className="modalPizzaCheckbox">
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                checked={isDoubleCheese}
                onChange={handleDoubleCheeseChange}
                color="warning"
              />
            }
            label="Double cheese"
          />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                checked={isExtraCheeseboard}
                onChange={handleExtraCheeseboardChange}
                color="warning"
              />
            }
            label="Extra Cheeseboard"
          />
        </div>
        <div className="modalChooseText">Choose crust size</div>
        <ToggleButtonGroup
          sx={{ height: "25px" }}
          size="small"
          color="primary"
          value={crustSize}
          exclusive
          onChange={handleCrustSizeChange}
          aria-label="Platform"
        >
          <ToggleButton
            disabled={crustSize === "Thin" ? true : false}
            value="Thin"
          >
            Thin{" "}
          </ToggleButton>
          <ToggleButton
            disabled={crustSize === "Thick" ? true : false}
            value="Thick"
          >
            Thick{" "}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="modalChooseText">Choose seasoning</div>
        <ToggleButtonGroup
          sx={{ height: "25px" }}
          size="small"
          color="primary"
          value={seasoning}
          exclusive
          onChange={handleSeasoningChange}
          aria-label="Platform"
        >
          <ToggleButton
            disabled={seasoning === "Spicy" ? true : false}
            value="Spicy"
          >
            Spicy{" "}
          </ToggleButton>
          <ToggleButton
            disabled={seasoning === "Mild" ? true : false}
            value="Mild"
          >
            Mild{" "}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="modalChooseText">Choose pizza size</div>
        <ToggleButtonGroup
          sx={{ height: "25px" }}
          size="small"
          color="primary"
          value={pizzaSize}
          exclusive
          onChange={handlePizzaSizeChange}
          aria-label="Platform"
        >
          <ToggleButton
            disabled={pizzaSize === "Tiny" ? true : false}
            value="Tiny"
          >
            tiny{" "}
          </ToggleButton>
          <ToggleButton
            disabled={pizzaSize === "Standart" ? true : false}
            value="Standart"
          >
            Standart{" "}
          </ToggleButton>
          <ToggleButton
            disabled={pizzaSize === "XXL" ? true : false}
            value="XXL"
          >
            XXL{" "}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="modalChooseText quantity">Choose quantity</div>
        <div className="quantityContainer">
          <button
            className="quantityMinusBtn"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <div className="quantityText">{quantity}</div>
          <button
            className="quantityPlusBtn"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <p className="modalTotalPriceText">Your final price</p>
        <div className="modalTotalPrice">{totalPrice * quantity}€</div>
        <button className="modalAddToCartBtn" onClick={handleAddToCart}>
        Take it to cart!
        </button>
      </div>
    </div>
  );
}
