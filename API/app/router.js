// Import de l'usine à routers
import { Router } from "express";
import { controllerWrapper } from "./middlewares/controllersWrapper.js";
import { activitiesController} from "./controllers/activitiesController.js";
import { userController} from "./controllers/userController.js";
import { ticketController} from "./controllers/ticketController.js";

import { authController} from "./controllers/authController.js";
import { accountController} from "./controllers/accountController.js";


// Création d'un router
export const router = Router();
// const createControllerWrapper = controllerWrapper()

// --- Route / ---
    //Activités
router.route("/api/activities").get
(controllerWrapper (activitiesController.getAll));

// route pour afficher les activités et les attractions
router.route("/api/activities/attractions").get
(controllerWrapper (activitiesController.getAttractions));

router.route("/api/activities:id").get
(controllerWrapper (activitiesController.getOne));
    
// route pour les utilisateurs 
router.route("/api/registration").post
(controllerWrapper (userController.newUser));


router.route("/api/connect").post
(controllerWrapper (userController.getOne));

router.route("/api/reservation").post
(controllerWrapper (ticketController.newTicket));

// route pour le compte utilisateur
router.route("/api/account").get
(controllerWrapper (accountController.getAccount));


// route pour supprimer un compte
router.route("/api/account/delete").delete
(controllerWrapper(accountController.deleteAccount));


// route pour modifier le lastname d'un compte
router.route("/api/account/lastname").patch
(controllerWrapper(accountController.updateLastname));

// route pour modifier le firstname d'un compte
router.route("/api/account/firstname").patch
(controllerWrapper(accountController.updateFirstname));


router.route("/api/account/email").patch
(controllerWrapper(accountController.updateEmail));


router.route("/api/account/password").patch
(controllerWrapper(accountController.updatePassword));

router.route("/api/account/tickets/delete").delete
(controllerWrapper(ticketController.deleteTicket));

router.route("/api/account/logout").post
(controllerWrapper(authController.logout));
// middleware pour la gestion des routes inexistantes
router.use((req, res) => {
    res.status(404).json({error: 'Not found'});
  });
