import styled, { keyframes } from "styled-components";
import FlexGrid from "../FlexGrid";
import { loading } from "../../animation/skeleton";

const MoreCardSkeleton = () => {
  return (
    <SkeletonContainer>
      <FlexGrid width="35%">
        <SkeletonImageOuter>
          <SkeletonImageInner />
        </SkeletonImageOuter>
      </FlexGrid>
      <FlexGrid center is_column width="65%">
        <SkeletonTopic />
        <SkeletonVs />
        <SkeletonTopic />
      </FlexGrid>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled(FlexGrid)`
  background-color: #eee;
  padding: 16px;
  margin-top: 16px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10%;
    background: rgba(255, 255, 255, 0.3);

    z-index: 1;
    animation: ${loading} 2s infinite;
  }
`;

const SkeletonImageInner = styled.div`
  background: #e7e7e7;
  padding-top: 100%;
  border-radius: 15px;
`;

const SkeletonImageOuter = styled.div`
  width: 100%;
`;

const SkeletonTopic = styled.div`
  height: 20px;
  width: 100%;
  max-width: 150px;
  border-radius: 15px;
  background-color: #e7e7e7;
`;

const SkeletonVs = styled.div`
  width: 60px;
  height: 30px;
  background-color: #e7e7e7;
  border-radius: 15px;
`;

export default MoreCardSkeleton;
