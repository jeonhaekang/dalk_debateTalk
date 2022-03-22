import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apis from "../../shared/apis";
import NewHeader from "../../shared/NewHeader";

function AnnounceDetail(props) {
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
        console.log("공지 상세 받기 성공", res.data);
        setDetailNotice(res.data);
      })
      .catch((err) => {
        console.log("공지 상세 받기 실패", err);
      });
  };

  return (
    <>
      <NewHeader page="공지사항" />
      <Wrap>
        <Title>{detailNotice.title}</Title>
        <CreatedAt>{createdAt}</CreatedAt>
      </Wrap>
      <Content>{detailNotice.content}</Content>
    </>
  );
}
const Wrap = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const CreatedAt = styled.div`
  font-size: 12px;
`;
const Content = styled.pre`
  padding: 15px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
`;

export default AnnounceDetail;
