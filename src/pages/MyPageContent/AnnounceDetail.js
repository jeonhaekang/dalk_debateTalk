import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apis from "../../shared/apis";
import Header from "../../shared/Header";

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
      <Header page="공지사항" />
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
  padding: 15px;
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
`;

export default AnnounceDetail;
