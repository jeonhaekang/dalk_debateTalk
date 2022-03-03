import React from "react";
const Input = React.forwardRef(
  (
    {
      onChange,
      defaultValue,
      type,
      placeholder,
      onKeyDown,
      onKeyPress,
      width,
      boxSizing,
      padding = "5px 10px",

      ...props
    },
    ref
  ) => {
    return (
      <input
        onChange={onChange}
        ref={ref}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        style={{ padding, boxSizing, width, ...props }}
      ></input>
    );
  }
);

export default Input;
