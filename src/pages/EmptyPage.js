import React from "react";
import styled from "styled-components";
import { Text, FlexGrid } from "../elements/Index";
import { ReactComponent as EmptyImage } from "../image/shared/EmptyPage.svg";
import { history } from "../redux/configStore";

const EmptyPage = () => {
  return (
    <>
      <FlexGrid is_column center margin="50px 0">
        <Text size="headline1" weight="bold">
          없는 페이지 입니다
        </Text>

        <Text
          onClick={() => history.replace("/")}
          size="headline2"
          weight="bold"
          textDecoration="underline"
          color="orange"
        >
          돌아가기
        </Text>
      </FlexGrid>

      <EmptyDuck />
    </>
  );
};

const EmptyDuck = styled(EmptyImage)`
  position: absolute;
  bottom: 0;

  left: 50%;
  transform: translate(-50%, 40%) scale(1.1);
`;

export default EmptyPage;
