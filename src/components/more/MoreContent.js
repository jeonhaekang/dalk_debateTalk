import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../shared/MoreCard";
import { actionCreators as infinityAction } from "../../redux/modules/infinityScroll";
import MoreContentSkeleton from "../skeleton/MoreContentSkeleton";
import EmptyRoom from "../shared/EmptyRoom";

const MoreContent = ({ category }) => {
  const dispatch = useDispatch();
  const api = category === "전체" ? "loadAllRoom" : "loadCategoryRoom";
  const data = useSelector((props) => props.infinityScroll[category]);

  const getRoomList = (page) => {
    dispatch(infinityAction.loadListDB(page, api, category));
  };

  React.useEffect(() => {
    if (data) {
      return;
    }
    getRoomList(0);
  }, [data]);

  return (
    <>
      <div style={{ border: "1px solid rgba(0,0,0,0)" }}>
        <MoreBox>
          {data ? (
            data.list.length !== 0 ? (
              <InfinityScroll
                callNext={() => getRoomList(data.page)}
                paging={{ next: data.has_next }}
              >
                {data.list.map((el, i) => {
                  return <MoreCard key={el.roomId} {...el} />;
                })}
              </InfinityScroll>
            ) : (
              <EmptyRoom />
            )
          ) : (
            <MoreContentSkeleton />
          )}
        </MoreBox>
      </div>
    </>
  );
};

const MoreBox = styled.div`
  padding: 0 16px;
  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default React.memo(MoreContent);
