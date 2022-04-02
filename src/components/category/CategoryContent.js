import React from "react";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../../components/shared/MoreCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as infinityAction } from "../../redux/modules/infinityScroll";
import MoreContentSkeleton from "../skeleton/MoreContentSkeleton";
import EmptyRoom from "../shared/EmptyRoom";

const CategoryContent = ({ category }) => {
  const dispatch = useDispatch();
  const data = useSelector((props) => props.infinityScroll["chat"][category]);

  const getRoomList = (page) => {
    dispatch(
      infinityAction.loadListDB(page, "loadCategoryRoom", category, "chat")
    );
  };

  React.useEffect(() => {
    if (data) {
      return;
    }
    getRoomList(0);
  }, [data]);

  console.log(data);

  return (
    <>
      {data ? (
        data.list.length !== 0 ? (
          <InfinityScroll
            callNext={() => getRoomList(data.page)}
            paging={{ next: data.has_next }}
          >
            {data.list.map((el, i) => {
              return <MoreCard key={i} {...el} />;
            })}
          </InfinityScroll>
        ) : (
          <EmptyRoom />
        )
      ) : (
        <MoreContentSkeleton />
      )}
    </>
  );
};

export default CategoryContent;
