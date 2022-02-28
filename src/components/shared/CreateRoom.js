import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";

const CreateRoom = (props) => {
  const category = [
    { 카테고리1: "category1" },
    { 카테고리2: "category2" },
    { 카테고리3: "category3" },
  ];

  const [time, setTime] = React.useState(false);
  console.log(time);

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
          {category.map((el, i) => {
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
            <input
              name="time"
              type="radio"
              onChange={() => {
                setTime(5);
              }}
            />{" "}
            짧은 토론 시간
          </Grid>
          <Grid>
            <input
              name="time"
              type="radio"
              onChange={() => {
                setTime(60);
              }}
            />
            긴 토론 시간
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateRoom;
