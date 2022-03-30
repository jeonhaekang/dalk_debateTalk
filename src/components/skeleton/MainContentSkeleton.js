import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import CategorySkeleton from "../../elements/skeleton/CategorySkeleton";
import MainCardSkeleton from "../../elements/skeleton/MainCardSkeleton";

const MainContentSkeleton = () => {
  return (
    <FlexGrid is_column gap="82px">
      <FlexGrid is_column>
        <SkeletonText />
        <SkeletonText />
      </FlexGrid>
      <FlexGrid is_column gap="24px">
        <MainCardSkeleton />
        <MainCardSkeleton />
        <MainCardSkeleton />
        <CategorySkeleton />
        <MainCardSkeleton />
        <MainCardSkeleton />
        <MainCardSkeleton />
      </FlexGrid>
    </FlexGrid>
  );
};

const SkeletonText = styled.div`
  background-color: #e7e7e7;
  width: 70%;
  height: 33px;
  border-radius: 15px;
`;

export default MainContentSkeleton;
