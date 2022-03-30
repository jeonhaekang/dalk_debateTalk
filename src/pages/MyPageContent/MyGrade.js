import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "../../shared/Header";
import { rank, RankInfo, discriminant } from "../../data/rank";

import point from "../../image/mypage/point.svg";

import FlexGrid from "../../elements/FlexGrid";
import Grid from "../../elements/Grid";
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
      <Header page="등급안내" line/>
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
                    <div>
                      <GradeImg src={el.img} />
                    </div>
                    <RankList>
                      <Grid display="flex">
                        <div className="LevelBox">{el.level}</div>
                        <div className="NameBox">{el.name}</div>
                      </Grid>
                      <Grid display="flex">
                        <PointImg src={point} />
                        <Text size="body1" weight="light">
                          {el.exp}
                        </Text>
                      </Grid>
                    </RankList>
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

const RankList = styled(FlexGrid)`
  justify-content: space-between;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  align-items: center;
  .LevelBox {
    background-color: #faa94c;
    font-size: 12px;
    font-weight: ${(props) => props.theme.fontWeight.light};
    padding: 4px 12px 0px 12px;
    border-radius: 30px;
    margin-right: 12px;
  }
  .NameBox {
    font-size: ${(props) => props.theme.fontSizes.body1};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    margin-bottom: 4px;
  }
`;
const GradeImg = styled.img`
  width: 70px;
`;
const PointImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 4px 8px 0px 0px;
`;

export default MyGrade;
