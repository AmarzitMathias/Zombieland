// dans ce fichier, on définit toutes les associations entre nos modèles.


// on importe les modèles nécessaires
import { Activity} from "./activityModel.js";
import { Category } from "./categoryModel.js";
import { User } from "./userModel.js";
import { Image } from "./imageModel.js";
import { Ticket } from "./ticketModel.js";
import { Tariff } from "./tariffModel.js";


// User <--> Ticket : association "one-to-many"
User.hasMany(Ticket, {
    // spécifier la clé étrangère
    foreignKey: "id_user",
    onDelete: 'CASCADE',
    // alias d'association (nom personnalisé)
    as: "tickets"
});
Ticket.belongsTo(User, {
    // spécifier la clé étrangère
    foreignKey: "id_user",
    // alias d'association
    as: "owner",
});

// Tariff <--> Ticket : association "one-to-many"
Tariff.hasMany(Ticket, {
    // spécifier la clé étrangère
    foreignKey: "id_tariff",
    // alias d'association (nom personnalisé)
    as: "tickets"
});
Ticket.belongsTo(Tariff, {
    // spécifier la clé étrangère
    foreignKey: "id_tariff",
    // alias d'association
    as: "tariff",
});

// Category <--> Activity : association "one-to-many"
Category.hasMany(Activity, {
    // spécifier la clé étrangère
    foreignKey: "id_category",
    // alias d'association (nom personnalisé)
    as: "activities"
});
Activity.belongsTo(Category, {
    // spécifier la clé étrangère
    foreignKey: "id_category",
    // alias d'association
    as: "category",
});

// Activity <--> Image: association "one-to-many"
Activity.hasMany(Image, {
    // spécifier la clé étrangère
    foreignKey: "id_activity",
    // alias d'association 
    as: "images"
});
Image.belongsTo(Activity, {
    // spécifier la clé étrangère
    foreignKey: "id_activity",
    // alias d'association
    as: "activity",
});


// on rééxporte les modèles avec leur associations
export { User, Ticket, Tariff, Activity, Category, Image };


