import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfinityScroll from "../../shared/InfinityScroll";
import { actionCreators as infinityAction } from "../../redux/modules/infinityScroll";
import MoreCard from "../shared/MoreCard";
import apis from "../../shared/apis";
import Text from "../../elements/Text";

const MoreContent = ({ category }) => {
  const dispatch = useDispatch();
  const api = category === "전체" ? "loadAllRoom" : "loadCategoryRoom";

  const [scrollData, setScrollData] = React.useState({
    list: [],
    page: 0,
    has_next: false,
  });

  const { size = 5, page, has_next } = scrollData;

  const getRoomList = () => {
    apis[api](size, page, category)
      .then((res) => {
        let is_next = null;
        if (res.data.length < size) {
          is_next = false;
        } else {
          is_next = true;
        }

        setScrollData({
          list: [...scrollData.list, ...res.data],
          page: scrollData.page + 1,
          has_next: is_next,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const observe = useRef(null);

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      // console.log(category, entry);
      if (entry.isIntersecting) {
        console.log("화면에 노출됨:", category);
        getRoomList();
        observer.unobserve(entry.target);
      }
    });
  };

  let observer = new IntersectionObserver(callback, { threshold: 0.5 });

  React.useEffect(() => {
    console.log("useEffect:", category);
    observer.observe(observe.current);
  }, []);

  console.log(`${category} : `, scrollData);

  return (
    <>
      <div ref={observe} style={{ border: "1px solid rgba(0,0,0,0)" }}>
        <InfinityScroll callNext={getRoomList} paging={{ next: has_next }}>
          {scrollData.list.length !== 0 ? (
            <MoreBox>
              {scrollData.list.map((el, i) => {
                return <MoreCard key={i} {...el} />
              })}
            </MoreBox>
          ) : (
            <Text size="subtitle1">채팅방이 없습니다.</Text>
          )}
        </InfinityScroll>
      </div>
    </>
  );
};

const MoreBox = styled.div`
  padding: 0 16px;
  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default React.memo(MoreContent);
