import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import { ReactComponent as Empty } from "../../image/shared/emptyRoom.svg";

const EmptyRoom = () => {
  return (
    <FlexGrid is_column center padding="50px 0" textAlign="center">
      <Empty />
      <Text size="body2">
        아직 방이 없어요 <br />
        방을 생성해주세요!
      </Text>
    </FlexGrid>
  );
};

export default EmptyRoom;
