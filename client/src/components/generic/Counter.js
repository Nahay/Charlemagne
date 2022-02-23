import React, {useState} from "react";


const Counter = ({ nb, handleChange }) => {

    return (
        <div className="counter__content">  
            <p>{nb}</p>
            <button type="button" value="+" onClick={onClickPlus} />
            <button type="button" value="-" onClick={onClickMinus} />
        </div>
    );
}

export default Counter;