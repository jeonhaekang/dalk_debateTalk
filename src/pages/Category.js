import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Grid from "../elements/Grid";
import FlexGrid from "../elements/FlexGrid";
import { actionCreators } from "../redux/modules/chat";
import MainCard from "../components/main/MainCard";
import apis from "../shared/apis";

const Category = (props) => {
  const dispatch = useDispatch();
  const page = props.match.params.category;

  React.useEffect(() => {
    dispatch(actionCreators.loadCategoryRoomDB(page));

    // apis
    //   .loadBestRoom(page)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const roomList = useSelector((state) => state.chat.roomList);

  return (
    <>
      <Header page={"#" + page} />
      <FlexGrid is_column gap="40px" padding="15px">
        <Grid>
          <Grid fontSize="24px" fontWeight="bold">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <Grid fontSize="24px" fontWeight="bold">
              엎치락 뒤치락 실시간 토론
            </Grid>
            <Grid>투표를 서둘러 주세요!</Grid>
          </Grid>
          {roomList &&
            roomList.map((el, i) => {
              return <MainCard key={i} {...el} />;
            })}
        </Grid>
      </FlexGrid>
      <Footer />
    </>
  );
};

export default Category;
