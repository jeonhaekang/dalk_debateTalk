const Grid = ({
  display = "flex",
  flexDirection = "column",
  children,
  ...props
}) => {
  return (
    <div
      style={{
        display,
        flexDirection,
        ...props,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
