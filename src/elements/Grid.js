const Grid = ({
  display = "flex",
  flexDirection = "column",

  ...props
}) => {
  return (
    <div
      style={{
        display,
        flexDirection,
        ...props,
      }}
    ></div>
  );
};

export default Grid;
