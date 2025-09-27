import "./Connexion.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import type { IConnect } from "../../@types";

function Connexion() {
	const [errorDisplay, setError] = useState({message:""});
	const connectUser = async (form: IConnect ) => {
		try {
			const httpResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/api/connect`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(form),
					credentials: 'include' 
					// Pour que les coookies puissent être envoyés et reçus
				},
			);

			if (!httpResponse.ok) {
				const erreur = await httpResponse.json()
				console.log(erreur)
				setError(erreur);
				const message = document.querySelector(".error") as HTMLDialogElement;
				message.style.display = "block";
				return;
			}
			//  on attend la reponse au format json
			// on attend un token qui permettra d'identifier l'utilisateur
			const tokenResponse = await httpResponse.json();
			// stockage du token dans le localStorage
			localStorage.setItem("JWT", tokenResponse.token);
			window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		document.title = 'Zombieland - Connexion';
	  }, []);
	return (
		<>
    <Navbar />
			<div className="section-connexion relative w-full h-screen flex items-center justify-center text-white p-4">
				
				<form
					className="formulaire-connexion"
					onSubmit={(event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const data = Object.fromEntries(formData) as unknown as IConnect;
						connectUser(data);
					}}
				>
					<h1 className="text-black text-inscription">Connexion</h1>
					<label className="input input-bordered flex items-center gap-11 bg-white/50 text-black mb-4 rounded-full p-2">
						Email
						<input
							type="email"
							className="block w-full p-4 rounded-full bg-white/80 "
							placeholder="daisy@site.com"
							name="email"

						/>
					</label>
					<label className="input input-bordered flex items-center gap-5 bg-white/50 text-black mb-4 rounded-full p-3">
						Mot de passe
						<input
							type="password"
							className="w-full p-4 rounded-full bg-white/80"
							placeholder="****"
							name="password"

						/>
					</label>
					<p className=" error error-inscription"> Erreur: {errorDisplay.message}</p>
					<button
						className="btn btn-connect btn-login"
						type="submit"
						value="Submit"
					>
						Valider
					</button>
				</form>
			</div>
			<Footer />
		</>
	);
}
export default Connexion;
