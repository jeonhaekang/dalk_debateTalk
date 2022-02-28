const Grid = ({
  children,
  display,
  justifyContent,
  flexDirection,
  margin,
  padding,
  alignItems,
  width,
  height,
  ...props
}) => {
  return (
    <div
      style={{
        display,
        justifyContent,
        flexDirection,
        margin,
        padding,
        alignItems,
        width,
        height,
        ...props,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
