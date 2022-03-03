import React, { useState } from "react";
import { history } from "../../redux/configStore";

const CountDownTimer = (props) => {
  // 시간,분,초의 변수를 묶어서 정한다
  const { restTime } = props;
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;
  // 타이머가 흘러야하기에 useState로 시간,분,초 전체를 상태관리한다
  const [[mins, secs], setTime] = useState([minutes, seconds]);

  const [state, setState] = useState(true);

  // 시간이 흘러갈때 변화할 시간 분 초 if로 계산
  const tick = () => {
    //만약 00:00:00 이라면 리셋
    if (mins === 0 && secs === 0) {
      setState(false);
      alert("토론이 종료되었습니다.");
      history.replace("/");
      return;
    }
    //만약 20:00:00 이라면 19:59:59로 됨
    if (secs === 0) {
      setTime([mins - 1, 59]);
      //시,분도 00이 아니라면 초이기 때문에 초가 -1 됨
    } else {
      setTime([mins, secs - 1]);
    }
  };

  // setInterval(주기적 settimeout 개념)로 tick함수가 1초마다 주기적으로 사용됨
  // useEffect의 return은 unmount, clearInterval은 주기를 중단시키는 메소드
  React.useEffect(() => {
    if (!state) return;

    const timerId = setInterval(() => tick(), 1000);

    return () => clearInterval(timerId);
  });

  return (
    <div>
      {/* toString().padStart(length, "") = string의 length가 비어있으면 ""로 채워줌 */}
      {/* 9:59:0이 아닌 09:59:00으로 만들어주는 개념 */}
      <p>
        {`
            ${mins.toString().padStart(2, "0")} :
            ${secs.toString().padStart(2, "0")}`}
      </p>
    </div>
  );
};

export default CountDownTimer;
