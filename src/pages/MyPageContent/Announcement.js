import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionCreators as noticeActions } from "../../redux/modules/notice";

import Header from "../../shared/Header";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import Container from "../../elements/Container";

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
    <>
      <Header page="공지사항" />
      <Container>
        {noticeList.map((el, idx) => {
          return (
            <ContentTop key={idx} onClick={() => handleDetail(el.noticeId)}>
              <FlexGrid is_column gap="0px">
                <Text size="body1" weight="medium">
                  {el.title}
                </Text>
                <Text size="body3" weight="light">
                  {el.createdAt.split("T")[0]}
                </Text>
              </FlexGrid>
            </ContentTop>
          );
        })}
      </Container>
    </>
  );
};

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
