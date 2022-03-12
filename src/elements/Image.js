import styled from "styled-components";

const Image = ({ _onClick, src, active, ...props }) => {
  const style = {
    src,
    active,
  };
  return (
    <Outer onClick={_onClick} style={{ ...props }}>
      <Inner {...style}></Inner>
    </Outer>
  );
};

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  border-radius: 30px;
  width: 100%;
  padding-top: 100%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  box-shadow: ${(props) => (props.active ? "inset 0 0 0 4px black" : "none")};
`;

export default Image;
