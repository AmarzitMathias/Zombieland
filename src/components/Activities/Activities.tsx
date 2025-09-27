import { useState } from "react";
import { IAttraction } from "../../@types";
import { useEffect } from "react";
import './Activities.css';
import Card from "../Card/Card";

interface activitiesProps {
  oneActivity: IAttraction;
}
  
 function Activities ({oneActivity} : activitiesProps) {

  const [attraction, setAttraction] = useState< IAttraction[]>([]);
// useeffect pour recuperer les données attraction appel api
  useEffect(() => {
   
  const searchAttraction = async () => {
    try {
      //appel api sur l url 
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/attractions`);
      // reponse au format json
      const data = await response.json();
      console.log(data); 
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
    
// // // on filtre les données attraction en fonction de l'activité 
// //     return attraction.filter((attraction) => attraction.category === activityName);
    
// };
// const filteredAttraction = geAttractionByActivity(oneActivity.name);

  return (
    <div>
      <h1>Activities</h1>
      <ul>
        {/* // on map les données attraction pour les afficher on fait une boucle sur les données attraction */}
        {attraction.map((attractionOne) => (
          <Card attraction={attractionOne} key={attractionOne.id}/>
        ))}
      </ul>
    </div>
  );
}; 



export default Activities;