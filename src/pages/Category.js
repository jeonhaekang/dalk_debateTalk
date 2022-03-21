import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../shared/Footer";

import FlexGrid from "../elements/FlexGrid";

import InfinityScroll from "../shared/InfinityScroll";
import ContentContainer from "../elements/Container";
import Text from "../elements/Text";
import apis from "../shared/apis";
import styled from "styled-components";
import MoreCard from "../components/shared/MoreCard";
import NewHeader from "../shared/NewHeader";
import BestContent from "../components/category/BestContent";

const Category = (props) => {
  const dispatch = useDispatch();
  const category = props.match.params.category;

  const [scrollData, setScrollData] = React.useState({
    list: [],
    page: 0,
    has_next: false,
  });

  const { size = 5, page, has_next } = scrollData;

  const getRoomList = () => {
    apis
      .loadCategoryRoom(size, page, category)
      .then((res) => {
        let is_next = null;
        if (res.data.length < size) {
          is_next = false;
        } else {
          is_next = true;
        }

        setScrollData({
          list: [...scrollData.list, ...res.data],
          page: scrollData.page + 1,
          has_next: is_next,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <NewHeader page={`#${category}`} color line />
      <ContentContainer>
        <BestContent category={category} />
        <ContentBox is_column>
          <FlexGrid
            is_column
            gap="8px"
            borderBottom="1px solid #c4c4c4"
            padding="21px 0 33px 0"
          >
            <Text size="headline2" weight="medium">
              엎치락 뒤치락 실시간 토론
            </Text>
            <Text>투표를 서둘러 주세요!</Text>
          </FlexGrid>
          <InfinityScroll callNext={getRoomList} paging={{ next: has_next }}>
            {scrollData.list.map((el, i) => {
              return (
                <MoreCard
                  key={i}
                  {...el}
                  scrollData={scrollData}
                  setScrollData={setScrollData}
                />
              );
            })}
          </InfinityScroll>
        </ContentBox>
      </ContentContainer>
      <Footer />
    </>
  );
};

const ContentBox = styled(FlexGrid)`
  padding: 16px;
  gap: 0;

  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default Category;
