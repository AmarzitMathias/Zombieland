import type { IInscription } from "../../@types";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Inscription.css";
import { useEffect, useState } from "react";

function Inscription() {
	const [errorDisplay, setError] = useState({message:""});

	const addUser = async (form: IInscription) => {
		try {
			//appel api sur l'url
			const httpResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				{
					// ici on indique le type de données que l'on envoie donc du json
					headers: {
						"Content-Type": "application/json",
					},
					// on indique que l'on utilise la methode post donc qui correspond au CREATE dans le CRUD
					method: "POST",
					// ICI ON ENVOIE L'OBJET DU FORMULAIRE AU FORMAT JSON
					body: JSON.stringify(form),
					credentials:'include'
				},
			);
			// ICI ON FAIT DES VERIFICATIONS SI IL Y A UNE ERREUR
			if (!httpResponse.ok) {
				const erreur = await httpResponse.json()
				setError(erreur);
				console.log("Voici l'erreur:")
				console.log(erreur)
				const message = document.querySelector(".error") as HTMLDialogElement;
				message.style.display = "block";
				return;
			}
			// on attend un token qui permettra d'identifier l'utilisateur
			const tokenResponse = await httpResponse.json();
			// stockage du token dans le localStorage
			localStorage.setItem("JWT", tokenResponse.token);
			// console.log(userAdd)
			window.location.href = "/";
			return
			// return userAdd;
		} catch (erreur) {
			console.log(erreur);
		}
	};

	useEffect(() => {
		document.title = 'Zombieland - Inscription';
	  }, []);

	return (
		<>
    <Navbar />
			<div className="section-inscription relative w-full h-screen flex items-center justify-center text-white p-4">
				
				<form
					className="formulaire-inscription"
					onSubmit={(event) => {
						// on empeche le comportement par defaut (rechargement de la page)
						event.preventDefault();
						// ici on recupere les données du formulaire et on les stocke dans une variable formData
						const formData = new FormData(event.currentTarget);
						const data = Object.fromEntries(formData) as unknown as IInscription;
						console.log(data);

						addUser(data);
					}}
				>
					<h1 className="text-black text-inscription">Inscription</h1>

					<label className="input input-bordered flex items-center gap-11 bg-white/50 text-black mb-4 rounded-full p-2">
						Nom
						<input
							type="text"
							className="block w-full p-4 rounded-full bg-white/80 "
							placeholder="Nom de famille"
							name="lastname"
						/>
					</label>
					<label className="input input-bordered flex items-center gap-3 bg-white/50 text-black mb-4 rounded-full p-3">
						Prénom
						<input
							type="text"
							className="w-full p-4 rounded-full bg-white/80"
							placeholder="Prénom"
							name="firstname"
						/>
					</label>
					<label className="input input-bordered flex items-center gap-7 bg-white/50 text-black rounded-full p-3">
						Email
						<input
							type="email"
							className="w-full p-4 rounded-full bg-white/80"
							placeholder="Votre Email"
							name="email"
						/>
					</label>
					<label className="input input-bordered flex items-center gap-1.5 bg-white/50 text-black rounded-full p-3">
						Mot de passe
						<input
							type="password"
							className="w-full p-4 rounded-full bg-white/80"
							placeholder="****"
							name="password"
						/>
					</label>
					<p className="error error-inscription"> Erreur: {errorDisplay.message}</p>
					<button className="btn btn-register" type="submit" value="Submit">
						Valider
					</button>
				</form>
			</div>
			<Footer />
		</>
	);
}
export default Inscription;
