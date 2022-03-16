import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Grid from "../elements/Grid";
import FlexGrid from "../elements/FlexGrid";
import MainCard from "../components/main/MainCard";
import { actionCreators as infinitiAction } from "../redux/modules/infinityScroll";
import InfinityScroll from "../shared/InfinityScroll";
import ContentContainer from "../elements/Container";
import Text from "../elements/Text";
import apis from "../shared/apis";
import styled from "styled-components";
import MoreCard from "../components/shared/MoreCard";

const Category = (props) => {
  const dispatch = useDispatch();
  const page = props.match.params.category;
  const [most, setMost] = React.useState();

  React.useEffect(() => {
    dispatch(infinitiAction.loadListDB(0, "loadCategoryRoom", page));

    apis.categoryBest(page).then((res) => {
      console.log(res.data);
      setMost(res.data);
    });

    return () => {
      return dispatch(infinitiAction.clear());
    };
  }, []);

  const getRoomList = () => {
    dispatch(
      infinitiAction.loadListDB(roomList.page, "loadCategoryRoom", page)
    );
  };

  const roomList = useSelector((props) => props.infinityScroll);

  return (
    <>
      <Header page={"#" + page} />
      <ContentContainer>
        <BestBox is_column>
          <Text size="headline1" weight="medium" lineHeight="38px">
            실시간 베스트 토론
          </Text>
          {most && <MainCard {...most} page="main" />}
        </BestBox>

        <ContentBox is_column>
          <FlexGrid is_column gap="8px" borderBottom="1px solid #c4c4c4" padding="21px 0 33px 0">
            <Text size="headline2" weight="medium">
              엎치락 뒤치락 실시간 토론
            </Text>
            <Text>투표를 서둘러 주세요!</Text>
          </FlexGrid>
          <InfinityScroll
            callNext={getRoomList}
            paging={{ next: roomList.has_next }}
          >
            {roomList.list.map((el, i) => {
              return <MoreCard key={i} {...el} />;
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

const BestBox = styled(FlexGrid)`
  background-color: #faede1;
  padding: 24px;
  gap: 23px;
  border-radius: 0 0 15px 15px;
`;

export default Category;
