import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bannerActions } from "../../redux/modules/banner";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

function Banner() {
  const BannerList = useSelector((state) => state.banner.BannerList);

  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(false);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    dispatch(bannerActions.getBannerDB());
  }, []);

  const [selectedFile, setSelectedFile] = useState();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddBanner = () => {
    dispatch(
      bannerActions.addBannerDB(selectedFile, { url: url, status: status })
    );
  };

  const handleDelBanner = (carouselId) => {
    dispatch(bannerActions.delBannerDB(carouselId));
  };

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
