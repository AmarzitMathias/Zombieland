// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "Tariff"
export class Tariff extends Model {}


Tariff.init(
    {
        // les attributs et leur contraintes du model Tariff
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },

        
    },
    {
        // Configuration supplémentaire
        sequelize, // on doit fournir le client de connexion
        tableName: "tariff", // on donne le nom exact de la table en bdd
    },
);
