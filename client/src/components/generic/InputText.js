import React from "react";

const InputText = ({value, placeholder, id, divId, required, handleChange}) => {

  if (value === undefined) value="";
  if (required === undefined) required = true;

  return (
    <div className={"input-text"} id={divId}>

      {required ?

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e) }
        name={id}
        required
      />

      :

      <input
        type="text"
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

export default InputText;
