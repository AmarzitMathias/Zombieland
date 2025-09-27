import "./Activites.css";
import { ChangeEvent, use, useEffect } from "react";
import { useState } from "react";
import type { IAttraction } from "../../@types";
import Footer from "../Footer/Footer.tsx";
import Navbar from "../Navbar/Navbar.tsx";
import Card from "../Card/Card.tsx";
import ModalCard from "../ModalCard/ModalCard.tsx";

import { dynamicClass, showAllActivities } from "./Activites.jsx";

function Activites() {
	const [valueFilter, setValueFilter] = useState("0");

	const [activities, setActivities] = useState<IAttraction[]>([]);
	const [cardActivity, setCardActivity] = useState<IAttraction | null>(null);
	const [showAll, setShowAll] = useState(false);
	const [nbActivities, setNbActivities] = useState(0);

	useEffect(() => {
		const allAttraction = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/activities`,
				);

				const data = await response.json();

				setActivities(data);
			} catch (error) {
				// si erreur on affiche l'erreur
				console.error(error);
			}
		};

		allAttraction();
		document.title = "Zombieland - Activité";
	}, []);

	//Permet de d'ajouter une classe pour chaque card, le second UseEffect permet que ce la soit après le chargement des cards
	useEffect(() => {
		dynamicClass();
	}, [activities]);

	//! Dé-commenter si vous voulez voir les valeurs du filtre
	// useEffect(() => {
	// 	const AttractionFilter = async () => {
	// 		try {
	// 			console.log("ceci est un envoie d'appel à API, valeur: ", valueFilter);
	// 		} catch (error) {
	// 			// si erreur on affiche l'erreur
	// 			console.error(error);
	// 		}
	// 	};
	// 	AttractionFilter();
	// }, [valueFilter]);

	function onChangeFilter(e: ChangeEvent<HTMLSelectElement>) {
		setValueFilter(e.target.value);
		showAllActivities();
		setShowAll(false);
	}
	// Affiche toutes les activités
	function showActivites() {
		setShowAll(true)
	}


	// Fonction appelée lors du clic sur une carte pour ouvrir la modale
	const openModal = (activity: IAttraction) => {
		// Trouver l'élément de la carte
		const cardElement = document.getElementById(`card-${activity.id}`);
		// Vérifier si l'élément est visible
		if (cardElement && cardElement.style.display !== "none") {
			setCardActivity(activity); // Met à jour l'activité sélectionnée
			const modal = document.getElementById("modalCard") as HTMLDialogElement;
			modal?.showModal();
		}
	};
	return (
		<>
			<Navbar />
			<div className=" relative w-full h-screen flex items-center justify-center text-white p-4 section-login">
				<h1 className="title-activity">Activité du parc</h1>
				<select
					className="filter"
					id="filter-select"
					onChange={(e) => onChangeFilter(e)}
					value={valueFilter}
				>
					<option value="0">--Veuillez choisir un filtre--</option>
					<option value="1">Attractions</option>
					<option value="2">Spectacles</option>
				</select>
				<div
					className="container-card--activity activities-card cards-list"
					id="cards-list"
				>
					{activities.map((activitiesOne) => {
						let displayStyle = "flex";
						// création d'un const shadow car sinon les ombres des cartes cachées restent
						const shadow = "none";
						// Si un filtre n'est pas sélectionné et que l'id de l'activité est au-dessus de 6 alors on masque la carte (à changer)
						if (valueFilter === "0" && activitiesOne.id > 6) {
							displayStyle = "none"; // Masquer la carte
						}
						if (
							//Cache la carte si sa catégorie ne correspond pas à la valeur du filtre
							valueFilter != "0" &&
							activitiesOne.id_category.toString() !== valueFilter
						) {
							displayStyle = "none"; // Masquer la carte
						}
						//Si showAll = true alors on affiche toutes les activités
						if (showAll === true) {
							displayStyle = "flex"
						}

						return (
							<div
								key={activitiesOne.id}
								style={{ display: displayStyle, boxShadow: shadow }}
								className="card"
								onClick={() => openModal(activitiesOne)}
							>
								<Card
									activity={activitiesOne}
									style={{ display: displayStyle }}
								/>
							</div>
						);
					})}
				</div>
				{/* Si showAll = true et que valeur du filtre = 0 */}
				{!showAll && valueFilter === "0" && (
					<button
						type="button"
						className="btn btn-secondary button-activity"
						id="button-activity"
						onClick={showActivites}
					>
						Voir plus
					</button>
				)}

			</div>
			{<ModalCard activity={cardActivity} />}
			<Footer />
		</>
	);
}

export default Activites;
