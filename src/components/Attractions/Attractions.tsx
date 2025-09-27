
import { useState } from "react";
import type { IAttraction } from "../../@types";
import { useEffect } from "react";
import './Attractions.css';
import Card from "../Card/Card.tsx";

interface activitiesProps {
  oneActivity: IAttraction;
}
// interface activitiesProps {
//   oneActivity: IAttraction;
// }
  
 function Attractions () {

  const [attractions, setAttraction] = useState< IAttraction[]>([]);
// useeffect pour recuperer les données attraction appel api
  useEffect(() => {
   
  const searchAttraction = async () => {
    try {
      //appel api sur l'url activities/attractions
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/activities/attractions`)

      // reponse au format json
      const data = await response.json();
      // on stocke les données attraction dans le state attraction  
      setAttraction(data);
    }catch(error){
      // si erreur on affiche l'erreur 
      console.error(error);
    }}
    searchAttraction();

  }, []);

// // fonction pour recuperer les données attraction en fonction de l'activité   
// const geAttractionByActivity = (activityName: string) => {
//  // si on trouve activité on affiche les données attraction
//   if (activityName === 'accueil') {
//     return attraction;
//   }
    
// // on filtre les données attraction en fonction de l'activité 
//     return attraction.filter((attraction) => attraction.category === activityName);
    
// };
// const filteredAttraction = geAttractionByActivity(oneActivity.name);

  return (
    <>
        {/* // on map les données attraction pour les afficher, on fait une boucle sur les données attraction */}
        {attractions.map((attraction) => (
          <Card activity={attraction} key={attraction.id}/>
        ))}

    </>
  );
}; 



export default Attractions;