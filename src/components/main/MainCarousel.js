import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import TestLogo from "../../image/testlogo.jpeg";

const MainCarousel = (props) => {
  let { images } = props;

  const style = {
    showArrows: true, // 화살표 표시
    showThumbs: false,
    showStatus: false, // 페이지 표시
  };

  return (
    <>
      <Carousel {...style}>
        {images.map((el, i) => {
          return <Image src={el} key={i} />;
        })}
      </Carousel>
    </>
  );
};

MainCarousel.defaultProps = {
  images: [TestLogo, TestLogo, TestLogo],
};

const Image = styled.div`
  position: relative;
  padding-top: 50%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default MainCarousel;
