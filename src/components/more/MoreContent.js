import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../shared/MoreCard";
import Text from "../../elements/Text";
import { actionCreators } from "../../redux/modules/infinityScroll";
import FlexGrid from "../../elements/FlexGrid";
import empty from "../../image/shared/emptyRoom.svg";

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
            <FlexGrid is_column center padding="50px 0" textAlign="center">
              <img alt="empty" src={empty} />
              <Text size="body2">
                아직 방이 없어요 <br />
                방을 생성해주세요!
              </Text>
            </FlexGrid>
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
