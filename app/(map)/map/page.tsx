import DescriptionCard from "@/app/(quiz)/_components/_left-panel/DescriptionCard";
import { LeftPanel } from "@/components/LeftPanel";
import MainLayout from "@/components/MainLayout";
import RightPanel from "@/components/RightPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import MapNavigation from "../_components/MapNavigation";

const MapPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ image: string }>;
}) => {
  const params = await searchParams;

  return (
    <MainLayout>
      <LeftPanel>
        <DescriptionCard
          title={DESCRIPTION_CARD.map.title}
          description={DESCRIPTION_CARD.map.description}
          backgroundImage={DESCRIPTION_CARD.map.backgroundImage}
          userImage={params.image}
          isShowingLevelProgress={false}
        />
      </LeftPanel>
      <RightPanel>
        <MapNavigation />
      </RightPanel>
    </MainLayout>
  );
};

export default MapPage;
