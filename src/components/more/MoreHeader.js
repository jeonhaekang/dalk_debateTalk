import styled from "styled-components";
import XScrollDrag from "../shared/XScrollDrag";
import categoryDate from "../../data/categoryData";
import FlexGrid from "../../elements/FlexGrid";

const MoreHeader = ({ category, setCategory, idx, setIdx }) => {
  const setCate = (name, i) => {
    setIdx(i);
    setCategory(name);
  };
  return (
    <>
      <CategoryBox is_column>
        <XScrollDrag>
          {categoryDate.map((el, i) => {
            return (
              <Category
                center
                key={i}
                category={category === el.name}
                _onClick={() => setCate(el.name, i)}
              >
                {el.name}
              </Category>
            );
          })}
        </XScrollDrag>
      </CategoryBox>
    </>
  );
};

const CategoryBox = styled.div`
  gap: 0;
  border-bottom: 2px solid #e5e5e5;

  background-color: white;
  z-index: 100;
`;

const Category = styled(FlexGrid)`
  width: calc(100% / 6);
  height: 46px;
  flex: 0 0 auto;

  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => (props.category ? props.theme.color.orange : "#ABABAB")};
  ${(props) =>
    props.category &&
    `color: ${props.theme.color.orange}; border-bottom: 2px solid orange;`}

  transition: 0.05s;
`;

export default MoreHeader;
