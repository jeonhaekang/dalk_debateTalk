import styled from "styled-components";

const Text = ({ onClick, cursor, children, size, weight, color, ...props }) => {
  const themeStyles = {
    size,
    weight,
    color,
  };
  return (
    <Label
      {...themeStyles}
      onClick={onClick}
      style={{
        cursor,
        color,
        ...props,
      }}
    >
      {children}
    </Label>
  );
};

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes[`${props.size}`]}px;
  font-weight: ${(props) => props.theme.fontWeight[`${props.weight}`]};
`;

export default Text;
