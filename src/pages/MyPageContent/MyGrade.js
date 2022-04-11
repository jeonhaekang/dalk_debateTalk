import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "../../shared/Header";
import { rank, RankInfo, discriminant } from "../../data/rank";

import point from "../../image/mypage/point.svg";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

import Container from "../../elements/Container";

const MyGrade = () => {
  const user = useSelector((state) => state.user.user);
  const userRank = rank[discriminant(user?.ex, user?.rank)];

  const nowExp = user?.ex;
  const nextScore = () => {
    if (nowExp < 5000) {
      return 5000 - nowExp;
    } else if (5000 <= nowExp && nowExp < 15000) {
      return 15000 - nowExp;
    } else if (15000 <= nowExp && nowExp < 30000) {
      return 30000 - nowExp;
    } else if (30000 <= nowExp && nowExp < 50000) {
      return 50000 - nowExp;
    } else return 0;
  };
  const announceScore = nextScore();

  return (
    <>
      <Header page="등급안내" line />
      {user && (
        <Container>
          <FlexGrid
            is_column
            center
            gap="0px"
            textAlign="center"
            padding="100px 80px"
          >
            <Radius center>
              <img className="mygradeimg" src={userRank.img} alt="mygradeimg" />
            </Radius>
            <IsMyGrade>
              나의 등급은 <br />
              <span className="GradeColor">{userRank.name}</span> 입니다
            </IsMyGrade>
            {!user.rank && (
              <NextGrade>
                다음 등급까지
                <span className="RP">
                  {announceScore.toLocaleString("ko-KR")} EXP
                </span>
                남았습니다
              </NextGrade>
            )}
          </FlexGrid>

          <FlexGrid
            is_column
            gap="8px"
            borderTop="16px solid #F1F1F1"
            padding="20px"
          >
            <Text size="headline2" weight="medium">
              알포인트 등급
            </Text>

            <FlexGrid is_column gap="4px">
              {RankInfo.map((el, i) => {
                return (
                  <FlexGrid key={i}>
                    <GradeImg src={el.img} />
                    <FlexGrid center>
                      <LevelBox center>{el.level}</LevelBox>
                      <Text size="body1" weight="medium" width="100%">
                        {el.name}
                      </Text>
                      <FlexGrid center justifyContent="flex-end">
                        <PointImg src={point} />
                        <Text size="body1" weight="light">
                          {el.exp}
                        </Text>
                      </FlexGrid>
                    </FlexGrid>
                  </FlexGrid>
                );
              })}
            </FlexGrid>
          </FlexGrid>
        </Container>
      )}
    </>
  );
};

const Radius = styled(FlexGrid)`
  border: none;
  border-radius: 100%;
  width: 184px;
  height: 184px;
  background-color: #f5f5f5;
  .mygradeimg {
    width: 100%;
  }
`;

const IsMyGrade = styled.div`
  font-size: 28px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  .GradeColor {
    color: #e9c718;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

const NextGrade = styled.div`
  padding-top: 8px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  .RP {
    color: #e9c718;
  }
`;
const LevelBox = styled(FlexGrid)`
  background-color: #faa94c;
  min-width: 45px;
  width: 45px;
  height: 23px;
  font-size: ${(props) => props.theme.fontSizes.body3};

  border-radius: 30px;
`;

const GradeImg = styled.img`
  width: 70px;
`;
const PointImg = styled.img`
  width: 18px;
`;

export default MyGrade;
