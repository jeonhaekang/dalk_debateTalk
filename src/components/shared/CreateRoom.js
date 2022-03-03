import React from "react";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { actionCreators } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";

const CreateRoom = (props) => {
  const dispatch = useDispatch();
  const [roomInfo, setRoomInfo] = React.useState({
    topicA: "",
    topicB: "",
    content: "",
    category: "",
    time: null,
  });

  const { topicA, topicB, content, category, time } = roomInfo;

  const categoryList = [
    { 카테고리1: "category1" },
    { 카테고리2: "category2" },
    { 카테고리3: "category3" },
  ];

  const onChange = (e) => {
    const { value, name } = e.target;
    setRoomInfo({
      ...roomInfo,
      [name]: value,
    });
  };

  const createRoom = () => {
    for (const value in roomInfo) {
      if (!roomInfo[value]) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
    }
    dispatch(actionCreators.createRoomDB(roomInfo));
  };

  return (
    <Grid padding="15px" display="flex" flexDirection="column" gap="30px">
      <Grid display="flex" flexDirection="column" gap="10px">
        토론 주제는 무엇인가요?
        <Input name="topicA" value={topicA} onChange={onChange} />
        <Input name="topicB" value={topicB} onChange={onChange} />
      </Grid>

      <Grid display="flex" flexDirection="column" gap="10px">
        간략한 토론 내용을 말해주세요.
        <Input name="content" value={content} onChange={onChange} />
      </Grid>

      <Grid display="flex" flexDirection="column" gap="10px">
        카테고리를 선택해주세요.
        <select name="category" value={category} onChange={onChange}>
          <option hidden>선택해주세요.</option>
          {categoryList.map((el, i) => {
            return (
              <option key={i} value={el[Object.keys(el)]}>
                {Object.keys(el)}
              </option>
            );
          })}
        </select>
      </Grid>

      <Grid display="flex" flexDirection="column" gap="10px">
        토론 시간 제한
        <Grid display="flex" justifyContent="space-around">
          <Grid>
            <Input name="time" type="radio" value={true} onChange={onChange} />
            짧은 토론 시간
          </Grid>
          <Grid>
            <Input name="time" type="radio" value={false} onChange={onChange} />
            긴 토론 시간
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Button width="100%" onClick={createRoom}>
          토론방 생성하기
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoom;
