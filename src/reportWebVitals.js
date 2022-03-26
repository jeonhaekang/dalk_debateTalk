const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // cumulative layout shift : 잘못된 클릭을 유도하지는 않은지 확인
      getFID(onPerfEntry); // first input delay : 웹페이지 반응성 지표, 클릭했을 때 이벤트가 시작이 얼마나 걸리는지
      getFCP(onPerfEntry); // first contentful pain : 브라우저가 화면에 그려지기 시작한 시점까지의 지표
      getLCP(onPerfEntry); // largest contentful paint : 가장 큰 덩어리가 표시되는 시점 지표 
      getTTFB(onPerfEntry); // time to first byte : 첫 번째로 컨텐츠 데이터를 가지고 오는데 걸리는 시간
    });
  }
};

export default reportWebVitals;
