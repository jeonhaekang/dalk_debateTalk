const Text = ({
  onClick,
  cursor,
  children,

  color,
  ...props
}) => {
  return(
  <label 
  onClick={onClick}
  style={{
    cursor,
    color,
    ...props,
  }}
  >
    {children}
    </label>
  )
};

export default Text;
