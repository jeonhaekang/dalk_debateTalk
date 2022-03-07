import React from "react";
import Header from "../shared/Header";
import Modal from "../components/shared/Modal";
import CreateRoom from "../components/shared/CreateRoom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/chat";
import Footer from "../shared/Footer";
import MainComponent from "../components/main/MainComponent";
import ContentContainer from "../elements/Container";

const Main = (props) => {
  const dispatch = useDispatch();
  const [createModalState, setCreateModalState] = React.useState(false);

  React.useEffect(() => {
    dispatch(actionCreators.loadAllRoomDB());
  }, []);

  return (
    <>
      <Header page="메인" />
      <ContentContainer>
        <MainComponent />
        {/* 채팅방 생성 모달 */}
        <Modal
          modalState={createModalState}
          setModalState={setCreateModalState}
        >
          <CreateRoom />
        </Modal>
      </ContentContainer>
      <Footer setCreateModalState={setCreateModalState} />
    </>
  );
};

Main.defaultProps = {};

export default Main;
