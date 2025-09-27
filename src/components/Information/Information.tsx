import "./Information.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";

function Information() {

  useEffect(() => {
    document.title = 'Zombieland - Information';
  }, []);
  return (
    <>
      <Navbar />
      <div className="section-all-information relative w-full h-screen flex items-center justify-center text-white p-4">
        <h1 className="title-information">Information Pratique</h1>
        <div className="all-section p-5 rounded-2xl shadow-md">
          <div className="section-information">
            <h2 className=" title-FAQ"> Foire aux Questions</h2>
            <div className="faq-information ">
              <ul className="faq">
                <li className="faq-list p-2">
                  <h3 className="question">Q. Quelles sont les heures d'ouverture de Zombieland ?</h3>
                  <p className="answer">
                   R. Notre Parc vous accueilles tout les jours de 10h00 à
                   20h00. Peut varier les jours fériés !
                  </p>
                </li>
                <li className="faq-list p-2">
                  <h3 className="question">Q. Où trouver les horaires des spectacles et parades ?</h3>
                  <p className="answer">R. Vous pouvez également découvrir la programmation et les
                    horaires aux guichets du Parc.
                  </p>
                </li>
                <li className="faq-list p-2">
                  <h3 className="question">
                    Q. Puis-je aller dans le Parc avec mon chien ou mon chat ?
                  </h3>
                  <p className="answer">
                    R. Non. Pour des raisons de santé et de sécurité, les animaux
                    de compagnie (à l'exception des chiens guides pour
                    malvoyants et personnes à mobilité réduite) sont interdits
                    dans l'enceinte du Parc.
                  </p>
                </li>
                <li className="faq-list p-2">
                  <h3 className="question">Q. Puis-je louer un fauteuil roulant à Zombieland ?</h3>
                  <p className="answer">
                    R. Oui. Il est possible de louer des fauteuils roulants au
                    point de Location situé près de la Parade des Zombies.
                  </p>
                </li>
                <li className="faq-list p-2">
                  <h3 className="question">
                    Q. Je suis handicapé. Quelles attractions me conviennent ?
                  </h3>
                  <p className="answer">
                    R. Zombieland est doté d'attractions convenant à tous les
                    visiteurs.
                  </p>
                </li>
                <li className="faq-list p-2">
                  <h3 className="question">
                    Q. Où puis-je me rendre si une personne se blesse ou a besoin
                    de soins médicaux ?
                  </h3>
                  <p className="answer">
                    R. En cas d'urgence, veuillez contacter votre Cast Member
                    (employé du Parc) le plus proche. Le centre de Premier Soin
                    se trouve à proximité de Zombie Apocalypse Maze.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      
      </div>
      <Footer />
    </>
  );
}
export default Information;
