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
    console.log("dddd");
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
    // setBtnState(false);
    dispatch(actionCreators.createRoomDB({ ...roomInfo, category: cate }));
  };

  return (
    <>
      <NewHeader page="토론방 만들기" />
      <ContentContainer padding="16px">
        <FlexGrid is_column gap="30px">
          <FlexGrid is_column border="1px solid red">
            <Text size="headline2" weight="medium">
              토론 주제는 무엇인가요?
            </Text>
            <Input name="topicA" value={topicA} onChange={onChange} />
            <Input name="topicB" value={topicB} onChange={onChange} />
          </FlexGrid>

          <FlexGrid is_column border="1px solid red">
            <Text size="headline2" weight="medium">
              카테고리를 선택해주세요.
            </Text>
            <FlexGrid flexWrap="wrap">
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

          <FlexGrid is_column border="1px solid red">
            <Text size="headline2" weight="medium">
              토론참가 시간 선택해주세요
            </Text>
            <Grid>
              <Input
                name="time"
                type="radio"
                value={true}
                onChange={onChange}
              />
              짧은 토론 시간
            </Grid>
            <Grid>
              <Input
                name="time"
                type="radio"
                value={false}
                onChange={onChange}
              />
              긴 토론 시간
            </Grid>
          </FlexGrid>
          <FlexGrid is_column border="1px solid red">
            <Text size="headline2" weight="medium">
              사진을 첨부해주세요
            </Text>
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
  background-color: #c4c4c4;
  height: 25px;
  border-radius: 10px;
  width: calc(100% / 3 - 10px);

  border: ${(props) => (props.state ? "2px solid black" : "none")};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled(FlexGrid)`
  position: absolute;
  bottom: 0;
  height: 76px;

  background-color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: white;
`;

export default CreateRoom;
