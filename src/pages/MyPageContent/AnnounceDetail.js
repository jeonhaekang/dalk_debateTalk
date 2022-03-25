import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import styled from "styled-components";
import apis from "../../shared/apis";
import NewHeader from "../../shared/NewHeader";

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
            message: "배너목록 가져오기 실패",
          })
        );
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
