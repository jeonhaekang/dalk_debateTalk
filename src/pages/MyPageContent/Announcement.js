import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as noticeActions } from "../../redux/modules/notice";
import styled from "styled-components";
import NewHeader from "../../shared/NewHeader";
import { history } from "../../redux/configStore";

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
      <NewHeader page="공지사항" />
      {noticeList.map((el, idx) => {
        return (
          <ContentTop key={idx} onClick={() => handleDetail(el.noticeId)}>
            <AnnouncementContent>
              <div style={{ fontSize: "14px" }}>
              <div style={{ fontSize: "16px" }}>{el.title}</div>
                {el.createdAt.split("T")[0]}
              </div>
            </AnnouncementContent>
          </ContentTop>
        );
      })}
    </>
  );
};

const ContentTop = styled.div`
  font-size: 20px;
  color: #686868;
  display: flex;
  justify-content: space-between;
  padding: 28px 20px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  cursor: pointer;
`;
const AnnouncementContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Announcement;
