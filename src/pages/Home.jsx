
import NewHero from "../components/NewHero.jsx";

import Recommended from "../components/Recommended.jsx";

import Founder from "../components/Founder.jsx";
import TopBooks from "../components/TopBooks.jsx";
import ExamPreparation from "../components/ExamPreparation.jsx";
import TopicSummaries from "../components/TopicSummaries.jsx";
import AcademicHelp from "../components/AcademicHelp.jsx";


export default function Home() {
  return (
    <>
      
      <NewHero />
      <Founder/>
      <TopBooks/>
      <Recommended />
			
			<ExamPreparation/>
      <TopicSummaries/>
      <AcademicHelp/>
			
      
    </>
  );
}
