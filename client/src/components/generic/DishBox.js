import React, { useEffect, useState } from "react";

import InputButton from "./InputButton";


const DishBox = ({onClickConfirmation, dishBoxRef, dish}) => {
    const [dishEmpty, setDishEmpty] = useState(true);

    useEffect(() => {
        
        isEmpty();
    }, [dishEmpty]);

    const isEmpty = () => {
        if(Object.keys(dish).length === 0) setDishEmpty(true);
        else setDishEmpty(false);
    }
    console.log(dish);
    return (
        <div className="dish-summary__container" ref={dishBoxRef}>      
            <div className="dish-summary-box__container">
                <div className="dish-summary-box__content">

                    <div className="dish-name">{!dishEmpty && dish.dishID.name}</div>
                    
                    <div className="dish-quantity-price">
                        <p>Quantité achetée : {dish.quantity}</p>
                        <p>Prix unitaire : {!dishEmpty && dish.dishID.price} €</p>
                    </div>

                    <div className="dish-description">{!dishEmpty && dish.dishID.description}</div>
                    
                    <div className="dish-total">Total : {!dishEmpty && dish.dishID.price * dish.quantity} €</div>

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