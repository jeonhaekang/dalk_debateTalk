import { ReactComponent as Egg } from "../../image/gacha/egg.svg";
import styled from "styled-components";
import { shake, fadeIn } from "../../animation/gacha";
import { ReactComponent as Fail } from "../../image/gacha/fail.svg";
import { ReactComponent as Success } from "../../image/gacha/success.svg";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const EggComponent = ({ start }) => {
  const user = useSelector((props) => props.user.user);

  return (
    <>
      <EggImage start={start ? 1 : 0} />
      {user && (
        <Text>
          {user.lottoCount < 1 ? "오늘은 모두 소진되었어요" : "행운뽑기"}
          <br />
          <Text color="gray">{user.lottoCount}회 남음</Text>
        </Text>
      )}
    </>
  );
};

const EggImage = styled(Egg)`
  animation-name: ${shake};
  animation-iteration-count: infinite;
  animation-duration: ${(props) => (props.start ? "700ms" : "2000ms")};
`;

export const ResultConponent = ({ result, setStart }) => {
  useEffect(() => {
    setStart(false);
  }, []);

  return (
    <ResultContainer>
      {result.rank === 6 ? (
        <>
          <Fail />
          <Text color="gray">
            꽉.. <br />
            아쉬워요
          </Text>
        </>
      ) : (
        <>
          <Success />
          <Text>
            축하합니다! <br />
            <Text color="orange">
              {result.point.toLocaleString("ko-KR")}알포인트
            </Text>
            당첨!
          </Text>
        </>
      )}
    </ResultContainer>
  );
};

const ResultContainer = styled(FlexGrid).attrs(() => ({
  center: true,
  is_column: true,
}))`
  animation: ${fadeIn} 1000ms;
  text-align: center;
`;
