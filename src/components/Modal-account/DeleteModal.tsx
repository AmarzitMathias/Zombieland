import "./deleteModal.css";
// Modal as a separate component
import { useEffect, useRef, useState } from "react";

function DeleteModal(functionModal) {
	const [error , setError] = useState('')
	// Récupérer les éléments
	const Deletemodal = document.querySelector(".deleteModal");

	const deleteAccount = async () => {
		console.log("test")
		try {
			const token = localStorage.getItem("JWT");
			console.log(token);
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/account/delete`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "DELETE",
			});
			const data = response.json();
			console.log(data)
			if (response.ok) {
				console.log("ceci est un test")
				localStorage.removeItem("JWT");
				window.location.href = "/";
			} else {
				setError('Une erreur est survenue')
				console.log("Une erreur est survenue", data);
			}
			console.log(data);
		} catch (error) {
			console.error("Erreur lors de la récupération du compte :", error);
		}
	};

	return (
		<>
			<dialog className="modal deleteModal deleteModal--hidden" open={functionModal.isOpen}>
				<button
					type="button"
					className="btn button-DeleteModal button-close-DeleteModal"
					onClick={functionModal.onClose}
				>
					Fermer
				</button>
				<p> Voulez-vous vraiment supprimer votre compte ? </p>
				<div className="button-list-DeleteModal">
					<button
						type="submit"
						className="btn button-DeleteModal btn-submit-DeleteModal"
						onClick={deleteAccount}
					>
						Valider
					</button>
					<button
						type="button"
						className="btn button-DeleteModal btn-cancel-DeleteModal"
						onClick={functionModal.onClose}
					>
						Annuler
					</button>
				</div>
				{error && (
										<p className=" error"> Erreur: {error.message}</p>
									)}
			</dialog>
		</>
	);
}

export default DeleteModal;
