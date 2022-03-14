import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import categoryDate from "../../data/categoryData";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

const MainCategoryCard = (props) => {
  return (
    <>
      {categoryDate.map((el) => {
        return (
          <CardWrap
            is_column
            key={el.code}
            _onClick={() => history.push("/more/" + el.name)}
          >
            <FlexGrid>
              <Chip color={el.color}>{el.name}</Chip>
            </FlexGrid>
            <Text size="subtitle">{el.message}</Text>
            <Icon src={el.img} />
          </CardWrap>
        );
      })}
    </>
  );
};

MainCategoryCard.defaultProps = {};

const Chip = styled.div`
  padding: 4px 12px;
  background-color: ${(props) => props.color};
  border-radius: 13px;

  font-size: ${(props) => props.theme.fontSizes.bigBody}px;
  color: white;
`;

const CardWrap = styled(FlexGrid)`
  padding: 12px 16px;
  width: 172px;
  height: 172px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.15);

  flex: 0 0 auto;
  // flex: flex-grow, flex-shrink, flex-basis
  // flex-grow : flexitem확장 관련 0이면 컨테이너 크기가 커져도 아이템 크기가 커지지 않음
  // flex-shrink : flexitem의 축소 관련 0이면 컨테이너가 작아져도 아이템 크기가 줄어들지 않음
  // flex : flexitem의 기본 크기를 결정하는 속성

  margin: 24px 0;
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  background-image: url("${(props) => props.src}");
  background-size: cover;

  position: absolute;
  bottom: 26px;
  right: 23px;
`;

export default MainCategoryCard;
