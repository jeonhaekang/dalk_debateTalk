import styled from "styled-components";

const Text = ({
  onClick,
  cursor,
  children,
  size,
  weight,
  color,
  lineHeight,
  letter,
  ...props
}) => {
  const themeStyles = {
    size,
    weight,
    color,
    lineHeight,
    letter,
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
  font-size: ${(props) => props.theme.fontSizes[`${props.size}`]};
  font-weight: ${(props) => props.theme.fontWeight[`${props.weight}`]};
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight};` : "")}
  ${(props) => (props.letter ? `letter-spacing: ${props.letter};` : "")}
`;

export default Text;
