import React from "react";


const InputButton = ({value, type}) => {

  return (
    <div className="input-btn">
      <input type={type} value={value} />
    </div>
  );
};

export default InputButton;
