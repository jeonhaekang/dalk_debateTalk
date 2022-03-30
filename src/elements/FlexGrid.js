import styled from "styled-components";

const FlexGrid = ({
  is_column,
  children,
  _onClick,
  size,
  weight,
  color,
  lineHeight,
  letter,
  ...props
}) => {
  // between, center

  const themeStyles = {
    size,
    weight,
    color,
    lineHeight,
    letter,
  };

  return (
    <FlexContainer
      is_column={is_column ? 1 : 0}
      {...props}
      {...themeStyles}
      onClick={_onClick}
      style={{ ...props }}
    >
      {children}
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  ${(props) => (props.is_column ? "flex-direction: column;" : "")}
  ${(props) => (props.between ? "justify-content:space-between;" : "")}
  ${(props) =>
    props.center ? "justify-content: center; align-items: center;" : ""}
  
  & * {
    font-size: ${(props) => props.theme.fontSizes[`${props.size}`]};
    font-weight: ${(props) => props.theme.fontWeight[`${props.weight}`]};
    ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight};` : "")}
    ${(props) => (props.letter ? `letter-spacing: ${props.letter};` : "")}
  }
`;

export default FlexGrid;
