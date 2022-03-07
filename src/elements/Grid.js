import styled from "styled-components";

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
  type,
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
