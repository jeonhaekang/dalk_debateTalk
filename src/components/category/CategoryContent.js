import apis from "../../shared/apis";
import React, { useState } from "react";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../../components/shared/MoreCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/infinityScroll";
import Text from "../../elements/Text";
import FlexGrid from "../../elements/FlexGrid";
import empty from "../../image/shared/emptyRoom.svg";

const CategoryContent = ({ category, time }) => {
  const dispatch = useDispatch();
  const data = useSelector((props) => props.infinityScroll[category]);

  const getRoomList = () => {
    dispatch(
      actionCreators.loadListDB(data.page, "loadCategoryRoom", category)
    );
  };

  React.useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      {data.list.length !== 0 ? (
        <InfinityScroll
          callNext={() => getRoomList()}
          paging={{ next: data.has_next }}
        >
          {data.list.map((el, i) => {
            return <MoreCard key={i} {...el} />;
          })}
        </InfinityScroll>
      ) : (
        <FlexGrid is_column center padding="50px 0" textAlign="center">
          <img alt="empty" src={empty} />
          <Text size="body2">
            아직 방이 없어요 <br />
            방을 생성해주세요!
          </Text>
        </FlexGrid>
      )}
    </>
  );
};

export default CategoryContent;
