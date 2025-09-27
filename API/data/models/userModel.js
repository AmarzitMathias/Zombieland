// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "USER"
export class User extends Model {}


User.init(
    {
        // les attributs et leur contraintes du model User
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'client',
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
    },
    {
        // Configuration supplémentaire
        sequelize, // on doit fournir le client de connexion
        tableName: "user", // on donne le nom exact de la table en bdd
    },
);

