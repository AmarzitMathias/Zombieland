// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "Category"
export class Category extends Model {}


Category.init(
    {
        // les attributs et leur contraintes du model Category
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
    },
    {
        // on preise à sequelize le nom de la Category
        sequelize, 
        tableName: "category", 
    },
);
