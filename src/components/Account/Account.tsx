import { useRef, useState, useEffect } from "react";
import "./Account.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Modal from "../Modal-account/Modal";
import DeleteModal from "../Modal-account/DeleteModal.tsx";
import ReservationAccount from "../ReservationAccount/ReservationAccount";

function Account() {
	const [modalFirstname, setModalFirstname] = useState(false);
	const [modalLastname, setModalLastname] = useState(false);
	const [modalEmail, setModalEmail] = useState(false);
	const [modalPassword, setModalPassword] = useState(false);
	const [error, setError] = useState({ message: "" })
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		tickets: [],
	});
	// État pour contrôler la visibilité de la modale de suppression du compte
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const inputs = [
		{
			id: 1,
			label: "Prénom",
			property: "firstname",
			name: "newFirstname",
			modal: modalFirstname,
			setModal: setModalFirstname,
			route: "firstname",
		},
		{
			id: 2,
			label: "Nom",
			property: "lastname",
			name: "newLastname",
			modal: modalLastname,
			setModal: setModalLastname,
			route: "lastname",
		},
		{
			id: 3,
			label: "Email",
			property: "email",
			name: "newEmail",
			modal: modalEmail,
			setModal: setModalEmail,
			route: "email",
		},
		{
			id: 4,
			label: "Mot de passe",
			property: "password",
			name: "newPassword",
			modal: modalPassword,
			setModal: setModalPassword,
			route: "password",
		},
	];
	const modalRef = useRef<HTMLDialogElement>(null);
	const [modalContent, setModalContent] = useState<string>("");
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};
	//récupére le compte grâce au token
	const getAccount = async () => {
		try {
			const token = localStorage.getItem("JWT");
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/account`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				credentials: "include"
			});
			const data = await response.json();
			setUser(data.account);
			// console.log(data.account)
		} catch (error) {
			console.error("Erreur lors de la récupération du compte :", error);
		}

	};

	//Déconnecte l'utilisateur
	const deconnect = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/account/logout`, {
				method: "POST",
				credentials: "include"
			});
			const data = await response.json();
			if (!response.ok) {
				console.log("Erreur")
				return
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du compte :", error);
		}
		localStorage.removeItem("JWT");
		window.location.href = "/";
	};

	//Permet d'afficher les réservations en cliquant sur "mes réservations"
	const showReservation = async () => {
		const account = document.querySelector(
			".dashboard-right",
		) as HTMLDialogElement;
		//On sélectione chaque enfant dans le dashboard right
		const accountChildren = account.children;
		//Pour chaque enfant, on lui met un display none
		for (let index = 0; index < accountChildren.length; index++) {
			accountChildren[index].style.display = "none";
		}

		//Si l'utilisateur n'a pas de tickets alors on affiche notre message
		if (!user.tickets[0]) {
			const message = document.querySelector(
				".account-ticket-message",
			) as HTMLDialogElement;
			message.style.display = "flex";
		}
		//Si l'utilisateur a un ticket au minimum, on lui affiche un tableau
		if (user.tickets[0]) {
			const reservation = document.querySelector(
				".table-account",
			) as HTMLDialogElement;
			reservation.style.display = "block";
		}
	};

	//permet d'afficher le compte en cliquant sur "Mon compte"
	const showAccount = () => {
		const account = document.querySelector(
			".dashboard-right",
		) as HTMLDialogElement;
		//On sélectione chaque enfant dans le dashboard right
		const accountChildren = account.children;
		//Pour chaque enfant, on lui met un display none
		for (let index = 0; index < accountChildren.length; index++) {
			accountChildren[index].style.display = "";
		}
		const textAccount = document.querySelector(
			".text-account",
		) as HTMLDialogElement;
		const buttonAccount = document.querySelector(
			".btn-account",
		) as HTMLDialogElement;
		textAccount.style.display = "flex";
		buttonAccount.style.display = "flex";

	}


	// Ouvre la modale de suppression
	function openDeleteModal() {
		const Deletemodalbutton = document.querySelector(".deleteModal",) as HTMLDialogElement;
		setIsDeleteModalOpen(true);
		Deletemodalbutton.style.display = "";
	}

	// Ferme la modale de suppression
	function closeDeleteModal() {
		setIsDeleteModalOpen(false);
	}

	function updateTextButton() {
		const btnName = document.getElementById("btn-modify-1");
		const btnLastname = document.getElementById("btn-modify-2");
		const btnEmail = document.getElementById("btn-modify-3");
		const btnPassword = document.getElementById("btn-modify-4");

		if (window.innerWidth < 600) {
			// Si la taille de l'écran est inférieure à 600px
			console.log(btnEmail)
			btnName.textContent = "Modifier le prénom";
			btnLastname.textContent = "Modifier le nom";
			btnEmail.textContent = "Modifier l'email";
			btnPassword.textContent = "Modifier le mot de passe";
		}
	}


	//Se déclenche dès le chargement de la page
	useEffect(() => {
		getAccount();
		updateTextButton();
		document.title = 'Zombieland - Compte';
	}, []);


	return (
		<>
			<Navbar />
			<div className=" relative w-full h-screen flex items-center justify-center text-white p-4 section-login dashboard-general ">
				<dialog className="modal" ref={modalRef} id="my_modal">
					{/* <form method="dialog" className="modal-backdrop" onSubmit={(event) => {
                    // on empeche le comportement par defaut (rechargement de la page)
                      event.preventDefault()
                      // ici on recupere les données du formulaire et on les stocke dans une variable formData
                      const formData = new FormData(event.currentTarget);
                      const data = Object.fromEntries(formData);
                      console.log(data)
                  }}>
								<button>close</button>
			// </form> */}
					<div className="modal-box">
						<button onClick={closeModal}>&times;</button>
						<p>{modalContent}</p>
						<button
							type="button"
							className=" btn cursor-pointer text-black rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-white "
							value="submit"
						>
							Valider
						</button>
						<button
							type="button"
							className=" btn cursor-pointer text-black rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-white "
						>
							Annuler
						</button>
					</div>
				</dialog>
				<div className="dashboard dashboard-left">
					<div className="dashboard-left-tab">
						<button type="button" className="btn font-size title-account" onClick={showAccount}>
							Mon compte
						</button>
						<button
							type="button"
							className=" btn title-reservation-account text-2xl font-[700]"
							onClick={showReservation}
						>
							Mes réservations
						</button>
					</div>
					<div className="dashboard-left-btn">
						<button
							type="button"
							className="btn btn-account-delete"
							onClick={deconnect}
						>
							Se déconnecter
						</button>

						<button
							className="btn btn-account-delete openDeleteModalBtn"
							type="submit"
							value=""
							onClick={() => openDeleteModal()}
						>
							Supprimer mon compte
						</button>
					</div>
				</div>
				<div className="dashboard dashboard-right">
					<div className="text-account">
						<h2 className="text-2xl leading-17 font-[700]">
							Prénom: {user.firstname}
						</h2>
						<h2 className="text-2xl leading-17 font-[700]">
							Nom de famille: {user.lastname}
						</h2>
						<h2 className="text-2xl leading-17 font-[700]">
							Email: {user.email}
						</h2>
						<h2 className="text-2xl leading-17 font-[700]">
							Mot de passe: Ne peut pas être affiché
						</h2>
					</div>
					<div className="btn-account">
						{inputs.map((input) => (
							<>
								<button
									id={`btn-modify-${input.id}`}
									key={`btn-modify-${input.id}`}
									className="modal-btn btn cursor-pointer text-black rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-white"
									type="button"
									//onClick={() => openModal(`êtes-vous sur de vouloir modifier votre ${item.toLowerCase()} ? <input type="text" name="firstname" />`)}
									onClick={() => { input.setModal(true); setError({ message: "" }) }}
								>
									Modifier
								</button>
								<Modal
									key={`modal-${input.id}`}
									openModal={input.modal}
									closeModal={() => input.setModal(false)}
								>
									<form
										onSubmit={async (event) => {
											// on empeche le comportement par defaut (rechargement de la page)
											event.preventDefault();
											// ici on recupere les données du formulaire et on les stocke dans une variable formData
											const formData = new FormData(event.currentTarget);
											const data = Object.fromEntries(formData);

											const token = localStorage.getItem("JWT");
											const response = await fetch(
												`${import.meta.env.VITE_API_URL}/api/account/${input.route}`,
												{
													headers: {
														"Content-Type": "application/json",
														Authorization: `Bearer ${token}`,
													},
													// on indique que l'on utilise la methode post donc qui correspond au CREATE dans le CRUD
													method: "PATCH",
													body: JSON.stringify(data),
												},
											);

											if (!response.ok) {
												setError(await response.json());
												console.log(error)
												const message = document.querySelector(".error") as HTMLDialogElement;
												message.style.display = "block";
												return;
											}
											const responseData = await response.json();
											console.log(responseData);
											setUser({
												...user,
												[input.property]: responseData.user[input.property],
											});
										}}
									>
										<p>
											Êtes-vous sûr de vouloir modifier votre{" "}
											{input.label.toLowerCase()} ?
										</p>
										<div className="flex account-modal-modify">
											<input
												type="text"
												name={input.name}
												placeholder={user[input.label]}
											/>
											<button type="submit" className="btn button-account-modal">Modifier</button>
										</div>
										{/* Si une erreur est présente alors elle s'affiche */}
										{error && (
											<p className=" error"> Erreur: {error.message}</p>
										)}

									</form>
								</Modal>
							</>
						))}
					</div>
					<DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
					<ReservationAccount tickets={user.tickets} />
				</div>
			</div>
			<Footer />
		</>
	);
}
export default Account;
