// 댓글 타임 카운팅 (방금 전.. 몇분 전..)

const TimeForToday = (value) => {
    const today = new Date();
    //아이폰은 - 를 인식 못하기에 NAN이 뜸, replaceAll을 이용해 /로 바꿈
    const timeValue = new Date(value.replaceAll("-", "/"));

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  export default TimeForToday;