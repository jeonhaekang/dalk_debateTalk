import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";
import Button from "../../elements/Button";

const CreateRoom = (props) => {
  const categoryList = [
    { 카테고리1: "category1" },
    { 카테고리2: "category2" },
    { 카테고리3: "category3" },
  ];

  const [roomData, setRoomData] = React.useState();

  React.useEffect(() => {
    console.log("리렌더링됨");
  });

  const createRoom = () => {
    // if (!topicA || !topicB) {
    //   alert("주제를 입력해주세요.");
    //   return;
    // }
    // if (!content) {
    //   alert("내용을 입력해주세요.");
    //   return;
    // }
    // if (!category) {
    //   alert("카테고리를 선택해주세요.");
    //   return;
    // }
    // if (!time) {
    //   alert("토론 시간을 선택해주세요.");
    //   return;
    // }
  };

  return (
    <Grid padding="15px" display="flex" flexDirection="column" gap="30px">
      <Grid display="flex" flexDirection="column" gap="10px">
        토론 주제는 무엇인가요?
        <Input />
        <Input />
      </Grid>

      <Grid display="flex" flexDirection="column" gap="10px">
        간략한 토론 내용을 말해주세요.
        <Input />
      </Grid>

      <Grid display="flex" flexDirection="column" gap="10px">
        카테고리를 선택해주세요.
        <select>
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
            <input name="time" type="radio" />
            짧은 토론 시간
          </Grid>
          <Grid>
            <input name="time" type="radio" />긴 토론 시간
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
