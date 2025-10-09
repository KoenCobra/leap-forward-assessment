import { LeftPanel } from "@/components/LeftPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import DescriptionCard from "./DescriptionCard";
import QuizControls from "./QuizControls";

const DescriptionAndQuizControls = () => {
  return (
    <LeftPanel>
      <DescriptionCard
        title={DESCRIPTION_CARD.printingHouses.title}
        description={DESCRIPTION_CARD.printingHouses.description}
        backgroundImage={DESCRIPTION_CARD.printingHouses.backgroundImage}
        userImage={DESCRIPTION_CARD.printingHouses.userImage}
      />
      <QuizControls />
    </LeftPanel>
  );
};

export default DescriptionAndQuizControls;
