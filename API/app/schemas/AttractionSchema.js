import Joi from 'joi';

export const attractionCreateSchema = Joi.object({
  // l'attractionid, est obligatoire
  // l'attractionid est un nombre entier positif dont la valeur est minimum 1
  id: Joi.number().required().integer().min(1), 
  // Pour une insertion il faut obligatoirement le name
  // le name est une chaine de caractère
  // le name doit avoir au moins un caractère
  name: Joi.string().required().min(1),
  // Pour une insertion il faut obligatoirement la description
  // la description est une chaine de caractere 
  // la description doit avoir au moins une chaine de caractere
  decription: Joi.string().required().min(1),
  // Pour une insertion il faut obligatoirement la category
  // la category est un nombre
  // la category doit avoir au moins un nombre
  id_category: Joi.number().required().min(1),
  // Pour une insertion, l'image n'est pas obligatoire
  // l'image est une chaine de caractère
  // l'image doit avoir au moins zero caractère
  image: Joi.string().min(0),
}).required();
// L'objet qui sera fourni pas l'utilisateur est obligatoire
  

export const attractionUpdateSchema = Joi.object({
  // Dans une mise à jour le titre est optionnel, on peut ne spécifier que la position
  id: Joi.number().required().integer().min(1), 
  name: Joi.string().required().min(1),
  decription: Joi.string().required().min(1),
  id_category: Joi.number().required().min(1),
  image: Joi.string().min(0),
})
  .required()
  // En plus d'être obligaoire, l'objet doit contenir au moins une propriété
  .min(1);
  
