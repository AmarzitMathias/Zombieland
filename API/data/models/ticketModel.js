// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "Ticket"
export class Ticket extends Model {}


Ticket.init(
    {
        // les attributs et leur contraintes du model Ticket
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
    },
    {
        // on preise à sequelize le nom de la table
        sequelize, 
        tableName: "ticket", 
    },
);
