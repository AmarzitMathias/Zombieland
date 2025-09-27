// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "Activity"
export class Activity extends Model {}


Activity.init(
    {
        // les attributs et leur contraintes du model Activity
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
    },
    {
        // Configuration supplémentaire
        sequelize, // on doit fournir le client de connexion
        tableName: "activity", // on donne le nom exact de la table en bdd
    },
);


