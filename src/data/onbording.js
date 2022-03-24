import onbording1 from "../image/onboarding/onbording1.svg";
import onbording2 from "../image/onboarding/onbording2.svg";
import onbording3 from "../image/onboarding/onbording3.svg";
import Text from "../elements/Text";

export const onbordingData = [
  {
    img: onbording1,
    message: (
      <div>
        밸런스게임을
        <br />
        실시간 채팅으로 즐겨요!
      </div>
    ),
  },
  {
    img: onbording2,
    message: (
      <div>
        게임에 참여해
        <br />
        알포인트를 모을 수 있어요
      </div>
    ),
  },
  {
    img: onbording3,
    message: (
      <div>
        경험치를 쌓아
        <br />
        <Text color="orange">밸런스게임의 왕</Text>이 되어보세요!
      </div>
    ),
  },
];
