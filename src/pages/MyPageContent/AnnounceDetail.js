import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import apis from "../../shared/apis";

import Header from "../../shared/Header";
import Text from "../../elements/Text";

function AnnounceDetail(props) {
  const dispatch = useDispatch();
  const noticeId = props.match.params.noticeId;

  const [detailNotice, setDetailNotice] = useState({});
  const createdAt = detailNotice.createdAt?.split("T")[0];

  useEffect(() => {
    getOneNotice();
  }, []);

  const getOneNotice = () => {
    apis
      .getDetailNotice(noticeId)
      .then((res) => {
        setDetailNotice(res.data);
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "공지사항 상세가져오기 실패",
          })
        );
      });
  };

  return (
    <AnnouncementDetailWrap>
      <Header page="공지사항" />
      <Title>
        <Text size="gnb" weight="semibold">
          {detailNotice.title}
        </Text>
        <Text size="body3">{createdAt}</Text>
      </Title>
      <Content>{detailNotice.content}</Content>
    </AnnouncementDetailWrap>
  );
}

const AnnouncementDetailWrap = styled.div`
  height: 100%;
  background-color: #fff;
  overflow: scroll;
`;

const Title = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px;
`;

const Content = styled.pre`
  padding: 15px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
`;

export default AnnounceDetail;
