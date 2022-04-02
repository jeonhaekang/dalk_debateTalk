import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import { actionCreators as infinityAction } from "../../redux/modules/infinityScroll";
import PostListCard from "./PostListCard";
import EmptyRoom from "../shared/EmptyRoom";
import MoreContentSkeleton from "../skeleton/MoreContentSkeleton";

const PostContent = ({ category }) => {
  const dispatch = useDispatch();
  const api = category === "전체" ? "getDebate" : "getDebateCategory";
  const data = useSelector((props) => props.infinityScroll["post"][category]);

  const getRoomList = (page) => {
    dispatch(infinityAction.loadListDB(page, api, category, "post"));
  };

  React.useEffect(() => {
    if (data) {
      return;
    }
    getRoomList(0);
  }, [data]);

  return (
    <>
      <MoreBox>
        {data ? (
          data.list.length !== 0 ? (
            <InfinityScroll
              callNext={() => getRoomList(data.page)}
              paging={{ next: data.has_next }}
            >
              {data.list.map((el, i) => {
                return <PostListCard key={i} {...el} />;
              })}
            </InfinityScroll>
          ) : (
            <EmptyRoom />
          )
        ) : (
          <MoreContentSkeleton />
        )}
      </MoreBox>
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

export default React.memo(PostContent);
