const Button = ({
  border = "0",
  borderRadius = "10px",
  backgroundColor,
  width,
  height,
  margin,
  padding = "5px 10px",
  ref,
  onClick,
  children,
  cursor = "pointer",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      style={{
        border,
        borderRadius,
        backgroundColor,
        width,
        height,
        margin,
        padding,
        cursor,
        ...props,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
