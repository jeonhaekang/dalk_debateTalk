import React from "react";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";
import { actionCreators } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";
// import Chip from "../../elements/Chip";
import styled from "styled-components";

const CreateRoom = (props) => {
  const dispatch = useDispatch();

  const [roomInfo, setRoomInfo] = React.useState({
    topicA: "",
    topicB: "",
    time: null,
  });

  const { topicA, topicB, content, time } = roomInfo;

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
    dispatch(actionCreators.createRoomDB({ ...roomInfo, category: cate }));
  };

  return (
    <>
      <Grid
        padding="15px"
        display="flex"
        flexDirection="column"
        gap="30px"
        marginBottom="50px"
      >
        <Grid display="flex" flexDirection="column" gap="10px">
          토론 주제는 무엇인가요?
          <Input name="topicA" value={topicA} onChange={onChange} />
          <Input name="topicB" value={topicB} onChange={onChange} />
        </Grid>

        <Grid display="flex" flexDirection="column" gap="10px">
          카테고리를 선택해주세요.
          <Grid
            display="flex"
            gap="10px"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
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
          </Grid>
        </Grid>

        <Grid display="flex" flexDirection="column" gap="10px">
          토론 시간 제한
          <Grid display="flex" justifyContent="space-around">
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
          </Grid>
        </Grid>
        <CreateButton width="100%" onClick={createRoom}>
          토론방 생성하기
        </CreateButton>
      </Grid>
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

const CreateButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  border: none;

  background-color: white;
`;

export default CreateRoom;
