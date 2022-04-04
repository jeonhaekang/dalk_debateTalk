import FlexGrid from "../../elements/FlexGrid";
import CategorySkeleton from "../../elements/skeleton/CategorySkeleton";
import MainCardSkeleton from "../../elements/skeleton/MainCardSkeleton";

const MainContentSkeleton = () => {
  return (
    <FlexGrid is_column marginTop="83px">
      <MainCardSkeleton />
      <MainCardSkeleton />
      <MainCardSkeleton />
      <CategorySkeleton />
      <MainCardSkeleton />
      <MainCardSkeleton />
      <MainCardSkeleton />
    </FlexGrid>
  );
};

export default MainContentSkeleton;
