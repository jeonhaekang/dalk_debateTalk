import gacha1 from "../image/gacha/gacha1.png";
import gacha2 from "../image/gacha/gacha2.png";
import gacha3 from "../image/gacha/gacha3.png";
import gacha4 from "../image/gacha/gacha4.png";
import gacha5 from "../image/gacha/gacha5.png";
import gacha6 from "../image/gacha/gacha6.png";

const gachaData = {
  first: {
    img: gacha1,
    rank: -1,
    message: (
      <div>
        행운뽑기 1회 <br />
        200RP소모
      </div>
    ),
  },
  1: {
    img: gacha1,
    rank: 1,
    point: 1000000,
    message: (
      <div>
        축하합니다 1등 입니다!! <br />
        1,000,000 알포인트 당첨!!
      </div>
    ),
  },
  2: {
    img: gacha2,
    rank: 2,
    point: 100000,
    message: (
      <div>
        축하합니다 2등 입니다!! <br />
        100,000 알포인트 당첨!!
      </div>
    ),
  },
  3: {
    img: gacha3,
    rank: 3,
    point: 10000,
    message: (
      <div>
        축하합니다 3등 입니다!! <br />
        10,000 알포인트 당첨!!
      </div>
    ),
  },
  4: {
    img: gacha4,
    rank: 4,
    point: 1000,
    message: (
      <div>
        축하합니다 4등 입니다!! <br />
        1,000 알포인트 당첨!!
      </div>
    ),
  },
  5: {
    img: gacha5,
    rank: 5,
    point: 500,
    message: (
      <div>
        축하합니다 5등 입니다!! <br />
        500 알포인트 당첨!!
      </div>
    ),
  },
  0: {
    img: gacha6,
    rank: 0,
    point: 0,
    message: (
      <div>
        꽉.. <br />
        아쉬워요...
      </div>
    ),
  },
};

export default gachaData;
