import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { useDispatch } from "react-redux";

const MainCarousel = (props) => {
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState(null);

  const style = {
    showArrows: true, // 화살표 표시
    showThumbs: false,
    showStatus: false, // 페이지 표시
    interval: 5000, // 자동 슬라이드 시간
    autoPlay: true, // 자동 넘김
    infiniteLoop: true, // 무한 루프
  };

  useEffect(() => {
    apis
      .carousels()
      .then((res) => {
        setImageList(res.data);
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  }, []);

  return (
    <>
      {imageList ? (
        <Carousel {...style}>
          {imageList.map((el, i) => {
            return el.status === true ? (
              <a href={el.url} target="_blank" key={i}>
                <Image src={el.image} />
              </a>
            ) : (
              <a href={el.url} key={i}>
                <Image src={el.image} />
              </a>
            );
          })}
        </Carousel>
      ) : (
        <SkeletonImageOuter>
          <SkeletonImageInner />
        </SkeletonImageOuter>
      )}
    </>
  );
};

const Image = styled.div`
  position: relative;
  padding-top: 50%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const SkeletonImageInner = styled.div`
  background: #e7e7e7;
  padding-top: 50%;
`;

const SkeletonImageOuter = styled.div`
  width: 100%;
`;

export default MainCarousel;
