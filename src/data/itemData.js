import onlyMeIMG from "../image/itemImage/onlyMe.svg";
import bigFontIMG from "../image/itemImage/bigFont.svg";
import myNameIMG from "../image/itemImage/myName.svg";
import exBuyIMG from "../image/itemImage/exBuy.svg";
import reverseIMG from "../image/itemImage/reverse.svg";
import papagoIMG from "../image/itemImage/papago.svg";
import previewBigFont from "../image/itemImage/previewBigFont.svg";
import previewExBuy from "../image/itemImage/previewExBuy.svg";
import previewMyName from "../image/itemImage/previewMyName.svg";
import previewOnlyMe from "../image/itemImage/previewOnlyMe.svg";
import previewPapago from "../image/itemImage/previewPapago.svg";
import previewReverse from "../image/itemImage/previewReverse.svg";

const itemData = [
  {
    img: onlyMeIMG,
    color: "#5F8DFA",
    border: "#3C6BDA",
    name: "나만 말하기",
    itemCode: "onlyMe",
    price: 1000,
    content: "나만 말하는 아이템 입니다. 진짜 나만 말해요.",
    preview: previewOnlyMe,
  },
  {
    img: bigFontIMG,
    color: "#F26A30",
    border: "#CC501B",
    name: "빅폰트",
    itemCode: "bigFont",
    price: 1000,
    content: "다른 의견은 작아보이게 내 채팅이 커져요.",
    preview: previewBigFont,
  },
  {
    img: myNameIMG,
    color: "#00A381",
    border: "#007D63",
    name: "내 이름으로",
    itemCode: "myName",
    price: 1000,
    content: "누가 누군지? 모두 내 이름으로 바뀌어요.",
    preview: previewMyName,
  },
  {
    img: papagoIMG,
    color: "#E99F0F",
    border: "#CA890A",
    name: "파파고",
    itemCode: "papago",
    price: 2000,
    content: "상대방이 외국어로 말해요.",
    preview: previewPapago,
  },
  {
    img: reverseIMG,
    color: "#5A30F2",
    border: "#3F15D7",
    name: "로꾸꺼",
    itemCode: "reverse",
    price: 1500,
    content: "상대방이 거꾸로 말해요.",
    preview: previewReverse,
  },
  {
    img: exBuyIMG,
    color: "#898989",
    border: "#4C4C4C",
    name: "경험치 구매",
    itemCode: "exBuy",
    price: 500,
    content: "경험치를 구매해서 배지모양 바꿔봐요.",
    preview: previewExBuy,
  },
];

export default itemData;
