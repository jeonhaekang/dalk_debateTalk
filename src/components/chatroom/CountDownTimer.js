import React, {useState} from 'react'

const CountDownTimer = ({hoursMinSecs}) => {
   
    // 시간,분,초의 변수를 묶어서 정한다
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;

    // 타이머가 흘러야하기에 useState로 시간,분,초 전체를 상태관리한다
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    
    // 시간이 흘러갈때 변화할 시간 분 초 if로 계산
    const tick = () => {
   
        //만약 00:00:00 이라면 리셋
        if (hrs === 0 && mins === 0 && secs === 0) 
            reset()
            //만약 20:00:00 이라면 19:59:59로 됨
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
            //만약 19:59:00 이라면 19:58:59로 됨
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
            //시,분도 00이 아니라면 초이기 때문에 초가 -1 됨
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };

    //리셋
    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    // setInterval(주기적 settimeout 개념)로 tick함수가 1초마다 주기적으로 사용됨
    // useEffect의 return은 unmount, clearInterval은 주기를 중단시키는 메소드
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    return (
        <div>
            {/* toString().padStart(length, "") = string의 length가 비어있으면 ""로 채워줌 */}
            {/* 9:59:0이 아닌 09:59:00으로 만들어주는 개념 */}
            <p>
            {`${hrs.toString().padStart(2, '0')} : 
            ${mins.toString().padStart(2, '0')} :
            ${secs.toString().padStart(2, '0')}`}
            </p> 
        </div>
    );
}

export default CountDownTimer;