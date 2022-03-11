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
};
