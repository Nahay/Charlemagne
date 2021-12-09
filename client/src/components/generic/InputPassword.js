import React from "react";

const InputPassword = ({value, placeholder, id, divId, required, handleChange}) => {

  if (value === undefined) value="";
  if (required === undefined) required = true;

  return (
    <div className={"input"} id={divId}>

      {required ?

      <input
        type="password"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e) }
        name={id}
        required
      />

      :

      <input
        type="password"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e) }
        name={id}
      />
      
      }
    </div>
  );
};

export default InputPassword;
