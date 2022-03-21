import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../shared/MoreCard";
import Text from "../../elements/Text";
import { actionCreators } from "../../redux/modules/infinityScroll";

const MoreContent = ({ category }) => {
  const dispatch = useDispatch();
  const api = category === "전체" ? "loadAllRoom" : "loadCategoryRoom";
  const data = useSelector((props) => props.infinityScroll[category]);

  const getRoomList = () => {
    dispatch(actionCreators.loadListDB(data.page, api, category));
  };

  React.useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <div style={{ border: "1px solid rgba(0,0,0,0)" }}>
        <InfinityScroll callNext={getRoomList} paging={{ next: data.has_next }}>
          {data.list.length !== 0 ? (
            <MoreBox>
              {data.list.map((el, i) => {
                return <MoreCard key={i} {...el} />;
              })}
            </MoreBox>
          ) : (
            <Text size="subtitle1">채팅방이 없습니다.</Text>
          )}
        </InfinityScroll>
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
