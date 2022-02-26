const Grid = ({
  children,
  ...props
}) => {
  return (
    <div
      style={{
        ...props,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
