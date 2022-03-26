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
      const kakao = window.Kakao;
      // 배포 URL 넣어야됨
      const debateTalkUrl = window.location.href

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("1627ff31ac4fe04f58ea8a1844340daa");
      }

      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "Debate Talk, DALK",
          description: "깻잎논쟁, 이제는 종결내자! 밸런스게임 토론 플랫폼, DALKING 입니다",
          imageUrl: "https://ibb.co/M6M1vyz",
          link: {
            mobileWebUrl: debateTalkUrl,
            webUrl: debateTalkUrl,
          },
        },
        social: {
          commentCount: 5,
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
