import React from "react";
import NewNavbar from "../components/NewNavbar.jsx";
import NewHero from "../components/NewHero.jsx";

import Recommended from "../components/Recommended.jsx";
import MostRead from "../components/MostRead.jsx";
import Latest from "../components/Latest.jsx";


export default function Home() {
  return (
    <>
      
      <NewHero />
      <Recommended />
			<MostRead/>
			<Latest/>
			
      
    </>
  );
}
