// Import des composants
import Navbar from "../Navbar/Navbar";
import Reservation from "../Reservation/Reservation";
import Footer from "../Footer/Footer";
import Attractions from "../Attractions/Attractions";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

// Import du CSS
import "./Accueil.css";



function Accueil() {

	useEffect(() => {
		document.title = 'Zombieland - Accueil';
	  }, []);
	return (
		// Conteneur principal de la page avec flex-row sur grands écrans
		<div className="md:max-1g:flex-row">
			<main>
				{/* Première section */}
				{/* Image en arrière plan */}
				<div className="md:max-lg:flex-row">
					<Navbar />

					{/* Section 1 : Image principale avec texte */}
					<section className="relative w-full h-screen flex items-center justify-center text-white section-accueil">
						{/* Image de fond qui couvre toute la section */}

						{/* Applique un dégradé de noir du bas vers le haut  */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent"/>
						{/* Contient le titre et les descriptions positionnés au-dessus de l'image */}
						<div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-2xl px-6 mt-16 top-32">
							{/* Texte au-dessus de l'image */}
							<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-snug absolute bottom-60 title-accueil">
								ENTER THE NIGHTMARE 
							</h1>

							<p className="w-full text-sm sm:text-base md:text-lg leading-relaxed ">
								Le parc d'attractions où l'horreur prend vie. <br />
								Plongez dans un monde post-apocalyptique infesté de zombies
								affamés, <br />
								où chaque attraction vous mettra à l'épreuve.
							</p>
							{/* Paragraphe avec différentes tailles et styles de texte */}
							<p className="w-full md:w-3/4 text-base sm:text-lg md:text-xl font-semibold leading-loose">
								Venez survivre… ou rejoindre les rangs des infectés. <br />
								ZombieLand vous attend…{" "}
								<span className="italic">si vous l’osez.</span>
							</p>
						</div>
					</section>

					{/* Section 2 : Conteneur des images suivantes */}
					<section className="w-full flex flex-col section-attraction">
						{/* Image 2 en plein écran*/}

						<div className="relative max-h-full h-screen  ">
							{/* Dégradé du haut vers le bas pour assombrir l'image */}
							<div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

							{/* Titre attraction avec différentes tailles selon l'écran */}
							{/* Conteneur du texte et du bouton */}
							<div className="relative z-20  top-5 text-center container-attraction">
								{/* Titre principal avec une taille adaptative selon l'écran */}
								<h2 className="text-5xl sm:text-5xl md:text-5xl top-5 font-extrabold title-attraction">
									Nos attractions
								</h2>
								{/* Conteneur du composant Attraction, centré horizontalement et positionné plus bas */}
								<div>
									<div className=" w-full top-24 mt-6 scale-75 container-card">
										<Attractions/>
									</div>
									<Link to="/activities" className="btn btn-secondary button-attraction">Voir plus</Link>

								</div>
							</div>
						</div>
					</section>

					{/* Section 3 Image 3 avec le texte "Réservation" au-dessus*/}
					<section className="relative w-full h-screen flex items-center justify-center section-reservation">
						{/* Dégradé du haut vers le bas pour assombrir l'image */}
						<div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
						{/* Conteneur du texte centré horizontalement et positionné en hauteur */}
						<div className="absolute top-16  transform  z-10 flex flex-col items-center text-center space-y-4 container-reservation">
							{/* Titre avec différentes tailles selon l'écran */}
							<h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-lg title-ticket">
								Découvrez nos billets Zombieland !
							</h2>
							{/* Conteneur du composant avec une marge en haut et une réduction d'échelle */}
							<div className="mt-4 scale-60">
								<Reservation />
							</div>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}
export default Accueil;
