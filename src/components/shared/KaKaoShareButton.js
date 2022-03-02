//react-share 에서는 카카오톡 공유하기 버튼 지원안됨
//그래서 카카오톡 developer 페이지에서 가져와야함
//https://ellismin.com/2020/09/share-kakao/ 참고자료
import React from "react";
import styled from "styled-components";
import kakaoLogo from "../../image/kakao-logo.png";



const KakaoShareButton = (props) => {
  const { size } = props;
  const styles = { size: size };

  React.useEffect(() => {
    createKakaoButton();
  }, []);

  // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능
  const createKakaoButton = () => {
    if (window.Kakao) {
      console.log("test");
      const kakao = window.Kakao;
      // 배포 URL 넣어야됨
      const debateTalkUrl = "http://localhost:3000";

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("1627ff31ac4fe04f58ea8a1844340daa");
      }

      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "Debate Talk, Dalk",
          description: "자유롭게 이야기할 수 있는 우리의 토론공간",
          imageUrl: "https://t1.daumcdn.net/cfile/tistory/9914524C5F20BFFB1B",
          link: {
            mobileWebUrl: debateTalkUrl,
            webUrl: debateTalkUrl,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: debateTalkUrl,
              webUrl: debateTalkUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <button
      id="kakao-link-btn"
      style={{
        padding: "0 0 4px",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#fff",
        borderRadius: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <KakaoLogoImage src={kakaoLogo} {...styles} />
      </div>
    </button>
  );
};

KakaoShareButton.defaultProps = {
  size: 40,
};

const KakaoLogoImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
`;

export { KakaoShareButton };
