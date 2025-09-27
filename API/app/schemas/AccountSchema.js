import Joi from "joi";
 
 export const accountSchema = (account) => {
   const schema = Joi.object({

     // Pour une insertion il faut obligatoirement le firstname
     // le firstname est une chaine de caractère
     // le firstname doit avoir au moins un caractère
     firstname: Joi.string().required().min(1),
     "string.empty": "Prénom requis",
     // Pour une insertion il faut obligatoirement le lastname
     // le lastname est une chaine de caractere
     // le lastname doit avoir au moins une chaine de caractere
     lastname: Joi.string().required().min(1),
     "string.empty": "Nom requis",
     // Pour une insertion il faut obligatoirement l'email
     // l'email est une chaine de caractère
     // l'email doit avoir au moins une chaine de caractère
     email: Joi.string().required().min(1),
     "string.email": "email format invalide",
     "string.empty": "Email requis",
     tickets: Joi.array().required(),
   }).required();
   // L'objet qui sera fourni pas l'utilisateur est obligatoire
   const { error } = schema.validate(account);
   console.log(account)
   if (error) {
    return error;
   }
 
   return
 };
 
 export const accountUpdateSchema = (form) => {
   const userSchema = Joi.object({
    newFirstname: Joi.string().min(1).messages({
        "string.empty": "Le prénom doit avoir au moins 1 caractère",
        "string.required": "Le prénom est requis"
      }),
      newLastname: Joi.string().min(1).messages({
        "string.empty": "Le nom doit comporter au moins 1 caractère",
        "string.required": "Le nom est requis"
      }),
      newEmail: Joi.string().email().messages({
        "string.email": "Format d'email invalide",
        "string.empty": "L'email est requis",
      }),
      newPassword: Joi.string().min(6).messages({
        "string.min": "Le mot de passe doit comporter au moins 6 caractères",
        "string.empty": "Le mot de passe est requis",
      }),
    }).required()
     // En plus d'être obligatoire, l'objet doit contenir au moins une propriété
     .min(1);
console.log("Voilà ce que nous envoie le form: ", form)
   const { error } = userSchema.validate(form);
 
   if (error) {
    console.log("Voici l'erreur")
    console.log(error)
    return error;
   }
 
   return
 };