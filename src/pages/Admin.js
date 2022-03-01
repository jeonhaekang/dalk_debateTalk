import React from "react";

const Admin = (props) => {
  return (
    <>
      {/* 신고 카운트가 기준치 넘으면 블라인드 목록으로 오게끔 */}
      <div>블라인드 게시글</div>
      <div>블라인드 된 목록</div>
      <br/>
      {/* 너무많다면? 페이지 수로 넘겨야할듯 */}
      <div>토론방 목록</div>
      <div>모든 토론방 목록</div>
      <br/>
      {/* 이것도 많으면 페이지 수로 넘겨야할듯 */}
      <div>유저 목록</div>
      <div>모든 유저 목록</div>
      <br/>
      {/* 등록하면 formdata 형식으로 DB에 보내야되나? */}
      <div>메인 배너</div>
      <button>등록</button>
      <div>이미지 제목</div>
      <button>삭제</button>
    </>
  )
};

export default Admin;
