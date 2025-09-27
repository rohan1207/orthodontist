
import NewHero from "../components/NewHero.jsx";

import Articles from "../components/Articles.jsx";

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
      <ExamPreparation/>
      <TopBooks/>
      <Articles />
			
			
      <TopicSummaries/>
      <AcademicHelp/>
			
      
    </>
  );
}
