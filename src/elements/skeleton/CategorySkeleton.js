import styled from "styled-components";
import FlexGrid from "../FlexGrid";
import { loading } from "../../animation/skeleton";

const CategorySkeleton = () => {
  return (
    <SkeletonContainer is_column between>
      <FlexGrid is_column>
        <SkeletonText />
        <SkeletonText />
      </FlexGrid>
      <FlexGrid>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </FlexGrid>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled(FlexGrid)`
  margin: 0 -24px;
  width: calc(100% + 48px);
  height: 320px;
  background-color: #eee;
  padding: 24px;

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

const SkeletonText = styled.div`
  width: 80%;
  height: 30px;

  background-color: #e7e7e7;
`;

const SkeletonCard = styled.div`
  width: 172px;
  height: 172px;
  border-radius: 15px;
  background-color: #e7e7e7;

  flex: 0 0 auto;
`;

export default CategorySkeleton;
