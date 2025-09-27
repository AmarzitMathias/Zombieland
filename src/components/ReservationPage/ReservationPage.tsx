import "./ReservationPage.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "./ReservationPage.jsx";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale"

function ReservationPage() {
	const [selectdate, setDate] = useState<Date | undefined>();
	const [tariff, setTariff] = useState(0)
	const [selectDateHuman, setDateHuman] = useState("")
	const [errorDisplay, setError] = useState({message:""});
	//Utilisation de ref pour la modale
	const modalRef = useRef<HTMLDialogElement | null>(null);

 
  const addReservation = async () => {
	const preFormatedDate = format(selectdate, "yyyy-LL-dd")
	const date = parse(preFormatedDate, 'yyyy-MM-dd', new Date());
	
    try {
          // ici on recupere le token stocker dans le localStorage (pas la bonne façon en terme de securité)
          const token = localStorage.getItem("JWT");
		  console.log(token)
          //appel api sur l'url reservation
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/reservation`,
            {
              // on indque ici que les donnees sont en json
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
			  credentials:"include",
              // on indique que l'on utilise la methode post donc qui correspond au CREATE dans le CRUD
              method: "POST",
          // ICI ON ENVOIE L'OBJET DU FORMULAIRE AU FORMAT JSON
          body: JSON.stringify({ date: preFormatedDate, token: token }),
        }
      );
      // ICI ON FAIT DES VERIFICATIONS SI IL Y A UNE ERREUR
      if (!response.ok) {
        const erreur = await response.json()
				setError(erreur);
				return;
      }
      const reservationAdd = await response.json();
	  //Après la validation, on ouvre une modale pour confirmer à l'utilisateur
	  setDateHuman(format(preFormatedDate, "dd MMMM yyyy", {locale: fr}));
	  openModal()
      return reservationAdd;
    } catch (error) {
      console.log(error);
    }
  };


//Décommenter si vous voulez voir la date sélectionnée dans le calendrier
//   useEffect(() => {
//     console.log(selectdate)
//   });

useEffect(() => {
  if (errorDisplay.message) {
	// console.log(errorDisplay.message)
    modalRef.current?.showModal();
  }
}, [errorDisplay.message]);

const openModal = () => {
	modalRef.current?.showModal();
}

const closeModal = () => {
	modalRef.current?.close();
	//Réinitialise le message d'erreur
	setError({ message: "" });

}

useEffect(() => {
    document.title = 'Zombieland - Reservation';
  }, []);
	return (
		<>
			<script src="ReservationPage.jsx" />
			{/* Classe pour le style global de la section avec un positionnement relatif qui permet l'ajout d'éléments positionnés en absolute, la section prend toute la largeur et hauteur et centré */}
			<Navbar />
			<div className="section-reservation relative w-full h-screen flex items-center justify-center text-white p-4">
				
				<div className="reservation-card">
					<figure className="reservation-figure">
						<img
							src="/image/Background-billeterie.jpg"
							alt="Image attraction"
							className="w-full h-auto reservation-image"
						/>
					</figure>
					{/* centre le texte horizontalement et donne une taille de texte responsive */}
					<h2 className="ticket-title justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold reservation-title">
						Billet daté
					</h2>
					{/* Classe que l'on a faite: texte-reservation */}
					<div className="reservation-container-text">
						<h3 className="text-base sm:text-lg md:text-xl reservation-text">
							Plusieurs zones disponibles
						</h3>
						<h3 className="text-base sm:text-lg md:text-xl reservation-text">
							Annulez jusqu'a 10 jours avant
						</h3>
					</div>
				</div>
				<div className="reservation-calendar">
					<h1 className="calendar-text">Choississez votre date de visite</h1>
					<div className=" flex items-center justify-center">
						<div className="calendar max-w-2xl aspect-video">
							<DayPicker
								className="react-day-picker"
								mode="single"
								selected={selectdate}
								onSelect={setDate}
							/>
						</div>
            
					</div>
					<div className="section-calendar">
						<h2 className="calendar-text">
							{/* Valeur rentrée en brut: Tarif Senior */}
							Total<span className="span-reservation">20.00€</span>
						</h2>
						<button className="btn reservation-btn cursor-pointer" onClick={addReservation}>
							Confirmez la sélection
						</button>
					</div>
				</div>
			</div>
			{/* On associe le dialog à la UseRef nommée modalRef afin de pouvoir ouvrir la modale */}
			<dialog ref={modalRef} className="modal modal-reservation"> 
				{/* Si pas d'erreur alors message de confirmation */}
				{!errorDisplay.message && (
					<h2 className="modal-reservation-text">
					Le billet pour le {selectDateHuman} a bien été pris en compte
					</h2>
				)}

				{/* Si erreur alors message d'erreur*/}
				{errorDisplay.message && (
					<h2 className="modal-reservation-text">
					Erreur : {errorDisplay.message}
					</h2>
				)}
				<button type="button" className="button reservation-btn reservation-modal-btn cursor-pointer" onClick={closeModal}> Confirmer</button>
			</dialog>

			<Footer />
		</>
	);
}

export default ReservationPage;
