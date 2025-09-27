import { User } from "../../data/models/association.js";
import * as argon2 from "argon2";
import authController from "./authController.js";
import sanitizeHtml from "sanitize-html";
import { connexion, registration } from "../schemas/ValidateSchema.js";

export const userController = {
	// ajouter un utilisateur newUser (req, res qui correspond à la requête et la réponse)
	async newUser(req, res) {
		function sanitize(dirty) {
			const clean = sanitizeHtml(dirty, {
				allowedTags: [],
				allowedAttributes: {},
			});
			return clean;
		}

		//Je regarde si le req.body envoie bien toutes les informations que l'on souhaite grâce
		//à un schéma de validation
		const error = registration(req.body);
		if (error) {
			console.log(error);
			return res.status(400).json({ message: error.details[0].message });
		}

		// je dois récuperer les informations dans le formulaire !
		let { lastname, firstname, email, password } = req.body;
		lastname = sanitize(lastname);
		firstname = sanitize(firstname);
		email = sanitize(email);
		const userLastname = lastname;
		const userFirstname = firstname;
		const userEmail = email;
		const userPassword = password;
		// on hash le mot de passe avec argon2 pour le sécuriser (on ne stocke jamais de mot de passe en clair)
		const hashedPassword = await argon2.hash(userPassword);
		// créer une instance de "user (une instance est un objet qui est une copie de la classe User")
		const createNewUser = new User({
			// on precise ici les attributs de l'objet user (qui sont les attributs de la table user)
			lastname: userLastname,
			firstname: userFirstname,
			email: userEmail,
			// on precise que le mot de passe est le mot de passe hashé (sécurisé)
			password: hashedPassword,
		});
		// je veux sauvegarder ce nouvel utilisateur
		try {
			await createNewUser.save();
			createNewUser.password = userPassword
			return userController.getOne(req, res, createNewUser)
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: "Email déjà pris" });
		}

		return res.status(200);
	},

	// pour se connecter (récupérer un utilisateur)
	async getOne(req, res, userCreated) {

		//userCreated est une fonction lorsque getOne n'est pas appelé par newUser, pour contrer cela alors nous devons le définir comme indéfini
  		if (typeof userCreated === 'function') {
   		userCreated = undefined;
  		}
		//Je regarde si le req.body envoie bien toutes les informations que l'on souhaite
		if (!userCreated){
			console.log("Vérification de l'enregistrement")
		const error = connexion(req.body);
			if (error) {
				console.log(error)
				return res.status(400).json({ message: error.details[0].message });
			}
		}
		
		let userEmail
		let userPassword
		
		if (!userCreated) {
			console.log("test")
		// on doit recupérer les informations dans le body de la requête
		 userEmail = req.body.email;
		 console.log(userEmail)
		 userPassword = req.body.password;
		}
		else {
			console.log("ça passe ici")
			userEmail = userCreated.email;
			userPassword = userCreated.password;
		}
		// 1. récupérer toute l'utilisateur avec la methode findOne de sequelize
		// en sql : SELECT * FROM user WHERE email = userEmail
		const user = await User.findOne({
			where: {
				email: userEmail,
			},
		});
		console.log(user);
		if (user === null) {
			console.log("Pas trouvé");
			return res.status(400).json({ message: "Compte non trouvé" });
		}
		// on vérifie la correpondance des mots de passe (argon2)
		const isValidPassword = await argon2.verify(user.password, userPassword);
		if (isValidPassword === true) {
			const token = await authController.auth(req, res, user);
			res.json({
				token: token,
			});
		}
		// on ajoute une condition pour verifier si le mot de passe est correct
		if (!isValidPassword) {
			console.error("Connexion impossible (mauvais mot de passe)"); // !attention aux infos que l'on donne à l'utilisateur
			return res.status(400).json({ message: "Compte non trouvé" });
		}
	},

	
};
