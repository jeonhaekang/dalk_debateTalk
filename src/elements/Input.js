const Input = ({
  onChange,
  ref,
  defaultValue,
  type,
  placeholder,
  padding = "5px 10px",
  ...props
}) => {
  return (
    <input
      onChange={onChange}
      ref={ref}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      style={{ padding, ...props }}
    ></input>
  );
};

export default Input;
