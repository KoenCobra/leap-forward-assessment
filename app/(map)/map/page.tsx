import DescriptionCard from "@/app/(quiz)/_components/_left-panel/DescriptionCard";
import { LeftPanel } from "@/components/LeftPanel";
import MainLayout from "@/components/MainLayout";
import RightPanel from "@/components/RightPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import MapNavigation from "../_components/MapNavigation";

const MapPage = ({ searchParams }: { searchParams: { image: string } }) => {
  return (
    <MainLayout>
      <LeftPanel>
        <DescriptionCard
          title={DESCRIPTION_CARD.map.title}
          description={DESCRIPTION_CARD.map.description}
          backgroundImage={DESCRIPTION_CARD.map.backgroundImage}
          userImage={searchParams.image}
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
