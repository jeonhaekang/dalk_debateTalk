import React from "react";
import styled, { keyframes } from "styled-components";
import Text from "../../elements/Text";
import { history } from "../../redux/configStore";

const SearchRoom = ({ state, setState }) => {
  const [aniState, setAniState] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [keywords, setKeywords] = React.useState(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );

  React.useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(keywords));
    if (keyword !== "") {
      history.push("/search/" + keyword);
    }
  }, [keywords]);

  const searchEnter = (e) => {
    if (e.key === "Enter" && keyword) {
      search();
    }
  };

  const search = () => {
    const data = {
      id: Date.now(),
      keyword: keyword,
    };

    setKeywords([data, ...keywords]);
  };

  const removeHistory = (key) => {
    const history = keywords.filter((el) => el.id !== key);
    setKeywords(history);
  };

  const close = () => {
    // setAniState(true);

    // setTimeout(() => {
    setState(false);
    // }, 200);
  };
  return (
    <Container aniState={aniState}>
      <Nav>
        <svg width="34" height="34" onClick={close}>
          <path
            d="M16.5325 5.48248L14.025 2.97498L0 17L14.025 31.025L16.5325 28.5175L5.015 17L16.5325 5.48248Z"
            fill="#737373"
          />
        </svg>
        <SearchContainer>
          <Input
            onKeyPress={searchEnter}
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <svg width="34" height="34" onClick={search}>
            <path
              d="M21.9582 19.8332H20.8391L20.4424 19.4507C22.1424 17.4674 23.0207 14.7616 22.5391 11.8857C21.8732 7.94741 18.5866 4.80241 14.6199 4.32074C8.62741 3.58408 3.58408 8.62741 4.32074 14.6199C4.80241 18.5866 7.94741 21.8732 11.8857 22.5391C14.7616 23.0207 17.4674 22.1424 19.4507 20.4424L19.8332 20.8391V21.9582L25.8541 27.9791C26.4349 28.5599 27.3841 28.5599 27.9649 27.9791C28.5457 27.3982 28.5457 26.4491 27.9649 25.8682L21.9582 19.8332ZM13.4582 19.8332C9.93074 19.8332 7.08324 16.9857 7.08324 13.4582C7.08324 9.93074 9.93074 7.08324 13.4582 7.08324C16.9857 7.08324 19.8332 9.93074 19.8332 13.4582C19.8332 16.9857 16.9857 19.8332 13.4582 19.8332Z"
              fill="#C5C5C5"
            />
          </svg>
        </SearchContainer>
      </Nav>
      <HistoryContainer>
        {keywords.map((el) => {
          return (
            <HistoryBox key={el.id}>
              <Text
                size="subtitle1"
                weight="medium"
                onClick={() => history.push("/search/" + el.keyword)}
              >
                {el.keyword}
              </Text>
              <svg width="20" height="20" onClick={() => removeHistory(el.id)}>
                <path
                  d="M15.8332 5.34175L14.6582 4.16675L9.99984 8.82508L5.3415 4.16675L4.1665 5.34175L8.82484 10.0001L4.1665 14.6584L5.3415 15.8334L9.99984 11.1751L14.6582 15.8334L15.8332 14.6584L11.1748 10.0001L15.8332 5.34175Z"
                  fill="#737373"
                />
              </svg>
            </HistoryBox>
          );
        })}
      </HistoryContainer>
    </Container>
  );
};

const HistoryBox = styled.div`
  height: 58px;
  border-bottom: 1px solid #c4c4c4;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 23px;
`;
const HistoryContainer = styled.div``;

const Nav = styled.div`
  height: 70px;
  width: 100%;
  background-color: #efefef;
  padding: 16px;

  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  background-color: white;
  border-radius: 10px;
  padding: 10px;
  height: 54px;
  border: 1px solid #d2d2d2;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: ${(props) => props.theme.fontSizes.body1};
  &::placeholder {
    color: #d9d9d9;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(50%);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh) * 100);

  background-color: white;
  z-index: 999;

  /* animation: ${(props) => (props.aniState ? fadeOut : fadeIn)} 0.3s; */
`;

export default SearchRoom;
