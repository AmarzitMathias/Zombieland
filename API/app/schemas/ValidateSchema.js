import Joi from "joi";

// schema pour la connexion
export const connexion = (form) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "format email invalide",
			"string.empty": "Email requis",
		}),
		password: Joi.string().min(6).required().messages({
			"string.min": "Le mot de passe doit comporter au moins 6 caractères",
			"string.empty": "Mot de passe requis",
		}),
	});

	const { error } = schema.validate(form);

	if (error) {
		return error;
	}
	return;
};

// schema pour s'enregistrer
export const registration = (form) => {
	const schema = Joi.object({
		lastname: Joi.string().required().messages({
			"string.empty": "Nom requis",
		}),
		firstname: Joi.string().required().messages({
			"string.empty": "Prénom requis",
		}),
		email: Joi.string().email().required().messages({
			"string.email": "email format invalide",
			"string.empty": "Email requis",
		}),
		password: Joi.string().min(6).required().messages({
			"string.min": "Le mot de passe doit comporter au moins 6 caractères",
			"string.empty": "Mot de passe requis",
		}),
		role: Joi.string().valid("user", "admin").optional(),
	});
	const { error } = schema.validate(form);

	if (error) {
		return error;
	}

	return;
};


