import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionCreators as noticeActions } from "../../redux/modules/notice";

import NewHeader from "../../shared/NewHeader";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

const Announcement = () => {
  const dispatch = useDispatch();
  const noticeList = useSelector((state) => state.notice.NoticeList);

  useEffect(() => {
    dispatch(noticeActions.getNoticeDB());
  }, []);

  const handleDetail = (noticeId) => {
    history.push(`/announcement/${noticeId}`);
  };

  return (
    <AnnouncementWrap>
      <NewHeader page="공지사항" />
      {noticeList.map((el, idx) => {
        return (
          <ContentTop key={idx} onClick={() => handleDetail(el.noticeId)}>
            <FlexGrid is_column gap="0px">
                <Text size="body1" weight="medium">{el.title}</Text>
                <Text size="body3" weight="light">{el.createdAt.split("T")[0]}</Text>
            </FlexGrid>
          </ContentTop>
        );
      })}
    </AnnouncementWrap>
  );
};

const AnnouncementWrap = styled.div`
  height: 100%;
  background-color: #fff;
  overflow: scroll;
`;

const ContentTop = styled.div`
  color: #686868;
  display: flex;
  justify-content: space-between;
  padding: 28px 20px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  cursor: pointer;
`;

export default Announcement;
