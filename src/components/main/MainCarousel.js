import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import TestLogo from "../../image/testlogo.jpeg";
import Modal from "../shared/Modal";

const MainCarousel = (props) => {
  const { images } = props;
  const [noticeModalState, setNoticeModalState] = React.useState(false);

  const style = {
    showArrows: true, // 화살표 표시
    showThumbs: false,
    showStatus: false, // 페이지 표시
  };

  return (
    <>
      <Carousel {...style}>
        {images.map((el, i) => {
          return (
            <Image src={el} key={i} onClick={() => setNoticeModalState(true)} />
          );
        })}
      </Carousel>

      <Modal
        modalState={noticeModalState}
        setModalState={setNoticeModalState}
      ></Modal>
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
