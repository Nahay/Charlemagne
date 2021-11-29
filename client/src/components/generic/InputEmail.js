import React from "react";

const InputEmail = ({placeholder, id, handleChange}) => {
  return (
    <div className={"input-email"} id="inputEmailDiv">
      <input
        type="email"
        placeholder={placeholder}
        id={id}
        required="required"
        onChange={(e) => { handleChange(e) }}
        name={id}
      />
    </div>
  );
};

export default InputEmail;