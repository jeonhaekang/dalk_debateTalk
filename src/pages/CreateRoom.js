import ContentContainer from "../elements/Container";
import NewHeader from "../shared/NewHeader";
import React, { useEffect, useState } from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import { actionCreators } from "../redux/modules/chat";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Upload from "../components/shared/Upload";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import short from "../image/shared/shortTime.svg";
import long from "../image/shared/longTime.svg";
import { history } from "../redux/configStore";

const CreateRoom = () => {
  const dispatch = useDispatch();

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

  const selectCategory = (e) => {
    // 카테고리 선택
    const { name } = e.target;
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
        alert("모든 항목을 입력해주세요.");
        return;
      }
    }
    const cate = [];
    for (const [key, value] of Object.entries(category)) {
      value && cate.push(key);
    } // 선택한 카테고리만 배열로 만들어서 넘겨줌
    setBtnState(false);
    dispatch(actionCreators.createRoomDB({ ...roomInfo, category: cate }));
  };

  return (
    <>
      <NewHeader page="토론방 만들기" />
      <ContentContainer padding="16px">
        <FlexGrid is_column gap="30px">
          <FlexGrid is_column gap="24px">
            <FlexGrid is_column gap="0">
              <Text size="headline2" weight="medium">
                토론 주제는 무엇인가요?
              </Text>
              <Text>14자 미만으로 작성해주세요</Text>
            </FlexGrid>
            <FlexGrid is_column>
              <TopicInput
                name="topicA"
                value={topicA}
                onChange={onChange}
                maxLength="14"
              />
              <TopicInput
                name="topicB"
                value={topicB}
                onChange={onChange}
                maxLength="14"
              />
            </FlexGrid>
          </FlexGrid>

          <FlexGrid is_column gap="24px">
            <FlexGrid is_column gap="0">
              <Text size="headline2" weight="medium">
                카테고리를 선택해주세요.
              </Text>
              <Text>최대 3개</Text>
            </FlexGrid>
            <FlexGrid flexWrap="wrap" center padding="0 68px">
              {Object.keys(category).map((el) => {
                return (
                  <Chip
                    state={category[el]}
                    id="category"
                    name={el}
                    key={el}
                    onClick={selectCategory}
                  >
                    {el}
                  </Chip>
                );
              })}
            </FlexGrid>
          </FlexGrid>

          <FlexGrid is_column gap="24px">
            <Text size="headline2" weight="medium">
              토론참가 시간 선택해주세요
            </Text>
            <FlexGrid center>
              <TimeBox name="time" value={true} onClick={onChange}>
                <TimerBox center is_column gap="7px">
                  <img src={short} alt="short" />
                  20m
                </TimerBox>
                <TextBox center state={roomInfo.time === "true"}>
                  스몰 토크
                </TextBox>
              </TimeBox>
              <TimeBox name="time" value={false} onClick={onChange}>
                <TimerBox center is_column gap="7px">
                  <img src={long} alt="long" />
                  1h
                </TimerBox>
                <TextBox center state={roomInfo.time === "false"}>
                  길게 토크
                </TextBox>
              </TimeBox>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid is_column gap="24px">
            <FlexGrid is_column gap="0">
              <Text size="headline2" weight="medium">
                썸네일
              </Text>
              <Text>최대 1장 업로드 가능해요</Text>
            </FlexGrid>
            <Upload />
          </FlexGrid>
        </FlexGrid>
      </ContentContainer>
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
  color: ${(props) => (props.state ? "white" : props.theme.color.black)};
  height: 34px;
  border-radius: 10px;
  width: calc(100% / 3 - 10px);

  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  box-sizing: border-box;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeBox = styled.button`
  width: 117px;
  height: 133px;
  background-color: #faede1;
  border-radius: 10px;
  border: none;
  overflow: hidden;

  & * {
    pointer-events: none;
  }
`;

const TimerBox = styled(FlexGrid)`
  height: 80px;
`;

const TextBox = styled(FlexGrid)`
  height: 53px;
  background-color: #f19121;

  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => (props.state ? "white" : "black")};
`;

const CreateButton = styled(FlexGrid)`
  position: fixed;
  max-width: 430px;
  bottom: 0;
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
  padding: 0 24px;
`;

export default CreateRoom;
