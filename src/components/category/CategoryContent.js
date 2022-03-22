import apis from "../../shared/apis";
import React, { useState } from "react";
import InfinityScroll from "../../shared/InfinityScroll";
import MoreCard from "../../components/shared/MoreCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/infinityScroll";

const CategoryContent = ({ category, time }) => {
  const dispatch = useDispatch();
  const data = useSelector((props) => props.infinityScroll[category]);

  const getRoomList = () => {
    dispatch(
      actionCreators.loadListDB(data.page, "loadCategoryRoom", category)
    );
  };

  React.useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <InfinityScroll
        callNext={() => getRoomList()}
        paging={{ next: data.has_next }}
      >
        {data.list.map((el, i) => {
          return <MoreCard key={i} {...el} />;
        })}
      </InfinityScroll>
    </>
  );
};

export default CategoryContent;