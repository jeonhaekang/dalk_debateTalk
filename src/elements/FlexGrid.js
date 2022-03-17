import styled from "styled-components";

const FlexGrid = ({
  is_column,
  is_flex,
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

  if (is_column)
    return (
      <Column
        {...props}
        {...themeStyles}
        onClick={_onClick}
        style={{ ...themeStyles, ...props }}
      >
        {children}
      </Column>
    );

  return (
    <Row {...props} {...themeStyles} onClick={_onClick} style={{ ...props }}>
      {children}
    </Row>
  );
};

const Row = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
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

const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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
