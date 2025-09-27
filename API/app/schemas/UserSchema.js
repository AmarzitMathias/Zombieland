import Joi from "joi";
 
 export const userCreateSchema = (req, res, next) => {
   const CreateSchema = Joi.object({
     // le userid, est obligatoire
     // le userid est un nombre entier positif dont la valeur est minimum 1
     id: Joi.number().required().integer().min(1),
     // Pour une insertion il faut obligatoirement le firstname
     // le firstname est une chaine de caractère
     // le firstname doit avoir au moins un caractère
     firstname: Joi.string().required().min(1),
     // Pour une insertion il faut obligatoirement le lastname
     // le lastname est une chaine de caractere
     // le lastname doit avoir au moins une chaine de caractere
     lastname: Joi.string().required().min(1),
     // Pour une insertion il faut obligatoirement l'email
     // l'email est une chaine de caractère
     // l'email doit avoir au moins une chaine de caractère
     email: Joi.string().required().min(1),
     // Pour une insertion, le password est obligatoire
     // le password est une chaine de caractère
     // le password doit avoir au moins six caractère
     password: Joi.string().required().min(6),
   }).required();
   // L'objet qui sera fourni pas l'utilisateur est obligatoire
   const { error } = CreateSchema.validate(req.body);
 
   if (error) {
    return error;
   }
 
   return
 };
 
 export const userUpdateSchema = (req, res, next) => {
   const userSchema = Joi.object({
     // Dans une mise à jour le titre est optionnel, on peut ne spécifier que la position
     id: Joi.number().required().integer().min(1),
     firstname: Joi.string().required().min(1),
     "string.empty": "Prénom requis",
     lastname: Joi.string().required().min(1),
     "string.empty": "Nom requis",
     email: Joi.string().required().min(1),
     "string.email": "email format invalide",
     "string.empty": "Email requis",
     password: Joi.string().required.min(6),
     "string.min": "Le mot de passe doit comporter au moins 6 caractères",
     "string.empty": "Mot de passe requis",
   })
     .required()
     // En plus d'être obligatoire, l'objet doit contenir au moins une propriété
     .min(1);
 
   const { error } = userSchema.validate(req.body);
 
   if (error) {
    return error;
   }
 
   return
 };