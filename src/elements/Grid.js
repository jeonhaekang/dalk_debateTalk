const Grid = ({
  display = "flex",
  children,

  ...props
}) => {
  return (
    <div
      style={{
        display,
        ...props,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
