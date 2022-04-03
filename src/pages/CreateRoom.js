import Container from "../elements/Container";
import Header from "../shared/Header";
import React, { useEffect, useState } from "react";
import { actionCreators as chatAction } from "../redux/modules/chat";
import { actionCreators as imageAction } from "../redux/modules/image";
import { actionCreators as alertAction } from "../redux/modules/alert";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Upload from "../components/shared/Upload";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import categoryDate from "../data/categoryData";
import { ReactComponent as FillShort } from "../image/shared/fill_shortTimer.svg";
import { ReactComponent as FillLong } from "../image/shared/fill_longTimer.svg";
import { ReactComponent as Long } from "../image/shared/longTimer.svg";
import { ReactComponent as Short } from "../image/shared/shortTimer.svg";

const CreateRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(imageAction.clear());
  }, []);

  const [roomInfo, setRoomInfo] = React.useState({
    topicA: "",
    topicB: "",
    time: null,
  });

  const { topicA, topicB } = roomInfo;

  const [cateCount, setCateCount] = React.useState(0);
  const [category, setCategory] = React.useState({
    연애: false,
    정치: false,
    게임: false,
    음식: false,
    유머: false,
    헬프: false,
    망상: false,
    운동: false,
    기타: false,
  });

  const selectCategory = (name) => {
    // 카테고리 선택
    console.log(name);
    if (category[name]) {
      setCategory({ ...category, [name]: false });
      setCateCount(cateCount - 1);
    } else {
      if (cateCount === 3) return;
      setCategory({ ...category, [name]: true });
      setCateCount(cateCount + 1);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;

    setRoomInfo({
      ...roomInfo,
      [name]: value,
    });
  };

  const [btnState, setBtnState] = useState(true);
  // 생성버튼 중복 클릭 방지
  const createRoom = () => {
    for (const value in roomInfo) {
      if (!roomInfo[value] || cateCount === 0) {
        dispatch(alertAction.open({ message: "모든 항목을 입력해주세요." }));
        return;
      }
    }
    const cate = [];
    for (const [key, value] of Object.entries(category)) {
      value && cate.push(key);
    } // 선택한 카테고리만 배열로 만들어서 넘겨줌
    setBtnState(false);
    dispatch(chatAction.createRoomDB({ ...roomInfo, category: cate }));
  };

  return (
    <>
      <Header page="토론방 만들기" />
      <Container padding="16px" gap="30px" footer>
        {/* 주제 입력 */}
        <FlexGrid is_column gap="24px">
          <FlexGrid is_column gap="0">
            <Text size="headline2" weight="medium">
              토론 주제는 무엇인가요?
            </Text>
            <Text>14자 미만으로 작성해주세요</Text>
          </FlexGrid>

          <FlexGrid is_column center gap="0">
            <TopicInput
              placeholder="ex) 민초좋아! 민초파"
              name="topicA"
              value={topicA}
              onChange={onChange}
              maxLength="14"
            />
            <Text size="headline2" weight="black" color="orange">
              VS
            </Text>
            <TopicInput
              placeholder="ex) 치약안돼! 반민초파"
              name="topicB"
              value={topicB}
              onChange={onChange}
              maxLength="14"
            />
          </FlexGrid>
        </FlexGrid>

        {/* 카테고리 선택 */}
        <FlexGrid is_column gap="24px">
          <FlexGrid gap="5px" alignItems="flex-end">
            <Text size="headline2" weight="medium" lineHeight="28px">
              카테고리를 선택해주세요.
            </Text>
            <Text>최대 3개</Text>
          </FlexGrid>
          <FlexGrid flexWrap="wrap" gap="18px">
            {categoryDate.map((el, i) => {
              if (i === 0) return null;
              return (
                <Chip
                  state={category[el.name]}
                  id="category"
                  key={el.code}
                  onClick={() => selectCategory(el.name)}
                >
                  <FlexGrid center gap="13px">
                    {el.name}
                    {<img src={el.img} alt="categoryIMG" width="28" />}
                  </FlexGrid>
                </Chip>
              );
            })}
          </FlexGrid>
        </FlexGrid>

        {/* 토론시간 선택 */}
        <FlexGrid is_column gap="24px">
          <Text size="headline2" weight="medium">
            토론참가 시간 선택해주세요
          </Text>

          <FlexGrid center gap="16px">
            <TimeBox
              state={roomInfo.time === "true"}
              name="time"
              value={true}
              onClick={onChange}
            >
              <FlexGrid gap="3px" center is_column>
                {roomInfo.time === "true" ? <Short /> : <FillShort />}
                <Text size="body3">20m</Text>
              </FlexGrid>
              <Text size="subtitle1" weight="medium">
                짧게 토크
              </Text>
            </TimeBox>
            <TimeBox
              state={roomInfo.time === "false"}
              name="time"
              value={false}
              onClick={onChange}
            >
              <FlexGrid gap="3px" center is_column>
                {roomInfo.time === "false" ? <Long /> : <FillLong />}
                <Text size="body3">1h</Text>
              </FlexGrid>
              <Text size="subtitle1" weight="medium">
                길게 토크
              </Text>
            </TimeBox>
          </FlexGrid>
        </FlexGrid>

        {/* 썸네일 등록 */}
        <FlexGrid is_column gap="24px">
          <FlexGrid gap="3px" alignItems="flex-end">
            <Text size="headline2" weight="medium" lineHeight="28px">
              썸네일
            </Text>
            <Text>최대 1장 업로드 가능해요</Text>
          </FlexGrid>
          <Upload />
        </FlexGrid>
      </Container>
      <CreateButton
        _onClick={createRoom}
        disabled={!btnState ? true : false}
        center
      >
        토론방 생성하기
      </CreateButton>
    </>
  );
};

const Chip = styled.button`
  background-color: ${(props) =>
    props.state ? props.theme.color.orange : "#f3f3f3"};
  & div {
    color: ${(props) => (props.state ? "white" : props.theme.color.black)};
  }
  height: 48px;
  border-radius: 20px;
  width: calc(100% / 3 - 12px);

  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  box-sizing: border-box;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;
`;

const TimeBox = styled.button`
  width: calc(100% / 2);
  height: 144px;

  border-radius: 10px;
  border: none;

  background-color: ${(props) => (props.state ? "#F19121" : "#f3f3f3")};

  & * {
    pointer-events: none;
    color: ${(props) => (props.state ? "white" : "black")};
  }

  transition: 0.3s;
`;

const CreateButton = styled(FlexGrid)`
  height: 76px;

  background-color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: white;
`;

const TopicInput = styled.input`
  height: 41px;
  border-radius: 10px;
  border: none;
  background-color: #f3f3f3;

  font-size: 16px;
  font-weight: 300;
  width: 100%;
  text-align: center;
`;

export default CreateRoom;
