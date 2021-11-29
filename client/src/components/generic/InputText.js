import React from "react";

const InputText = ({placeholder, id, divId, handleChange}) => {
  return (
    <div className={"input-text"} id={divId}>
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        required="required"
        onChange={(e) => handleChange(e) }
        name={id}
      />
    </div>
  );
};

export default InputText;
