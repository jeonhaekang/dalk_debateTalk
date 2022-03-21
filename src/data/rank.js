import bronze from "../image/rank/bronze.png";
import silver from "../image/rank/silver.png";
import gold from "../image/rank/gold.png";
import platinum from "../image/rank/platinum.png";
import diamond from "../image/rank/diamond.png";

// 유저 등급 판별
export const discriminant = (ex) => {
  if (ex < 1000) return 1;
  else if (1000 <= ex && ex < 2000) return 2;
  else if (2000 <= ex && ex < 3000) return 3;
  else if (3000 <= ex && ex < 4000) return 4;
  else return 5;
};

export const rank = {
  1: {
    name: "브론즈",
    img: bronze,
    level: "Lv 1",
    exp: "~ 1000 EXP"
  },
  2: {
    name: "실버",
    img: silver,
    level: "Lv 1",
    exp: "~ 2000 EXP"
  },
  3: {
    name: "골드",
    img: gold,
    level: "Lv 1",
    exp: "~ 3000 EXP"
  },
  4: {
    name: "플레티넘",
    img: platinum,
    level: "Lv 1",
    exp: "~ 4000 EXP"
  },
  5: {
    name: "다이아몬드",
    img: diamond,
    level: "Lv 1",
    exp: "~ 5000 EXP"
  },
  6: {
    name: "랭커",
    img: diamond,
    level: "Lv 6",
    exp: "TOP 1,2,3"
  },
};

export const RankInfo = [
  {
    name: "랭커",
    img: diamond,
    level: "Lv 6",
    exp: "TOP 1,2,3"
  },
  {
    name: "다이아몬드",
    img: diamond,
    level: "Lv 5",
    exp: "~ 5,000 EXP"
  },
  {
    name: "플레티넘",
    img: platinum,
    level: "Lv 4",
    exp: "~ 4,000 EXP"
  },
  {
    name: "골드",
    img: gold,
    level: "Lv 3",
    exp: "~ 3,000 EXP"
  },
  {
    name: "실버",
    img: silver,
    level: "Lv 2",
    exp: "~ 2,000 EXP"
  },
  {
    name: "브론즈",
    img: bronze,
    level: "Lv 1",
    exp: "~ 1,000 EXP"
  },
];

