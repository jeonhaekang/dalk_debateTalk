import onlyMeIMG from "../image/itemImage/onlyMe.png";
import bigFontIMG from "../image/itemImage/bigFont.png";
import myNameIMG from "../image/itemImage/myName.png";
import exBuyIMG from "../image/itemImage/exBuy.png";
import reverseIMG from "../image/itemImage/reverse.png";
import papagoIMG from "../image/itemImage/papago.png";

const itemData = [
  {
    img: onlyMeIMG,
    state: "back",
    name: "나만 말하기",
    itemCode: "onlyMe",
    price: 100,
    content: "나만 말하는 아이템 입니다. 진짜 나만 말해요.",
  },
  {
    img: bigFontIMG,
    state: "front",
    name: "빅폰트",
    itemCode: "bigFont",
    price: 100,
    content: "다른 의견은 작아보이게 내 채팅이 커져요.",
  },
  {
    img: myNameIMG,
    state: "back",
    name: "전부 내이름",
    itemCode: "myName",
    price: 100,
    content: "누가 누군지? 모두 내 이름으로 바뀌어요.",
  },
  {
    img: papagoIMG,
    state: "back",
    name: "파파고",
    itemCode: "papago",
    price: 100,
    content: "상대방이 외국어로 말해요.",
  },
  {
    img: reverseIMG,
    state: "back",
    name: "거꾸로말해요",
    itemCode: "reverse",
    price: 100,
    content: "상대방이 거꾸로 말해요.",
  },
  {
    img: exBuyIMG,
    state: "back",
    name: "경험치 구매",
    itemCode: "exBuy",
    price: 100,
    content: "경험치를 구매해서 배지모양 바꿔봐요.",
  },
];

export default itemData;
