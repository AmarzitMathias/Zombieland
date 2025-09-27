import authController from "./authController.js";
import { Ticket, User } from "../../data/models/association.js";
import * as argon2 from "argon2";
import { accountSchema, accountUpdateSchema } from "../schemas/AccountSchema.js";


export const accountController = {
	async getAccount(req, res) {
		console.log("Route /api/account appelée");
		console.log("Voici le cookie")
		console.log(req.headers.authorization)

		// on recupere le token dans le req.body
		// const token = req.headers.authorization.split(" ")[1];

		// Récupération avec le cookie
		const token = req.headers.authorization
		console.log(token);
		if (!token) {
			return res.status(401).json({ error: "Token manquant" });
		}

		// on sépare le token en 3 parties, elles sont séparables car un point permet de les définir
		const arrayToken = token.split(".");
		// on récupere la deuxiéme partie du token et on le decode avec atob au format json
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(tokenPayload);
		const userId = tokenPayload.id;
		const account = await User.findByPk(userId, {
			attributes: ["email", "lastname", "firstname"],
			include: [
				{
					model: Ticket,
					as: "tickets", // <---- HERE
				},
			],
		});

		if (account === null) {
			console.log("Pas trouvé");
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}
		//On vérifie que l'on a bien toutes les données que l'on veut en comparant avec le schéma
		const error = accountSchema(account.dataValues)
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.details[0].message });
		  }
		return res.status(200).json({ account });
	},

	// function pour supprimer un compte
	async deleteAccount(req, res) {
		const token = req.headers.authorization.split(" ")[1];
		const arrayToken = token.split(".");
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(tokenPayload);
		const userId = tokenPayload.id;
		await User.destroy({
			where: {
				id: userId,
			},
		});
		return res.status(200).json({ message: "Succès" });
	},
	// function pour modifier le lastname du compte
	async updateLastname(req, res) {
		//On compare ce qu'on reçoit avec notre schéma
		const error = accountUpdateSchema(req.body)
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.details[0].message });
		  }
		//On récupère le token afin de récupérer l'e-mail de notre compte
		const token = req.headers.authorization.split(" ")[1];
		//On récupère le nouveau nom que notre utilisateur donne
		const newLastname = req.body.newLastname;
		const arrayToken = token.split(".");
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(tokenPayload);
		const userId = tokenPayload.id;
		console.log(userId);
		//On trouve l'enregistrement de notre utilisateur dans la BDD et on le stock dans une variable
		const account = await User.findByPk(userId);

		await account.update({ lastname: newLastname });

		res.status(200).json({ message: "Succès", user: account });
	},

	async updateFirstname(req, res) {
		//On compare ce qu'on reçoit avec notre schéma
		const error = accountUpdateSchema(req.body)
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.details[0].message });
		  }
		const newFirstname = req.body.newFirstname;
		const token = req.headers.authorization.split(" ")[1];
		const arrayToken = token.split(".");
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(newFirstname, tokenPayload);
		const userId = tokenPayload.id;
		const account = await User.findByPk(userId);
		console.log(userId);

		await account.update({ firstname: newFirstname });

		res.status(200).json({ message: "Succès", user: account });
	},

	async updateEmail(req, res) {
		//On compare ce qu'on reçoit avec notre schéma
		const error = accountUpdateSchema(req.body)
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.details[0].message });
		  }
		const newEmail = req.body.newEmail;
		try {
			// on recupere le token dans le req.body
			const token = req.headers.authorization.split(" ")[1];
			console.log(token);
			// on sépare le token en 3 parties, elles sont séparables car un point permet de les définir
			const arrayToken = token.split(".");
			console.log("Token coupé en 3: ", arrayToken);
			// on récupere la deuxiéme partie du token et on le decode avec atob au format json
			const tokenPayload = JSON.parse(atob(arrayToken[1]));
			console.log(tokenPayload);
			const userId = tokenPayload.id;
			const account = await User.findByPk(userId);

			if (!account) {
				return req.status(404).json({ message: "utilisateur pas trouvé" });
			}
			await account.update({ email: newEmail });
			res.status(200).json({ message: "Succès", user: account });
		} catch (error) {
			console.error("Erreur lors de la vérification du token :", error);
			return res.status(401).json({ message: "Token invalide" });
		}
	},

	async updatePassword(req, res) {
		console.log("Entrée du password")
		const error = accountUpdateSchema(req.body)
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.details[0].message });
		  }
		  console.log("ça se fait quand même")
		const newPassword = req.body.newPassword;
		const token = req.headers.authorization.split(" ")[1];
		const arrayToken = token.split(".");
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		console.log(tokenPayload);
		const userId = tokenPayload.id;
		console.log(newPassword);
		const account = await User.findByPk(userId);
		if (!account) {
			return req.status(404).json({ message: "utilisateur pas trouvé" });
		}
		await account.update({ id: userId });
		console.log(account);
		const hashedPassword = await argon2.hash(newPassword);
		await account.update({ password: hashedPassword });

		res.status(200).json({ message: "Succès", user: account });
	},

};
