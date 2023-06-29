import React, { useEffect, useState } from "react";
import { selectIsLoading, selectPizza } from "./selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { loadPizzas } from "./pizzasSlice";
import loading from "../../img/loading.gif";
import vegan from "../../img/vegan.png";
import "./Pizzas.css";
import MyModal from "../myModal/MyModal";
import PizzaSelected from "../pizza/PizzaSelected";

export default function Pizzas(): JSX.Element {
  const pizzasList = useSelector(selectPizza);
  const isLoading = useSelector(selectIsLoading);
  const [modalActive, setModalActive] = useState(false);
  const [isVegan, setIsVegan] = useState<"All" | true | false>("All");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPizzas());
  }, [dispatch]);

  return (
    <>
      <div className="categoryContainer">
        <ul className="categoryList">
          <li
            className={
              isVegan === "All" ? "categoryItem active" : "categoryItem"
            }
            onClick={() => setIsVegan("All")}
          >
            All pizzas
          </li>
          <li
            className={
              isVegan === false ? "categoryItem active" : "categoryItem"
            }
            onClick={() => setIsVegan(false)}
          >
            Meat pizza
          </li>
          <li
            className={
              isVegan === true ? "categoryItem active" : "categoryItem"
            }
            onClick={() => setIsVegan(true)}
          >
            Vegetarian pizza
          </li>
        </ul>
      </div>
      <div className="pizzasContainer">
        {isLoading ? (
          <img src={loading} alt="" />
        ) : (
          pizzasList
            .filter((pizza) =>
              isVegan === "All" ? true : pizza.veg === isVegan
            )
            .map((pizza) => (
              <div key={pizza.id} className="pizzaContainer">
                <div className="pizzaName">{pizza.name}</div>
                <div className="imgContainer">
                  {pizza.veg && (
                    <img className="veganImg" src={vegan} alt="vegan" />
                  )}
                  <img
                    className="pizzaImg"
                    src={pizza.img}
                    alt={pizza.name}
                    onClick={() => {
                      setModalActive(true);
                      localStorage.setItem(
                        "selectedPizza",
                        JSON.stringify(pizza)
                      );
                    }}
                  />
                </div>
                <button
                  className="customizeBtn"
                  onClick={() => {
                    setModalActive(true);
                    localStorage.setItem(
                      "selectedPizza",
                      JSON.stringify(pizza)
                    );
                  }}
                >
                  Customize!
                </button>
                <p className="pizzaIngredients">
                  Ingredients:
                  <br /> {pizza.description}
                </p>
                <p className="pizzaPrise">from {pizza.price-2}€</p>
              </div>
            ))
        )}
        {modalActive && (
          <MyModal setActive={setModalActive} component={<PizzaSelected setActive={setModalActive} />} />
        )}
      </div>
    </>
  );
}
