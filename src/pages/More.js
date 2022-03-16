import Header from "../shared/Header";
import Footer from "../shared/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as infinitiAction } from "../redux/modules/infinityScroll";
import MoreCard from "../components/shared/MoreCard";
import XScrollDrag from "../components/shared/XScrollDrag";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";
import InfinityScroll from "../shared/InfinityScroll";
import styled from "styled-components";
import categoryDate from "../data/categoryData";
import Text from "../elements/Text";

const More = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState("전체");

  const api = category === "전체" ? "loadAllRoom" : "loadCategoryRoom";
  React.useEffect(() => {
    dispatch(infinitiAction.loadListDB(0, api, category));

    return () => {
      return dispatch(infinitiAction.clear());
    };
  }, [category]);

  const roomList = useSelector((props) => props.infinityScroll);

  const getRoomList = () => {
    dispatch(infinitiAction.loadListDB(roomList.page, api, category));
  };

  return (
    <>
      <Header page="토론리스트" />
      <ContentContainer>
        <FlexGrid is_column gap="0" padding="16px">
          <Text size="headline1" weight="medium" lineHeight="38px">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Text>
          <CategoryBox is_column>
            <XScrollDrag>
              {categoryDate.map((el, i) => {
                return (
                  <Category
                    center
                    key={i}
                    category={category === el.name}
                    _onClick={() => setCategory(el.name)}
                  >
                    {el.name}
                  </Category>
                );
              })}
            </XScrollDrag>
          </CategoryBox>
          <InfinityScroll
            callNext={getRoomList}
            paging={{ next: roomList.has_next }}
          >
            <MoreBox>
              {roomList.list.map((el, i) => {
                return <MoreCard key={i} {...el} />;
              })}
            </MoreBox>
          </InfinityScroll>
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};
const CategoryBox = styled.div`
  gap: 0;
  margin: 0 -16px;
  border-bottom: 2px solid #e5e5e5;

  position: sticky;
  top: -3px;

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

const MoreBox = styled.div`
  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default More;
