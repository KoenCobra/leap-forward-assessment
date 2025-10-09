import { LeftPanel } from "@/components/LeftPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import DescriptionCard from "./DescriptionCard";
import QuizControls from "./QuizControls";

const DescriptionAndQuizControls = () => {
  return (
    <LeftPanel>
      <DescriptionCard
        title={DESCRIPTION_CARD.printingHouse.title}
        description={DESCRIPTION_CARD.printingHouse.description}
        backgroundImage={DESCRIPTION_CARD.printingHouse.backgroundImage}
        userImage={DESCRIPTION_CARD.printingHouse.userImage}
      />
      <QuizControls />
    </LeftPanel>
  );
};

export default DescriptionAndQuizControls;
