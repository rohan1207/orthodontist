
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
      <div id="founder">
        <Founder />
      </div>
      <div id="exam-preparation">
        <ExamPreparation />
      </div>
      <TopBooks/>
      <Articles />
			
			
      <TopicSummaries/>
      <AcademicHelp/>
			
      
    </>
  );
}
