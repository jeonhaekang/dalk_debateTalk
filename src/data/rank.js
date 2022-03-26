import bronze from "../image/rank/bronze.png";
import silver from "../image/rank/silver.png";
import gold from "../image/rank/gold.png";
import platinum from "../image/rank/platinum.png";
import diamond from "../image/rank/diamond.png";
import first from "../image/rank/first.png";
import second from "../image/rank/second.png";
import third from "../image/rank/third.png";

// 유저 등급 판별
export const discriminant = (ex, rank) => {
  if (rank === 1) return 6;
  else if (rank === 2) return 7;
  else if (rank === 3) return 8;

  if (ex < 5000) return 1;
  else if (5000 <= ex && ex < 15000) return 2;
  else if (15000 <= ex && ex < 30000) return 3;
  else if (30000 <= ex && ex < 50000) return 4;
  else return 5;
};

export const rank = {
  1: {
    name: "브론즈",
    img: bronze,
  },
  2: {
    name: "실버",
    img: silver,
  },
  3: {
    name: "골드",
    img: gold,
  },
  4: {
    name: "플레티넘",
    img: platinum,
  },
  5: {
    name: "다이아몬드",
    img: diamond,
  },
  6: {
    name: "1등",
    img: first,
    color: "#F19121",
    height: "160px",
  },
  7: {
    name: "2등",
    img: second,
    color: "#FED4A3",
    height: "85px",
  },
  8: {
    name: "3등",
    img: third,
    color: "#FAEDE1",
    height: "60px",
  },
};

export const RankInfo = [
  {
    name: "랭커",
    img: first,
    level: "Lv 6",
    exp: "TOP 1,2,3",
  },
  {
    name: "다이아몬드",
    img: diamond,
    level: "Lv 5",
    exp: "50,000 ~ EXP",
  },
  {
    name: "플레티넘",
    img: platinum,
    level: "Lv 4",
    exp: "~ 50,000 EXP",
  },
  {
    name: "골드",
    img: gold,
    level: "Lv 3",
    exp: "~ 30,000 EXP",
  },
  {
    name: "실버",
    img: silver,
    level: "Lv 2",
    exp: "~ 15,000 EXP",
  },
  {
    name: "브론즈",
    img: bronze,
    level: "Lv 1",
    exp: "~ 5,000 EXP",
  },
];
