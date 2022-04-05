import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bannerActions } from "../../redux/modules/banner";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

function Banner() {
  //리덕스 배너 리스트 불러오기
  const BannerList = useSelector((state) => state.banner.BannerList);

  const dispatch = useDispatch();

  //배너 추가할때 url, status, file value 값 상태관리 용도
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  //현재 배너목록 가져오기
  useEffect(() => {
    dispatch(bannerActions.getBannerDB());
  }, []);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //서버에서 url,status 안에 url,status 객체를 가져다 주어, 중괄호로 한번 더 감싸 post 요청 보냄
  const handleAddBanner = () => {
    dispatch(
      bannerActions.addBannerDB(selectedFile, { url: url, status: status })
    );
  };

  const handleDelBanner = (carouselId) => {
    dispatch(bannerActions.delBannerDB(carouselId));
  };

  //현재창, 새창 구분하는 체크박스
  const statusCheckEvent = () => {
    if (status === false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  return (
    <>
      <Title>메인 배너 리스트</Title>
      <FlexGrid is_column padding="16px">
        <FlexGrid>
          <Text size="body1">배너 파일 : </Text>
          <input type="file" onChange={handleFileInput}></input>
        </FlexGrid>
        <FlexGrid is_flex>
          <div>
            Url 경로 {" "}
            <input type="text" onChange={handleUrl} value={url} />
          </div>
          <div>
            새창? {" "}
            <input
              type="checkbox"
              checked={status}
              onChange={statusCheckEvent}
            />
          </div>
        <AddBannerBtn onClick={handleAddBanner}>등록</AddBannerBtn>
        </FlexGrid>
        {BannerList.map((b, idx) => {
          return (
            <FlexGrid is_column key={idx}>
              <img src={b.image} alt="bannerimg" />
              <FlexGrid center>
                {idx + 1}번 캐러셀 이미지
                <OutBtn onClick={() => handleDelBanner(b.carouselId)}>
                  삭제
                </OutBtn>
              </FlexGrid>
            </FlexGrid>
          );
        })}
      </FlexGrid>
    </>
  );
}

const AddBannerBtn = styled.button`
  background-color: #ccc;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 35px;
  font-size: 12px;
  text-align: center;
`;

const Title = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const OutBtn = styled.div`
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
`;

export default Banner;
