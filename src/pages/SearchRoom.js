import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as infinityAction } from "../redux/modules/infinityScroll";
import NewHeader from "../shared/NewHeader";
import ContentContainer from "../elements/Container";
import Footer from "../shared/Footer";
import MoreCard from "../components/shared/MoreCard";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";

const SearchRoom = (props) => {
  const dispatch = useDispatch();
  const keyword = props.match.params.keyword;

  const roomList = useSelector((props) => props.infinityScroll);

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
        {roomList.list.length === 0 && (
          <FlexGrid>검색 결과가 없습니다</FlexGrid>
        )}
        <FlexGrid>
          {roomList.list.map((el, i) => {
            return <MoreCard {...el} />;
          })}
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default SearchRoom;
