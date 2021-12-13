import React from "react";


const InputText = ({value, placeholder, id, divId, required, handleChange, readOnly}) => {

  if (value === undefined) value="";
  if (required === undefined) required = true;

  return (
    <div className={"input"} id={divId}>

      {required ?
      readOnly ?
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e) }
        name={id}
        required
        readOnly
      />
      :
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
        readOnly ?
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e) }
        name={id}
        readOnly
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
