import { User, Ticket, Tariff, Activity, Category, Image } from "./association.js";

// récuperer toutes les activités ET leur catégorie respectif
const activitiesandcategory = await Category.findAll({
    include: "activities",
});
console.log(activitiesandcategory);

// récuperer toutes les activités ET leur catégorie respectif
const usersandtickets = await User.findAll({
    include: "tickets",
});
console.log(usersandtickets);

// récuperer toutes les activités ET leur catégorie respectif
const ticketsandtariff = await Ticket.findAll({
    include: "tariff",
});
console.log(ticketsandtariff);