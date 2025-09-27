// importer Sequelize, DataTypes et Model
import { DataTypes, Model, Sequelize } from "sequelize";


// importer le client de connexion sequelize
import { sequelize } from "../sequelize-client.js";


// construire le model "Image"
export class Image extends Model {}


Image.init(
    {
        // les attributs et leur contraintes du model Image
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        link: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
      },
      
        
    },
    {
        // on preise à sequelize le nom de la table
        sequelize, 
        tableName: "image", 
    },
);
