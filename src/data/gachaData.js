import egg from "../image/gacha/egg.svg";
import fail from "../image/gacha/fail.svg";
import success from "../image/gacha/success.svg";

const gachaData = {
  0: {
    img: egg,
    rank: 0,
  },
  1: {
    img: success,
    rank: 1,
    point: 40000,
  },
  2: {
    img: success,
    rank: 2,
    point: 20000,
  },
  3: {
    img: success,
    rank: 3,
    point: 6000,
  },
  4: {
    img: success,
    rank: 4,
    point: 2000,
  },
  5: {
    img: success,
    rank: 5,
    point: 1000,
  },
  6: {
    img: fail,
    rank: 6,
    point: 0,
  },
};

export default gachaData;
