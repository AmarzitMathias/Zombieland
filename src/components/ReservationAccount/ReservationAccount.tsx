import { useEffect, useState } from "react";
import "./ReservationAccount.css";

function ReservationAccount(props) {
	const [tickets, setTickets] = useState(props.tickets);
	const [selectedTicket, setSelectedTicket] = useState()

	useEffect(() => {
		setTickets(props.tickets);
	}, [props.tickets]);

	const deleteTicket = async (id) => {
		try {
			const token = localStorage.getItem("JWT");
			//appel api sur l'url
			const httpResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/api/account/tickets/delete`,
				{
					// ici on indique le type de données que l'on envoie donc du json et token
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					credentials:"include",
					// on indique que l'on utilise la methode post donc qui correspond au DELETE dans le CRUD
					method: "DELETE",
					// ICI ON ENVOIE L'OBJET DE L'ID DU TICKET AU FORMAT JSON
					body: JSON.stringify({ id_ticket: id }),
				},
			);
			// ICI ON FAIT DES VERIFICATIONS SI IL Y A UNE ERREUR
			if (!httpResponse.ok) {
				return;
			}
			const userAdd = await httpResponse.json();
			// Filtrer dans les tickets pour enlever celui qui a l'id correspondant
			const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
			console.log("Updated Tickets: ", updatedTickets);
			// Mettre à jour l'état des tickets avec la nouvelle liste
			setTickets(updatedTickets);
			closeModal()
		} catch (error) {
			console.log(error);
		}
	};

	const openModal = (id) => {
		console.log(id)
		setSelectedTicket(id)
		console.log(selectedTicket)
		const modal = document.querySelector(
			".account-ticket-modal",
		) as HTMLDialogElement;
		console.log(modal)
		modal.style.display ="flex"
		modal.showModal()
	}

	const closeModal = () => {
		const modal = document.querySelector(
			".account-ticket-modal",
		) as HTMLDialogElement;
		modal.style.display = "none";
		modal.close()
	}

	const validateModal = () => {
		deleteTicket(selectedTicket)
	}


	if (!props.tickets[0]) {
		return (
			<h1 className="account-ticket-message">
				{" "}
				Vous n'avez pas encore de tickets
			</h1>
		);
	}

	return (
		<>
			<table className="table-account">
				<caption className="account-reservation-title">
					Liste des tickets de votre compte
				</caption>
				<thead>
					<tr>
						<th className="account-table--head">Id</th>
						<th className="account-table--head">Date d'accès</th>
						<th className="account-table--head">Pris le</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map((ticket) => (
						<tr key={ticket.id}>
							<td>{ticket.id}</td>
							<td>{ticket.date}</td>
							<td>{ticket.created_at}</td>
							<td>
								<button
									type="button"
									className="btn account-reservation-btn"
									onClick={() => openModal(ticket.id)}
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<dialog className="modal account-ticket-modal dashboard">
				<h2 className="account-ticket-modal-texte">Êtes-vous sûr de vouloir supprimer votre ticket ? </h2>
				<div>
				<button type="button" className="btn button button-account-reservation-modal" onClick={validateModal}> Valider</button>
				<button type = "button" className="btn button button-account-reservation-modal " onClick={closeModal}> Annuler</button>
				</div>
			</dialog>
		</>
	);
}
export default ReservationAccount;
