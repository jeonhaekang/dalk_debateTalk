import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as chatAction } from "../../redux/modules/chat";

const UserList = ({ roomId }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.chat.currentRoom.users);
  console.log(userList);

  React.useEffect(() => {
    dispatch(chatAction.loadUserListDB(roomId));
  }, []);

  return (
    <>
      {userList.map((el, i) => {
        console.log(el);
        return <UserCard key={i}>{el.nickname}</UserCard>;
      })}
    </>
  );
};

const UserCard = styled.div`
  padding: 10px;
  font-size: 20px;
`;

export default UserList;
