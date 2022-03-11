import React from "react";
import styled from "styled-components";
import ContentContainer from "../elements/Container";
import Header from "../shared/Header";
import FlexGrid from "../elements/FlexGrid";
import Image from "../elements/Image";
import Grid from "../elements/Grid";
import apis from "../shared/apis";
import gachaData from "../data/gachaData";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";

const Gacha = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(gachaData.first);

  const cacha = () => {
    dispatch(actionCreators.setPoint(-200));
    apis
      .Gacha()
      .then((res) => {
        console.log(res.data);
        setData({ ...gachaData[res.data.rank], count: res.data.count });
        dispatch(actionCreators.setPoint(gachaData[res.data.rank].point));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <Header page="행운뽑기" />
      <ContentContainer position="relative">
        <FlexGrid center is_column height="100%">
          <Grid width="70%">
            <Image src={data.img} />
          </Grid>
          <FlexGrid is_column center textAlign="center">
            {data.message}
            {data.rank === 0 && `${data.count}번 연속 꽝`}
          </FlexGrid>
        </FlexGrid>
      </ContentContainer>
      <Button onClick={cacha}>클릭해서 행운뽑기 진행</Button>
    </>
  );
};

const Button = styled.button`
  position: absolute;
  height: 60px;
  width: 100%;
  bottom: 0;
  font-size: 24px;
  border: none;
  background-color: #c4c4c4;
  cursor: pointer;
`;

export default Gacha;
