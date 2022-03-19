import love from "../image/category/love.svg";
import delusion from "../image/category/delusion.svg";
import etc from "../image/category/etc.svg";
import food from "../image/category/food.svg";
import game from "../image/category/game.svg";
import help from "../image/category/help.svg";
import humor from "../image/category/humor.svg";
import politics from "../image/category/politics.svg";
import sports from "../image/category/sports.svg";

const categoryDate = [
  { name: "전체", color:"pink", code: "all"},
  { name: "음식", color:"#F26A30", code: "food", img: food, message: <div>부먹?<br/>찍먹?</div> },
  { name: "운동", color:"#00A381", code: "sports", img: sports, message: <div>3대 몇<br/>치세요?</div> },
  { name: "게임", color:"#5A30F2", code: "game", img: game, message: <div>?? : ㅈㄱㅊㅇ</div> },
  { name: "연애", color:"#E33287", code: "date", img: love, message: <div>봄 사랑 벚꽃<br/>말고..</div> },
  { name: "유머", color:"#269CE0", code: "humor", img: humor, message: <div>부장님 너무<br/>웃겨요</div> },
  { name: "헬프", color:"#E99F0F", code: "help", img: help, message: <div>고르는 거<br/>도와줘!</div> },
  { name: "망상", color:"#C6653C", code: "delusion", img: delusion, message: <div>N들 여기<br/>다 모여</div> },
  { name: "정치", color:"#4C4C4C", code: "politics", img: politics, message: <div>당신의<br/>선택은?</div> },
  { name: "기타", color:"#AFAFAF", code: "etc", img: etc, message: <div>무엇이든<br/>토론해요!</div> },
];

export default categoryDate;
