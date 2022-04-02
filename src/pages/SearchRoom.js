import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as infinityAction } from "../redux/modules/infinityScroll";
import Header from "../shared/Header";
import Container from "../elements/Container";
import Footer from "../shared/Footer";
import MoreCard from "../components/shared/MoreCard";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import empty from "../image/shared/emptyRoom.svg";
import styled from "styled-components";
import InfinityScroll from "../shared/InfinityScroll";

const SearchRoom = (props) => {
  const dispatch = useDispatch();
  const keyword = props.match.params.keyword;

  const data = useSelector((props) => props.infinityScroll["search"][keyword]);

  const getRoomList = (page) => {
    dispatch(infinityAction.loadListDB(page, "searchRoom", keyword, "search"));
  };

  React.useEffect(() => {
    if (data) {
      return;
    }
    getRoomList(0);
  }, [data]);
  return (
    <>
      <Header page="검색 결과" />

      <Container footer padding="16px">
        <FlexGrid gap="0">
          "<Text color="orange">{keyword}</Text>"검색 결과
        </FlexGrid>
        {data &&
          (data.list.length !== 0 ? (
            <SearchBox is_column>
              <InfinityScroll
                callNext={() => getRoomList(data.page)}
                paging={{ next: data.has_next }}
              >
                {data.list.map((el, i) => {
                  return <MoreCard {...el} key={el.roomId} />;
                })}
              </InfinityScroll>
            </SearchBox>
          ) : (
            <FlexGrid center is_column textAlign="center">
              <img alt="empty" src={empty} />
              <Text>
                아직 채팅방이 없어요
                <br />
                방을 생성해주세요!
              </Text>
            </FlexGrid>
          ))}
      </Container>

      <Footer />
    </>
  );
};

const SearchBox = styled.div`
  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default SearchRoom;
