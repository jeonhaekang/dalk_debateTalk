import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as infinityAction } from "../redux/modules/infinityScroll";
import NewHeader from "../shared/NewHeader";
import ContentContainer from "../elements/Container";
import Footer from "../shared/Footer";
import MoreCard from "../components/shared/MoreCard";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import empty from "../image/shared/emptyRoom.svg";

const SearchRoom = (props) => {
  const dispatch = useDispatch();
  const keyword = props.match.params.keyword;

  const roomList = useSelector((props) => props.infinityScroll[keyword]);

  console.log(roomList);

  useEffect(() => {
    dispatch(infinityAction.loadListDB(0, "searchRoom", keyword));

    return () => dispatch(infinityAction.clear());
  }, []);
  return (
    <>
      <NewHeader page="검색 결과" />

      <ContentContainer padding="16px">
        <FlexGrid gap="0">
          "<Text color="orange">{keyword}</Text>"검색 결과
        </FlexGrid>
        {roomList &&
          (roomList.list.length !== 0 ? (
            <FlexGrid>
              {roomList.list.map((el, i) => {
                return <MoreCard {...el} key={el.roomId} />;
              })}
            </FlexGrid>
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
      </ContentContainer>

      <Footer />
    </>
  );
};

export default SearchRoom;
