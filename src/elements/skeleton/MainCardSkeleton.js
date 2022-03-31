import styled, { keyframes } from "styled-components";
import FlexGrid from "../FlexGrid";
import { loading } from "../../animation/skeleton";

const MainCardSkeleton = () => {
  return (
    <SkeletonContainer is_column>
      <FlexGrid between>
        <FlexGrid>
          <SkeletonChip />
          <SkeletonChip />
        </FlexGrid>
        <SkeletonChip />
      </FlexGrid>
      <FlexGrid>
        <SkeletonImageOuter>
          <SkeletonImageInner />
        </SkeletonImageOuter>
        <FlexGrid is_column center>
          <SkeletonTopic />
          <SkeletonVs />
          <SkeletonTopic />
        </FlexGrid>
      </FlexGrid>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled(FlexGrid)`
  background-color: #eee;
  border-radius: 15px;
  padding: 16px;

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
const SkeletonVs = styled.div`
  width: 60px;
  height: 30px;
  background-color: #e7e7e7;
  border-radius: 15px;
`;

const SkeletonChip = styled.div`
  background-color: #e7e7e7;

  width: 45px;
  height: 24px;
  border-radius: 20px;
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

export default MainCardSkeleton;
