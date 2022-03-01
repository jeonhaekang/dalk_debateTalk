const Input = ({
  onChange,
  _ref,
  defaultValue,
  type,
  placeholder,
  onKeyDown,

  width,
  boxSizing,
  padding = "5px 10px",

  ...props
}) => {
  return (
    <input
      onChange={onChange}
      ref={_ref}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      style={{ padding, boxSizing, width, ...props }}
    ></input>
  );
};

export default Input;
