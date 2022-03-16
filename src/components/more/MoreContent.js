import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import { actionCreators as infinityAction } from "../../redux/modules/infinityScroll";
import MoreCard from "../shared/MoreCard";

const MoreContent = ({ category }) => {
  const dispatch = useDispatch();
  const api = category === "전체" ? "loadAllRoom" : "loadCategoryRoom";
  React.useEffect(() => {
    dispatch(infinityAction.loadListDB(0, api, category));

    return () => {
      return dispatch(infinityAction.clear());
    };
  }, [category]);

  const roomList = useSelector((props) => props.infinityScroll);

  console.log(roomList);

  const getRoomList = () => {
    dispatch(infinityAction.loadListDB(roomList.page, api, category));
  };
  return (
    <>
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
    </>
  );
};

const MoreBox = styled.div`
  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default MoreContent;
