import styled from "styled-components";

const FlexGrid = ({ is_column, is_flex, children, _onClick, ...props }) => {
  // between, center

  if (is_column)
    return (
      <Column {...props} onClick={_onClick} style={{ ...props }}>
        {children}
      </Column>
    );

  return (
    <Row {...props} onClick={_onClick} style={{ ...props }}>
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
`;

export default FlexGrid;
