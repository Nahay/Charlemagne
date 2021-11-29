import React from "react";

const InputButton = ({value}) => {

  return (
    <div className="input-btn">
      <input type="submit" value={value} />
    </div>
  );
};

export default InputButton;
