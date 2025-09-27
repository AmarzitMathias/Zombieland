import { Ticket } from "../../data/models/association.js";
import { User } from "../../data/models/association.js";

export const ticketController = {
	async newTicket(req, res) {
		// Déclaration fonction pour formater les dates
		// padStart(nombre au total, caractère à remplir avant)
		function getLocalYMD(dateObj) {
  			const year = dateObj.getFullYear(); 
 			const month = String(dateObj.getMonth() + 1).padStart(2, '0');
 			const day = String(dateObj.getDate()).padStart(2, '0');
  			return `${year}-${month}-${day}`;
			}
		// je dois récuperer l'information fournie dans le formulaire !
		// note : on va utiliser req.body, mais pour ça il faut configurer "body parser" dans l'index
		//Je convertis le texte reçu en format Date
		const date =  new Date(req.body.date);
		const tariff = req.body.tariff || 1;
		// console.log("ceci est tarif", tariff);
		// console.log(date);
		const dateFormated = getLocalYMD(date)
		// Déclaration de la date actuelle et adapation du format en fonction de la variable date
		const dateToday = new Date()
		const dateTodayFormatted = getLocalYMD(dateToday)

		if (dateFormated < dateTodayFormatted)
		{
			 return res.status(404).json({ message: "La date sélectionnée n'est pas valide" });
		}
		
		// on recupere le token dans le req.body
		const token = req.headers.authorization.split(" ")[1];
		console.log(token);
		// on sépare le token en 3 parties, elles sont séparables car un point permet de les définir
		const arrayToken = token.split(".");
		// on récupere la deuxiéme partie du token et on le decode avec atob au format json
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(tokenPayload);
		const tokenId = tokenPayload.id;

		// 1. Récupérer l'id de l'user
		const userId = await User.findOne({
			attributes: ["id"],
			where: {
				id: tokenId,
			},
		});
		console.log(userId.id);

		// 1. Créer le ticket
		const createTicket = await Ticket.create({
			// on precise ici les attributs de l'objet user (qui sont les attributs de la table user)
			date: date,
			id_tariff: tariff,
			id_user: userId.id,
		});

		// je veux sauvegarder ce nouveau ticket
		await createTicket.save();
		res.status(200).json({ message: "Succès" });
	},

	async deleteTicket(req, res) {
		console.log(req.body.id_ticket);
		const token = req.headers.authorization.split(" ")[1];
		const arrayToken = token.split(".");
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		const userId = tokenPayload.id;
		await Ticket.destroy({
			where: {
				id_user: userId,
				id: req.body.id_ticket
			},
		});
		return res.status(200).json({ message: "Succès" });
	},
};
