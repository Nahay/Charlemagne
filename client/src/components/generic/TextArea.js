import React from "react";

const TextArea = ({placeholder, id, handleChange}) => {
  return (
    <div className={"textarea"}>
      <textarea placeholder={placeholder} 
      id={id} 
      required="required"
      onChange={(e) => { handleChange(e) }}
      name={id}
      />
    </div>
  );
};

export default TextArea;
