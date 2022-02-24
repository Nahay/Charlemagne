import React, { useEffect, useState } from "react";

import InputButton from "./InputButton";

import { getDishById } from "../../services/dishesService";

const DishBox = ({onClickConfirmation, dishBoxRef, dish}) => {

    const [currentDish, setCurrentDish] = useState({});

    useEffect(() => {
        async function getDish() {
            const d = await getDishById(dish.dishID);
            setCurrentDish(d);
        }

        getDish();
    }, [dish]);

   

    return (
        <div className="dish-summary__container" ref={dishBoxRef}>      
            <div className="dish-summary-box__container">
                <div className="dish-summary-box__content">

                    <div className="dish-name">{currentDish.name}</div>
                    
                    <div className="dish-quantity-price">
                        <p>Quantité achetée : {dish.quantity}</p>
                        <p>Prix unitaire : {currentDish.price} €</p>
                    </div>

                    <div className="dish-description">{currentDish.description}</div>
                    
                    <div className="dish-total">Total : {currentDish.price * dish.quantity} €</div>

                    <div className="content__buttons">

                        <InputButton type="button" value="Fermer" onClick={onClickConfirmation}/>

                    </div>

                </div>

            </div>

            <div className="dish-summary__background" onClick={onClickConfirmation}>
            </div>

        </div>
  );
}

export default DishBox;