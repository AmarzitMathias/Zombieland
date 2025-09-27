import "./Reservation.css";
import { Link } from 'react-router-dom';


function Reservation() {
	return (
		<>
		
			{/* Classe que l'on a faite: card-reservation */}
			<div className="card-reservation">
				<figure className="figure-reservation">
					<img
						src="/image/Background-billeterie.jpg"
						alt="Image attraction"
						className="w-full h-auto image-reservation"
					/>
				</figure>
				{/* Classe que l'on a faite: title-reservation */}
				<h2 className="card-title justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold title-reservation">
					Billet daté
				</h2>
				{/* Classe que l'on a faite: texte-reservation */}
				<div className="texte-reservation">
					<h3 className="text-base sm:text-lg md:text-xl">
						Plusieurs zones disponibles
					</h3>
					<h3 className="text-sm sm:text-base md:text-lg">
						Annulez jusqu'a 10 jours avant
					</h3>
				</div>
				{/* Classe que l'on a faite: btn-reservation */}
				<Link to="/reservation" className="btn btn-reservation">
					Acheter
					</Link>
				<div className="card-actions justify-end"></div>
			</div>
			
		</>
	);
}

export default Reservation;

{
	/* <h2 className="card-title justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold">Billet daté</h2>
<h3 className="text-base sm:text-lg md:text-xl">Plusieurs zones disponibles</h3>
<h3 className="text-sm sm:text-base md:text-lg">Annulez jusqu'a 10 jours avant</h3> */
}
