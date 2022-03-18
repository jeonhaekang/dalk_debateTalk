import styled from "styled-components";
import FlexGrid from "./FlexGrid";

const ItemButton = ({
  itemCode,
  img,
  name,
  color,
  border,
  price,
  count = 0,
  onClick,
  active,
}) => {
  const style = {
    color,
    border,
    active,
  };
  return (
    <FlexGrid center>
      <ItemBox {...style} key={itemCode} onClick={onClick}>
        <ItemCount>{count}</ItemCount>
        <ItemImg src={img} />
        <ItemText>{name}</ItemText>
      </ItemBox>
      <Price>{price}RP</Price>
    </FlexGrid>
  );
};

const Price = styled.div`
  position: absolute;
  bottom: 15px;
  z-index: 1;
  color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

const ItemBox = styled.div`
  width: 95px;
  height: 95px;

  flex-shrink: 0;

  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.border};
  border-radius: 15px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  transition: 0.3s;
  ${(props) => (props.active ? "transform: translateY(-40px);" : "")}
  box-shadow: ${(props) =>
    props.active
      ? "0 0 0 4px #FBE6CC"
      : "0px 4px 7px rgba(0, 0, 0, 0.2), inset 0px 2px 2px rgba(0, 0, 0, 0.1);"};
  z-index: 2;
`;

const ItemCount = styled.div`
  position: absolute;
  top: 5px;
  left: 6px;
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: white;
  text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
`;

const ItemImg = styled.img`
  transform: translateY(-8px);
`;

const ItemText = styled.div`
  position: absolute;
  bottom: 13px;
  line-height: 18px;
  text-align: center;

  color: white;

  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
`;

export default ItemButton;
