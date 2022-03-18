import date from "../image/category/date.png";
import delusion from "../image/category/delusion.png";
import etc from "../image/category/etc.png";
import food from "../image/category/food.png";
import game from "../image/category/game.png";
import help from "../image/category/help.png";
import humor from "../image/category/humor.png";
import politics from "../image/category/politics.png";
import sports from "../image/category/sports.png";

const categoryDate = [
  { name: "전체", color:"pink", code: "all"},
  { name: "음식", color:"#F26A30", code: "food", img: food, message: <div>부먹?<br/>찍먹?</div> },
  { name: "운동", color:"#00A381", code: "sports", img: sports, message: <div>나는 운동이<br/>싫어!</div> },
  { name: "게임", color:"#5A30F2", code: "game", img: game, message: <div>나는 게임이<br/>좋아!</div> },
  { name: "연애", color:"#E33287", code: "date", img: date, message: <div>메세지</div> },
  { name: "유머", color:"#269CE0", code: "humor", img: humor, message: <div>메세지</div> },
  { name: "헬프", color:"#E99F0F", code: "help", img: help, message: <div>메세지</div> },
  { name: "망상", color:"#C6653C", code: "delusion", img: delusion, message: <div>메세지</div> },
  { name: "정치", color:"#4C4C4C", code: "politics", img: politics, message: <div>메세지</div> },
  { name: "기타", color:"#AFAFAF", code: "etc", img: etc, message: <div>메세지</div> },
];

export default categoryDate;
